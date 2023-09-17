"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import styles from "./postPage.module.css";
// contextAPI import
import { AuthenticationContext } from "@/app/context/AuthContext";
import { PostDataContext } from "@/app/context/PostContext";
// component
import ImageComponent from "./components/ImageComponent";
import Image from "next/image";
import { imageUploadUtil } from "@/utils/imageUpload";

export default function PostPage() {
  const router = useRouter();
  const { data } = useContext(AuthenticationContext);
  const { setPostState, imageFile } = useContext(PostDataContext);

  const [state, setState] = useState({
    title: "",
    content: "",
    date: "",
  });

  const handleClickPostAdd = async (e) => {
    e.preventDefault();
    if (state.date == "" || state.title == "" || state.content == "") {
      alert("빈칸을 채워주세요");
      return;
    }
    try {
      // S3이미지 업로드
      const imageS3Upload = await imageUploadUtil(imageFile);

      const newData = {
        date: state.date,
        title: state.title,
        content: state.content,
        image: imageS3Upload == null ? "/image/free.jpg" : imageS3Upload,
        user: data?.userid,
        createDate: new Date().getTime(),
      };
      
      const newPostRes = await fetch(`/api/post/new`, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("포스트 작성에 문제가 발생하였습니다.");
          }
          return res.json();
        })
        .then((result) => {
          try {
            setState({ title: "", content: "", date: "" });
            setPostState({ postError: null, imageFile: null });
            alert(result);
            router.push("/");
            router.refresh();
          } catch (error) {
            // 서버 PostData저장 Error Catch
            alert(error);
          }
        });
    } catch (error) {
      // 이미지 업로드 Error Catch
      alert(error);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.postBox}>
        <div className={styles.postInputBox}>
          <input
            name="date"
            type="date"
            value={state.date}
            onChange={(e) => {
              setState({ ...state, date: e.target.value });
            }}
          />
          <input
            name="title"
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            type="text"
            maxLength="20"
            placeholder="툰 제목을 입력해주세요"
          />
        </div>
        <div className={styles.postTextarea}>
          <textarea
            name="content"
            value={state.content}
            onChange={(e) => setState({ ...state, content: e.target.value })}
            maxLength="100"
            placeholder="오늘의 툰을 설명해주세요"
          />
        </div>
        <ImageComponent />
        <div className={styles.postButtonBox}>
          <button className={styles.postButton} onClick={handleClickPostAdd}>
            글 작성
          </button>
        </div>
      </div>
    </div>
  );
}

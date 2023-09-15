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

export default function PostPage() {
  const { data } = useContext(AuthenticationContext);
  const { setPostState, imageFile, postError } = useContext(PostDataContext);
  const router = useRouter();

  const [state, setState] = useState({
    title: "",
    content: "",
    date: "",
  });

  const handleClickPostAdd = async (e) => {
    e.preventDefault();
    // if (state.date == "" || state.title == "" || state.content == "") {
    //   alert("빈칸을 채워주세요");
    //   return;
    // }
    try {
      let uploadSrc = null
      if (imageFile) {
        const filename = encodeURIComponent(imageFile.name);
        // presigned URL발행
        const res = await fetch(`/api/post/image?file=${filename}`);
        if(!res.ok)throw new Error(" 이미지 업로드에 문제가 있습니다 ")
        const presignedUrlData = await res.json();        
        console.log("Presigned URL---", presignedUrlData);
  
        // S3-upload
        // res.fields=서버가 보낸 정보 / file= 유저 이미지정보 => upload
        const formData = new FormData();
        Object.entries({ ...presignedUrlData.fields, file: imageFile }).forEach(
          ([key, value]) => {
            formData.append(key, value);
          }
        );
        let upload = await fetch(presignedUrlData.url, {
          method: "POST",
          body: formData,
        });
  
        if (upload.ok) {
          uploadSrc = `${upload.url}/${filename}`;
        } else {
          throw new Error(" 이미지 업로드에 문제가 있습니다")
        }
      }
      const freeSrc =
      "https://s3.ap-northeast-2.amazonaws.com/toonda/free.jpg";

      const newData = {
        date: state.date,
        title: state.title,
        content: state.content,
        image: uploadSrc == null ? freeSrc : uploadSrc,
        user: data?.userid,
        createDate: new Date().getTime(),
      };
      console.log(newData)

      const newPostRes = await fetch(`/api/post/new`, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) =>{
          if(!res.ok){throw new Error('포스트 작성에 문제가 발생하였습니다.')}
          return res.json()
        })
        .then((result) => {
          try {
            setState({ title: "", content: "", date: "" });
            setPostState({  postError: null, imageFile: null,})
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
      alert(error)
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
        <button className={styles.postButton} onClick={handleClickPostAdd}>
          글 작성
        </button>
      </div>
    </div>
  );
}

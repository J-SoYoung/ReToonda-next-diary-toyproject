"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// context, component import
import { PostDataContext } from "@/app/context/PostContext";
import { imageUpload } from "@/utils/imageUpload";
import EditImageComponent from "./EditImageComponent";
import styles from "@/app/postPage/postPage.module.css";

export default function EditInputComponent({ id, postData }) {
  const router = useRouter()
  const { imageFile, setPostState } = useContext(PostDataContext);  
  const [state, setState] = useState({
    title: null,
    content: null,
    date: null,
  });

  const handleClickEditPost = async (e) => {
    e.preventDefault();
    try {
      // S3이미지 업로드
      const imageS3Upload = await imageUpload(imageFile);

      // 수정 DATA
      const editData = {
        _id: id,
        date: state.date == null ? postData?.date : state.date,
        title: state.title == null ? postData?.title : state.title,
        content: state.content == null ? postData?.content : state.content,
        image: imageS3Upload == null ? postData?.image : imageS3Upload,
        user: postData?.user,
        createDate: new Date().getTime(),
      };

      if (editData.date == "" || editData.title == "" || editData.content == "") {
        alert("빈칸을 채워주세요");
        return;
      }

      await fetch(`/api/post/edit`, {
        method: "POST",
        body: JSON.stringify(editData),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("포스트 작성에 문제가 발생하였습니다.") 
          }
        })
        .then((result) => {
          try {
            setState({ title: null, content: null, date: null });
            setPostState({ postError: null, imageFile: null });
            alert(result);
            router.push(`/detailPage/${id}`);
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
    <div className={styles.postBox}>
      <input type="hidden" name="id" value={id} />
      <div className={styles.postInputBox}>
        <input
          name="date"
          type="date"
          defaultValue={postData.date}
          onChange={(e) => {
            setState({ ...state, date: e.target.value });
          }}
        />
        <input
          name="title"
          type="text"
          onChange={(e) => setState({ ...state, title: e.target.value })}
          defaultValue={postData.title}
          maxLength="20"
        />
      </div>
      <div className={styles.postTextarea}>
        <textarea
          name="content"
          defaultValue={postData.content}
          onChange={(e) => setState({ ...state, content: e.target.value })}
          maxLength="100"
        />
      </div>
      <EditImageComponent imageDefault={postData.image} />
      <div className={styles.postButtonBox}>
        <button className={styles.postButton} onClick={handleClickEditPost}>
          글 수정 하기
        </button>
        <Link className={styles.postButton} href={`/detailPage/${id}`}>
          수정 취소
        </Link>
      </div>
    </div>
  );
}

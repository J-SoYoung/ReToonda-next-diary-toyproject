"use client";
import { useContext } from "react";
import { PostDataContext } from "@/app/context/PostContext";
import useInput from "@/hooks/useInput";
import styles from "../postPage.module.css";

export default function InputComponent() {
  const { setPostState, postState } = useContext(PostDataContext);
  const [ state, setState ] = useInput()

  return (
    <>
      <div className={styles.postInputBox}>
        <input 
          name='date'
          type="date" 
          value={postState?.date} 
          onChange={(e) => setState("date", e.target.value)}
        />
        <input
          type="text"
          name="title"
          value={postState?.title}
          onChange={(e) => setState("title", e.target.value)}
          maxLength="20"
          placeholder="툰 제목을 입력해주세요"
        />
      </div>
      <div className={styles.postTextarea}>
        <textarea
          name="content"
          value={postState?.content}
          onChange={(e) => setState("content", e.target.value)}
          maxLength="100"
          placeholder="오늘의 툰을 설명해주세요"
        />
      </div>
    </>
  );
}

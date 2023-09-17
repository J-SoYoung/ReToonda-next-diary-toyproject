"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
// context, util, hooks import
import { AuthenticationContext } from "@/app/context/AuthContext";
import { PostDataContext } from "@/app/context/PostContext";
import { imageUploadUtil } from "@/utils/imageUpload";
import useInput from "@/hooks/useInput";
import usePostApi from "@/hooks/usePostApi";
// component, style import
import styles from "./postPage.module.css";
import ImageComponent from "./components/ImageComponent";

export default function PostPage() {
  const router = useRouter();
  const { data } = useContext(AuthenticationContext);
  const { setPostState, imageFile } = useContext(PostDataContext);
  const { postDataFetchingApi } = usePostApi();

  const initialData = {
    title: '',
    content: '',
    date: '',
  };
  const [state, setState, resetState] = useInput(initialData);

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
      
      // post작성 API
      const postResult = await postDataFetchingApi("new", newData);
      if (!postResult) throw new Error("포스트 작성에 문제가 발생하였습니다.");
      resetState();
      setPostState({ postError: null, imageFile: null });
      alert(postResult);
      router.push("/");

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
            type="date"
            value={state?.date}
            onChange={(e) => setState("date", e.target.value)}
          />
          <input
            type="text"
            value={state?.title}
            onChange={(e) => setState("title", e.target.value)}
            maxLength="20"
            placeholder="툰 제목을 입력해주세요"
          />
        </div>
        <div className={styles.postTextarea}>
          <textarea
            value={state?.content}
            onChange={(e) => setState("content", e.target.value)}
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

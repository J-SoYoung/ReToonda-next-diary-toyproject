"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
// context, util, hooks import
import { AuthenticationContext } from "@/app/context/AuthContext";
import { PostDataContext } from "@/app/context/PostContext";
import { ImageDataContext } from "@/app/context/ImageContext";
import { imageUploadUtil } from "@/utils/imageUpload";
import usePostApi from "@/hooks/usePostApi";
// component, style import
import styles from "./postPage.module.css";
import ImageComponent from "./components/ImageComponent";
import InputComponent from "./components/InputComponent";
import useInput from "@/hooks/useInput";

export default function PostPage() {
  const router = useRouter();
  const { data } = useContext(AuthenticationContext);
  const { postState } = useContext(PostDataContext);
  const { setImageState, imageFile } = useContext(ImageDataContext);
  const { postDataFetchingApi } = usePostApi();
  const [ resetState ] = useInput()

  const handleClickPostAdd = async (e) => {
    e.preventDefault();
    if (
      postState.date == "" ||
      postState.title == "" ||
      postState.content == ""
    ) {
      alert("빈칸을 채워주세요");
      return;
    }

    try {
      // S3이미지 업로드
      const imageS3Upload = await imageUploadUtil(imageFile);
      const newData = {
        date: postState.date,
        title: postState.title,
        content: postState.content,
        image: imageS3Upload == null ? "/image/free.jpg" : imageS3Upload,
        user: data?.userid,
        createDate: new Date().getTime(),
      };
      // post작성 API
      const postResult = await postDataFetchingApi("new", newData);
      if (!postResult) throw new Error("포스트 작성에 문제가 발생하였습니다.");
      setImageState({imageFile: null});
      resetState()
      alert(postResult);
      router.push("/");
      router.refresh();
    } catch (error) {
      // 이미지 업로드 Error Catch
      alert(error);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.postBox}>
        <InputComponent />
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

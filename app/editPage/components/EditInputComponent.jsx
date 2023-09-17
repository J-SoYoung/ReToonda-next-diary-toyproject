"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// context, util, hooks import
import { ImageDataContext } from "@/app/context/ImageContext";
import { imageUploadUtil } from "@/utils/imageUpload";
import useInput from "@/hooks/useInput";
import usePostApi from "@/hooks/usePostApi";
// component, style import
import EditImageComponent from "./EditImageComponent";
import styles from "@/app/postPage/postPage.module.css";

export default function EditInputComponent({ id, postData }) {
  const router = useRouter();
  const { imageFile, setImageState } = useContext(ImageDataContext);
  const { postDataFetchingApi } = usePostApi();

  const initialData = {
    title: "",
    content: "",
    date: "",
  };
  const [state, setState, resetState] = useInput(initialData);

  const handleClickEditPost = async (e) => {
    e.preventDefault();
    try {
      // S3이미지 업로드
      const imageS3Upload = await imageUploadUtil(imageFile);

      // edit data
      const data = {
        _id: id,
        date: state.date == "" ? postData?.date : state.date,
        title: state.title == "" ? postData?.title : state.title,
        content: state.content == "" ? postData?.content : state.content,
        image: imageS3Upload == null ? postData?.image : imageS3Upload,
        user: postData?.user,
        createDate: new Date().getTime(),
      };

      if (data.date == "" || data.title == "" || data.content == "") {
        alert("빈칸을 채워주세요");
        return;
      }

      // post-EDIT API요청
      const editResult = await postDataFetchingApi("edit", data);
      if (!editResult) throw new Error("포스트 작성에 문제가 발생하였습니다.");
      resetState();
      setImageState({ imageFile: null });
      alert(editResult);
      router.push(`/detailPage/${id}`);
      router.refresh();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.postBox}>
      <input type="hidden" name="id" value={id} />
      <div className={styles.postInputBox}>
        <input
          type="date"
          defaultValue={postData.date}
          onChange={(e) => setState("date", e.target.value)}
        />
        <input
          type="text"
          defaultValue={postData.title}
          onChange={(e) => setState("title", e.target.value)}
          maxLength="20"
        />
      </div>
      <div className={styles.postTextarea}>
        <textarea
          defaultValue={postData.content}
          onChange={(e) => setState("content", e.target.value)}
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

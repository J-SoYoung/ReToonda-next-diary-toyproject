"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// context, util, hooks import
import { PostDataContext } from "@/app/context/PostContext";
import { ImageDataContext } from "@/app/context/ImageContext";
import { imageUploadUtil } from "@/utils/imageUpload";
import usePostApi from "@/hooks/usePostApi";
// component, style import
import styles from "@/app/postPage/postPage.module.css";

export default function EditBtnComponent({ id, postData }) {
  const router = useRouter();
  const { postState } = useContext(PostDataContext);
  const { imageFile } = useContext(ImageDataContext);
  const { postDataFetchingApi } = usePostApi();

  const handleClickEditPost = async (e) => {
    e.preventDefault();
    try {
      // S3이미지 업로드
      const imageS3Upload = await imageUploadUtil(imageFile);

      // edit data
      const data = {
        _id: id,
        date: postState.date == "" ? postData?.date : postState.date,
        title: postState.title == "" ? postData?.title : postState.title,
        content:
          postState.content == "" ? postData?.content : postState.content,
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
      router.push(`/detailPage/${id}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.postButtonBox}>
      <button className={styles.postButton} onClick={handleClickEditPost}>
        글 수정 하기
      </button>
      <Link className={styles.postButton} href={`/detailPage/${id}`}>
        수정 취소
      </Link>
    </div>
  );
}

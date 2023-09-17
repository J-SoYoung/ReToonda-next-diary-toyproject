"use client";
import React, { useContext, useState } from "react";
import { PostDataContext } from "@/app/context/PostContext";
import styles from "@/app/postPage/postPage.module.css";
import Image from "next/image";
import { imagePreviewUtil } from "@/utils/imageUpload";

export default function EditImageComponent({ imageDefault }) {
  const { setPostState, imageFile } = useContext(PostDataContext);
  const [previewImage, setPreviewImage] = useState("");

  const handleImagePreview = async (e) => {
    const file = e.target.files?.[0];
    setPostState({
      postError: null,
      imageFile: file,
    });

    // image 미리보기
    if(file){
      const preview = await imagePreviewUtil(file);
      setPreviewImage(preview);
    }
  };
  
  return (
    <div className={styles.postImageBox}>
      {/* input=file style변경 */}
      <div className={styles.labelBox}>
        {/* 실제 image업로드 input */}
        <input
          type="file"
          name="image"
          id="file"
          accept="image/*"
          onChange={handleImagePreview}
        />
        {!previewImage ? (
          <>
            {/* 기본 default 이미지 */}
            <label htmlFor="file" className={styles.imageBasicLabel}>
              <Image
                src={imageDefault}
                alt="default-image"
                width={490}
                height={400}
              />
            </label>
          </>
        ) : (
          <div className={styles.imageEditLabelBox}>
            <label htmlFor="file" className={styles.imageEditLabel}>
              <p>이미지 변경</p>
            </label>
            <button
              className={styles.imageEditLabel}
              onClick={() => {
                setPreviewImage("");
              }}
            >
              이미지 삭제
            </button>
          </div>
        )}
      </div>
      {/* Preview이미지 보여지는 부분 */}
      {previewImage && (
        <Image
          className={styles.previewImg}
          src={previewImage}
          width={490}
          height={400}
          alt="preview-image"
        />
      )}
    </div>
  );
}

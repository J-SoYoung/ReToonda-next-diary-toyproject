"use client";
import React, { useContext, useState } from "react";
import { PostDataContext } from "@/app/context/PostContext";
import styles from "../postPage.module.css";
import Image from "next/image";

export default function ImageComponent() {
  const { setPostState } = useContext(PostDataContext);
  const [previewImage, setPreviewImage] = useState("");

  const [src, setSrc] = useState("");

  const handleImagePreview = async (e) => {
    const file = e.target.files?.[0];
    setPostState({
      postError: null,
      imageFile: file,
    });

    // 이미지 미리보기
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
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
            {/* input=file 기본style 대신 */}
            <label htmlFor="file" className={styles.imageBasicLabel}>
              <Image
                src="/icons/gray_image_add.svg"
                alt="image-add-icon"
                width={100}
                height={100}
              />
              <p>오늘의 툰을 올려주세요</p>
            </label>
          </>
        ) : (
          <div className={styles.imageEditLabelBox}>
            {/* preview이미지 있을 때 img수정 input */}
            <label htmlFor="file" className={styles.imageEditLabel}>
              <p>이미지 변경</p>
            </label>
            <button
              className={styles.imageEditLabel}
              onClick={() => {
                setPreviewImage("");
                setEncodeFilename("");
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

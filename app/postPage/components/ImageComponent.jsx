"use client";
import React, { useContext, useState } from "react";
import { ImageDataContext } from "@/app/context/ImageContext";
import styles from "../postPage.module.css";
import Image from "next/image";
import { imagePreviewUtil } from "@/utils/imageUpload";

export default function ImageComponent() {
  const { setImageState } = useContext(ImageDataContext);
  const [previewImage, setPreviewImage] = useState("");

  const handleImagePreview = async (e) => {
    const file = e.target.files?.[0];
    setImageState({ imageFile: file });

    // image 미리보기
    if (file) {
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
              onClick={() => setPreviewImage("")}
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

"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { ImageDataContext } from "@/app/context/ImageContext";
import { imagePreviewUtil } from "@/utils/imageUpload";
import styles from "../postPage.module.css";

const EditDefaulImage = (imageDefault) => {
  return (
    <label htmlFor="file" className={styles.imageBasicLabel}>
      <Image src={imageDefault} alt="default-image" width={490} height={400} />
    </label>
  );
};

const PostIconImage = () => {
  return (
    <label htmlFor="file" className={styles.imageBasicLabel}>
      <Image
        src="/icons/gray_image_add.svg"
        alt="image-add-icon"
        width={100}
        height={100}
      />
      <p>오늘의 툰을 올려주세요</p>
    </label>
  );
};

export default function ImageComponent({ type, imageDefault}) {
  const { setImageState } = useContext(ImageDataContext);
  const [previewImage, setPreviewImage] = useState("");

  // image 미리보기
  const handleImagePreview = async (e) => {
    const file = e.target.files?.[0];
    setImageState({ imageFile: file });
    if (file) {
      const preview = await imagePreviewUtil(file);
      setPreviewImage(preview);
    }
  };

  return (
    <div className={styles.postImageBox}>
      <div className={styles.labelBox}>
        {/* 실제 image업로드 input */}
        <input
          type="file"
          name="image"
          id="file"
          accept="image/*"
          onChange={handleImagePreview}
        />
        {/* 기본input 대신 보여지는 Image / ICON */}
        {!previewImage ? (
          type !== 'edit' ? PostIconImage() : EditDefaulImage(imageDefault)
        ) : (
          <div className={styles.imageEditLabelBox}>
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

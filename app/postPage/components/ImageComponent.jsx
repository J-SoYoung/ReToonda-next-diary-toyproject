"use client";
import React, { useState } from "react";
import styles from "../postPage.module.css";
import Image from "next/image";

export default function ImageComponent() {
  const [previewImage, setPreviewImage] = useState("");
  const [s3_imageSrc, setS3_imageSrc] = useState("");

  const handleImageAdd = async (e) => {
    const file = e.target.files?.[0];
    const filename = encodeURIComponent(file.name);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    }

    // // S3는 글 발행시 업로드하기
    // // PresignedURL 요청
    let res = await fetch(`/api/post/s3_ImageUpload?file=${filename}`);
    res = await res.json();

    // S3 업로드
    // entries를 통해 주어진 객체를 [key, value]를 배열로 반환
    const formData = new FormData();
    Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    let S3_imageUpload = await fetch(res.url, {
      method: "POST",
      body: formData,
    });
    setS3_imageSrc(`${S3_imageUpload.url}/${file.name}`);
  };

  return (
    <>
      <div className={styles.postImageBox}>
        <div className={styles.labelBox}>
          {previewImage ? (
            <label htmlFor="file">
              <p>이미지 변경</p>
            </label>
          ) : (
            <label htmlFor="file">
              <Image
                src="/icons/gray_image_add.svg"
                alt="image-add-icon"
                width={100}
                height={100}
              />
              <p>오늘의 툰을 올려주세요</p>
            </label>
          )}
        </div>
        <input
          type="file"
          name="image"
          id="file"
          accept="image/*"
          onChange={handleImageAdd}
        />
        {/* 글 발행 전이니까 본인 로컬에서만 보이면 됨. */}
        {previewImage && (
          <Image src={previewImage} width={490} height={400} alt="preview-image" />
        )}
      </div>
    </>
  );
}

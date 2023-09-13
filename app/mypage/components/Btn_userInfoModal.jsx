"use client";
import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import useUserDataEdit from "@/hooks/useUserDataEdit";
import modalStyle from "@/app/components/pageModalStyle.module.css";

export default function Btn_userInfoModal({ user }) {
  const { userDataEditFunc } = useUserDataEdit();

  const [showModal, setShowModal] = useState(false);
  const [introEdit, setIntroEdit] = useState("");
  const modalRef = useRef(null);

  const [previewImage, setPreviewImage] = useState("");
  const [uploadFile, setUploadFile] = useState("");
  const [encodeFilename, setEncodeFilename] = useState("");

  const handleImagePreview = async (e) => {
    const file = e.target.files?.[0];
    setUploadFile(file);
    setEncodeFilename(encodeURIComponent(file.name));
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    }
  };

  const handleUserIntroEdit = async () => {
    // S3업로드를 위한 Presigned URL발행
    let s3_imageSrc = "";
    if (encodeFilename) {
      let res = await fetch(`/api/post/s3_ImageUpload?file=${encodeFilename}`);
      res = await res.json();

      // S3 업로드
      // entries를 통해 주어진 객체를 [key, value]를 배열로 반환
      const formData = new FormData();
      Object.entries({ ...res.fields, uploadFile }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      let S3_imageUpload = await fetch(res.url, {
        method: "POST",
        body: formData,
      });
      s3_imageSrc = `${S3_imageUpload.url}/${encodeFilename}`;
    }

    const userData = {
      ...user,
      userIntro: introEdit ? introEdit : user.userIntro,
      userProfileImage: s3_imageSrc ? s3_imageSrc : user.userProfileImage,
    };
    await userDataEditFunc({ userData });
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>프로필 수정</button>
      {showModal &&
        createPortal(
          <div ref={modalRef} className={modalStyle.modalOverlay}>
            <div className={modalStyle.modalBox}>
              <div className={modalStyle.modalEditBox}>
                <h3>프로필 수정</h3>
                <div className={modalStyle.userImageBox}>
                  {!previewImage ? (
                    <Image
                      src= {
                        user?.userProfileImage == null
                          ? "/image/user.jpg"
                          : user?.userProfileImage
                      }
                      alt="user-image"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Image
                      src={previewImage}
                      width={100}
                      height={100}
                      alt="preview-image"
                    />
                  )}
                  <div>
                    <input
                      className={modalStyle.imageInput}
                      type="file"
                      name="image"
                      id="file"
                      accept="image/*"
                      onChange={handleImagePreview}
                    />
                    <label htmlFor="file">
                      <Image
                        src="/icons/white_pencil.svg"
                        className={modalStyle.userImgEditIcon}
                        alt="post-add-icon"
                        width={30}
                        height={30}
                      />
                    </label>
                  </div>
                </div>

                <input
                  type="text"
                  defaultValue={
                    user?.userIntro
                      ? user?.userIntro
                      : `기본 소개글입니다. ${user?.userid}입니다.`
                  }
                  onChange={(e) => {
                    setIntroEdit(e.target.value);
                  }}
                />

                <div className={modalStyle.buttonBox}>
                  <button onClick={handleUserIntroEdit}>프로필 수정하기</button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    취소하기
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

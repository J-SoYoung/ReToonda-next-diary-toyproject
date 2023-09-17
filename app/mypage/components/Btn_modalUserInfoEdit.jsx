"use client";
import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import useUserDataEdit from "@/hooks/useUserDataEdit";
import modalStyle from "@/app/components/pageModalStyle.module.css";
import { imagePreviewUtil, imageUploadUtil } from "@/utils/imageUpload";

export default function Btn_modalUserInfoEdit({ user }) {
  const { userDataEditFunc } = useUserDataEdit();

  const [showModal, setShowModal] = useState(false);
  const [introEdit, setIntroEdit] = useState("");
  const modalRef = useRef(null);

  const [previewImage, setPreviewImage] = useState("");
  const [uploadFile, setUploadFile] = useState("");

  const handleImagePreview = async (e) => {
    const file = e.target.files?.[0];
    setUploadFile(file);

    // image 미리보기
    if(file){
      const preview = await imagePreviewUtil(file);
      setPreviewImage(preview);
    }
  };

  const handleUserIntroEdit = async () => {
    // S3 업로드
    const imageS3Upload = await imageUploadUtil(uploadFile);

    // 프로필 수정
    const userData = {
      ...user,
      userIntro: introEdit ? introEdit : user.userIntro,
      userProfileImage: imageS3Upload ? imageS3Upload : user.userProfileImage,
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
                      src={
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

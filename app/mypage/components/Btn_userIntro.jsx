"use client";
import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import modalStyle from "@/app/components/pageModalStyle.module.css";

export default function Btn_userIntro({ user }) {
  // const { userIntro } = loginUser;
  const [showModal, setShowModal] = useState(false);
  const [introEdit, setIntroEdit] = useState("");
  const modalRef = useRef(null);

  // const handleUserIntroEdit = async() => {
  //   if (introEdit == "") {
  //     alert("소개글이 빈칸입니다");
  //     return;
  //   }
  //   console.log("소개글수정");
  //   await fetch("/api/user/edit/", {
  //     method: "POST",
  //     body: JSON.stringify({ ...loginUser, userIntro: introEdit }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((r) => r.json())
  //     .then((result) => {
  //       console.log(result);
  //       alert('정보가 수정되었습니다')
  //       setIntroEdit('')
  //       setShowModal(false)
  //     });
  // };

  return (
    <>
      <button onClick={() => setShowModal(true)}>소개글 수정</button>
      {/* {showModal &&
        createPortal(
          <div ref={modalRef} className={modalStyle.modalOverlay}>
            <div className={modalStyle.modalBox}>
              <div className={modalStyle.modalEditBox}>
                <h3>소개글 수정하기</h3>
                <input
                  type="text"
                  defaultValue={loginUser.userIntro}
                  onChange={(e) => {
                    setIntroEdit(e.target.value);
                  }}
                />
                <div>
                  <button onClick={handleUserIntroEdit}>소개글 수정하기</button>
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
        )} */}
    </>
  );
}

"use client";
import React, { useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "./pageComponent.module.css";

export default function OptionModalButton() {
  const router = useRouter();
  const params = useParams();
  const id = decodeURIComponent(params.id);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  return (
    <>
      <button
        className={styles.optionBtn}
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        <Image
          src="/icons/green_list.svg"
          alt="list-icon"
          width={30}
          height={30}
        />
      </button>
      {showModal &&
        createPortal(
          <div ref={modalRef} className={styles.modalOverlay}>
            <div className={styles.modalBox}>
              <div className={styles.modalMessageBox}>
                <button
                  onClick={() => {
                    router.push("/postPage");
                  }}
                >
                  새 글 작성하기
                </button>
                <button
                  onClick={() => {
                    router.push(`/editPage/${id}`);
                  }}
                >
                  수정하기
                </button>
                <button>삭제하기</button>
                <button
                  onClick={(e) => {
                    setShowModal(false);
                  }}
                >
                  취소하기
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

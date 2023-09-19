"use client";
import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

import useModal from "@/hooks/useModal";
import Image from "next/image";
import styles from "../detailPage.module.css";
import modalStyle from "@/app/components/pageModalStyle.module.css";
import OptionModalButton from "./OptionModalButton";

export default function MiddleNavBar({ isWriter, userid, id }) {
  const router = useRouter();
  const modalRef = useRef(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [comment, setComment] = useState("");

  const handleClickCommentAdd = async () => {
    if (comment == "") {
      alert("댓글을 작성해주세요");
      return;
    }
    const commentData = {
      postid: id,
      userid: userid,
      comment: comment,
      createDate: new Date().getTime(),
    };

    try {
      const response = await fetch("/api/comment/new", {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("댓글 작성에 문제가 발생하였습니다.");
      }
      const result = await response.json();
      alert(result);
      setComment("");
      closeModal();
      router.refresh();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.middleNavBar}>
      <div>
        <Image
          src="/icons/green_comment.svg"
          alt="comment-icon"
          width={30}
          height={30}
          onClick={openModal}
        />
        <Image
          // src="/icons/green_outline_heart.svg"
          src="/icons/green_full_heart.svg"
          alt="like-icon"
          width={30}
          height={30}
        />
      </div>
      {isWriter && <OptionModalButton />}
      {isOpen &&
        createPortal(
          <div
            ref={modalRef}
            onClick={closeModal}
            className={modalStyle.modalOverlay}
          >
            <div className={modalStyle.modalBox}>
              <div className={modalStyle.modalEditBox}>
                <h3>다이어리를 읽은 소감은요?</h3>
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  type="text"
                  placeholder="댓글을 작성해주세요"
                />
                <div className={modalStyle.buttonBox}>
                  <button onClick={handleClickCommentAdd}>댓글 작성</button>
                  <button onClick={closeModal}>취소하기</button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

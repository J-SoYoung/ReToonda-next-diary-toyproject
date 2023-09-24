"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import modalStyle from "@/app/components/pageModalStyle.module.css";

export default function MidNavCommentButton({ isToken, userid, postid }) {
  const modalRef = useRef(null);
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);
  const [comment, setComment] = useState("");

  const handleClickCloseModal = (e) => {
    if (e.target === modalRef.current) {
      setIsModal(false);
    }
  };
  const handleClickCommentAdd = async () => {
    if (comment == "") {
      alert("댓글을 작성해주세요");
      return;
    }
    const commentData = {
      postid,
      userid,
      comment,
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
      setIsModal(false);
      router.refresh();
    } catch (error) {
      alert(error);
    }
  };
  const goLoginPage = () => {
    alert("로그인을 하셔야 댓글을 작성할 수 있습니다");
    router.push("/loginPage");
  };

  return (
    <>
      <Image
        src="/icons/green_comment.svg"
        alt="comment-icon"
        width={30}
        height={30}
        onClick={isToken ? () => setIsModal(!isModal) : goLoginPage}
      />
      {isModal &&
        createPortal(
          <div
            ref={modalRef}
            onClick={handleClickCloseModal}
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
                  <button onClick={() => setIsModal(false)}>취소하기</button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

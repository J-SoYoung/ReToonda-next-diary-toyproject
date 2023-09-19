"use client";
import React, { useState, useRef } from "react";
import useModal from "@/hooks/useModal";
import modalStyle from "./modalForm.module.css";

export default function ModalForm({ children, handleClickFunc }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [comment, setComment] = useState("");
  const modalRef = useRef(null);

  const handleModalClose = (e) => {
    // API 호출 함수 - 부모컴포넌트에서 prop으로전달
    // onCommentSubmit
    if (e.target === modalRef.current) {
      closeModal();
    }
    console.log(comment);
  };

  return (
    <div>
      <button onClick={openModal}>댓글 작성</button>
      {isOpen && (
        <div
          className={modalStyle.modalOverlay}
          onClick={handleModalClose}
          ref={modalRef}
        >
          <div className={modalStyle.modalBox}>
            <div className={modalStyle.modalContentsBox}>
              <div className={modalStyle.childrenBox}>{children}</div>
              <div className={modalStyle.buttonBox}>
                <button onClick={handleClickFunc}>예</button>
                <button onClick={handleModalClose}>취소</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import React, { useState, useRef } from "react";
// import modalStyle from "./modalForm.module.css";
// import useCloseModal from "@/hooks/useModalClose";

// export default function useModalForm({ children }) {
//   const modalRef = useRef(null);

//   const modalClose = (e) => {
//   };

// return (
// <div
//   className={modalStyle.modalOverlay}
//   onClick={modalClose}
//   ref={modalRef}
// >
//   <div className={modalStyle.modalBox}>
//     <div className={modalStyle.modalContentsBox}>
//       <div className={modalStyle.childrenBox}>{children}</div>
//       <div className={modalStyle.buttonBox}>
//         <button>예</button>
//         <button onClick={onClose}>취소</button>
//       </div>
//     </div>
//   </div>
// </div>
// );
// }

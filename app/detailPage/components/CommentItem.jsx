"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// contextAPI import
import { AuthenticationContext } from "@/app/context/AuthContext";
// style, component, icon import
import styles from "../detailPage.module.css";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DoneIcon from '@mui/icons-material/Done';
import ReplyIcon from "@mui/icons-material/Reply";

export default function CommentItem({ comment }) {
  const router = useRouter();
  const { data } = useContext(AuthenticationContext);
  const [editState, setEditState] = useState(false);
  const [commentEditData, setCommentEditData] = useState("");

  const clickCommentEdit = async () => {
    if (commentEditData == "") {
      alert("수정할 댓글 내용이 없습니다");
      return;
    }
    try {
      const editData = {
        ...comment,
        comment: commentEditData,
      };
      const response = await fetch(`/api/comment/edit`, {
        method: "POST",
        body: JSON.stringify(editData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("댓글 수정에 문제가 발생하였습니다.");
      }
      const result = await response.json();
      router.refresh();
      alert(result);
      setEditState(false);
      setCommentEditData("");
    } catch (error) {
      alert(error);
    }
  };

  const clickCommentDelete = async () => {
    if (confirm("정말로 댓글을 삭제하시겠습니까?")) {
      return fetch(`/api/comment/delete?id=${comment._id}`)
        .then((res) => res.json())
        .then((result) => {
          alert(result);
          router.refresh();
        });
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentUser}>
        <div className={styles.commentUserInfo}>
          <Image
            src={comment.userProfileImage}
            width={40}
            height={40}
            alt="comment-user"
          />
          <p>{comment.userid}</p>
        </div>
        {data?.userid == comment?.userid && (
          <div className={styles.commentButton}>
            {!editState ? (
              <>
                <ModeEditIcon
                  className={styles.commentBtnIcon}
                  onClick={() => setEditState(true)}
                />
                <DeleteIcon
                  className={styles.commentBtnIcon}
                  onClick={clickCommentDelete}
                />
              </>
            ) : (
              <>
                <DoneIcon
                  className={styles.commentBtnIcon}
                  onClick={clickCommentEdit}
                />
                <ReplyIcon
                  className={styles.commentBtnIcon}
                  onClick={() => setEditState(false)}
                />
              </>
            )}
          </div>
        )}
      </div>
      {!editState ? (
        <p className={styles.commentText}>{comment.comment}</p>
      ) : (
        <input
          className={styles.commentInput}
          type="text"
          defaultValue={comment.comment}
          onChange={(e) => setCommentEditData(e.target.value)}
        />
      )}
    </div>
  );
}

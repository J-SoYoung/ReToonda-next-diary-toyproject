"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MidNavLikeButton({ userid, postid, likeid, isLike }) {
  const [like, setLike] = useState(isLike);

  const clickLikeButton = async () => {
    try {
      const postLike = {
        likeid,
        userid,
        postid,
        isLike: !isLike,
      };

      const response = await fetch("/api/like/update", {
        method: "POST",
        body: JSON.stringify(postLike),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("좋아요에 문제가 발생하였습니다");
      }
      const result = await response.json();
      alert(result);
      setLike(!like);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Image
        src={
          like
            ? "/icons/green_full_heart.svg"
            : "/icons/green_outline_heart.svg"
        }
        alt="like-icon"
        width={like ? 30 : 35}
        height={like ? 30 : 35}
        onClick={clickLikeButton}
      />
    </>
  );
}

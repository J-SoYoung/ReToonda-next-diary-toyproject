"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import styles from "../mypage.module.css";
import Btn_userIntro from "./Btn_userIntro";
import Btn_logout from "./Btn_logout";

export default function UserInfoBox() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    const email = localStorage.getItem("email");
    const userIntro = localStorage.getItem("userIntro");
    const userProfileImage = localStorage.getItem("userProfileImage");
    const user = {
      userid,
      email,
      userIntro,
      userProfileImage,
    };
    setUser(user);
  }, []);

  return (
    <div className={styles.userInfoBox}>
      <h2>{user.userid}의 툰 다이어리</h2>
      <div className={styles.userInfo}>
        <div className={styles.imageBox}>
          <Image
            src={
              !user.userProfileImage == null ? user.userProfileImage : "/image/user.jpg"
            }
            alt="basic-user-icon"
            width={100}
            height={100}
          />
          <Image
            src="/icons/white_pencil.svg"
            className={styles.userImgEditIcon}
            alt="post-add-icon"
            width={30}
            height={30}
          />
        </div>
        <div className={styles.textBox}>
          <p>
            { !user?.userIntro == null
              ? user.userIntro
              : `기본 소개글입니다. ${user.userid}입니다.`}
          </p>
          <Btn_userIntro user={user} />
          <Btn_logout />
        </div>
      </div>
    </div>
  );
}

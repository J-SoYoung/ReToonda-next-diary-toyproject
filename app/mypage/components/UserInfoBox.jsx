"use client";
import React, { useContext, useState } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";
import Image from "next/image";

import styles from "../mypage.module.css";
import Btn_userInfoModal from "./Btn_userInfoModal";
import Btn_logout from "./Btn_logout";

export default function UserInfoBox() {
  const { data } = useContext(AuthenticationContext);
  console.log(data);

  return (
    <div className={styles.userInfoBox}>
      <h2>{data?.userid}의 툰 다이어리</h2>
      <div className={styles.userInfo}>
        <div className={styles.imageBox}>
          <Image
            src={
              data?.userProfileImage == null
                ? "/image/user.jpg"
                : data?.userProfileImage
              }
            alt="user-icon"
            width={100}
            height={100}
          />
        </div>
        <div className={styles.textBox}>
          <p>
            {data?.userIntro == null
              ? `기본 소개글입니다. ${data?.userid}입니다.`
              : data?.userIntro}
          </p>
          <Btn_userInfoModal user={data} />
          <Btn_logout />
        </div>
      </div>
    </div>
  );
}

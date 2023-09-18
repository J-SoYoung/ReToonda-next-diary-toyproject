import React from "react";
import { connectDB } from "@/utils/database";
import styles from "../detailPage.module.css";
import Image from "next/image";

export default async function IntroSection({ title, postUser }) {
  const db = (await connectDB).db("Toonda");
  const user = await db.collection("user_card").findOne({ userid: postUser });

  return (
    <div className={styles.deatailMainInfo}>
      <div className={styles.detailUser}>
        <Image
          src={user?.userProfileImage}
          width={35}
          height={35}
          alt="detail-user-profile"
        />
        <p>{postUser}</p>
      </div>
      <p className={styles.detailTitle}>{title}</p>
    </div>
  );
}

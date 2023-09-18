import React from "react";
import { connectDB } from "@/utils/database";

import styles from "./pageComponent.module.css";
import ChatIcon from "@mui/icons-material/Chat";
import StarIcon from "@mui/icons-material/Star";

export default async function DiaryItemCommenNo({ postid }) {
  const db = (await connectDB).db("Toonda");

  const commentAll = await db.collection("comment").find().toArray();
  commentAll.sort((a, b) => b.createDate - a.createDate);
  const comment = commentAll.filter((c) => {
    return c.postid == postid;
  });

  return (
    <div className={styles.commentNo}>
      <span>
        {comment.length}
        <ChatIcon sx={{ fontSize: 18 }} />
      </span>
      <span>
        10
        <StarIcon sx={{ fontSize: 20 }} />
      </span>
    </div>
  );
}

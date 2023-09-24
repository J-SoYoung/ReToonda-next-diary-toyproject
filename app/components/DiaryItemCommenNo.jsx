import React from "react";
import { connectDB } from "@/utils/database";
import styles from "./pageComponent.module.css";
// icon import
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default async function DiaryItemCommenNo({ postid, type }) {
  const db = (await connectDB).db("Toonda");

  const commentAll = await db.collection("comment").find().toArray();
  commentAll.sort((a, b) => b.createDate - a.createDate);
  const comment = commentAll.filter((c) => {
    return c.postid == postid;
  });

  const LikeAll = await db.collection("like").find().toArray();
  const like = LikeAll.filter((c)=>{
    return c.postid == postid
  })

  return (
    <div className={type == "list" ? styles.ListCommentNo : styles.commentNo}>
      <span>
        {comment.length}
        <ChatIcon sx={{ fontSize: 18 }} />
      </span>
      <span>
        {like.length}
        <FavoriteIcon sx={{ fontSize: 18 }} />
      </span>
    </div>
  );
}

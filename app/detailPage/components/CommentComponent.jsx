import styles from "../detailPage.module.css";
import CommentItem from "./CommentItem";
import { connectDB } from "@/utils/database";

export default async function CommentComponent({postid}) {
  const db = (await connectDB).db("Toonda");  
  const commentAll = await db.collection("comment").find().toArray()
  commentAll.sort((a, b) => b.createDate - a.createDate);
  const commentList = commentAll.filter((c) => {
    return c.postid == postid;
  });

  return (
    <div className={styles.commentBox}>
      {commentList.map((comment,idx) => {
        return <CommentItem key={idx} comment={comment} />;
      })}
    </div>
  );
}
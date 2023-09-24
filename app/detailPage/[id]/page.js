import Image from "next/image";
import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"; // token의 payload찾는 lib

import styles from "../detailPage.module.css";
import IntroSection from "../components/IntroSection";
import ContentSection from "../components/ContentSection";
import MiddleNavBar from "../components/MiddleNavBar";
import CommentComponent from "../components/CommentComponent";

export default async function DetailPage(props) {
  const db = (await connectDB).db("Toonda");
  const token = cookies().get("jwt");
  const userid = jwt.decode(token?.value)?.userid;
  const postData = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  const isWriter = userid == postData.user;

  return (
    <div className={styles.home}>
      <div className={styles.detailItem}>
        <IntroSection title={postData?.title} postUser={postData?.user} />
        <Image
          className={styles.detailImage}
          src={postData?.image}
          alt="image"
          width={490}
          height={400}
        />
        <MiddleNavBar
          isToken={token ? true : false}
          isWriter={isWriter}
          userid={userid}
          id={props.params.id}
        />
        <ContentSection date={postData?.date} content={postData?.content} />
        <CommentComponent postid={props.params.id} />
      </div>
    </div>
  );
}

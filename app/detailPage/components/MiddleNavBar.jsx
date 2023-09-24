import { connectDB } from "@/utils/database";

import styles from "../detailPage.module.css";
import OptionModalButton from "./OptionModalButton";
import MidNavCommentButton from "./MidNavCommentButton";
import MidNavLikeButton from "./MidNavLikeButton";

export default async function MiddleNavBar({ isWriter, userid, id, isToken }) {
  const db = (await connectDB).db("Toonda");
  const collection = await db.collection("like");
  const result = await collection.findOne({
    $and: [{ postid: id }, { userid }],
  });

  return (
    <div className={styles.middleNavBar}>
      <div>
        <MidNavCommentButton isToken={isToken} userid={userid} postid={id} />
        <MidNavLikeButton
          userid={userid}
          postid={id}
          likeid={!result ? false : result?._id}
          isLike={!result ? false : result?.isLike}
        />
      </div>
      {isWriter && <OptionModalButton />}
    </div>
  );
}

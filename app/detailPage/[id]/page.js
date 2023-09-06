import Image from "next/image";
import { connectDB } from "../../utils/database/database.js";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

import styles from "../detailPage.module.css";
import OptionModalButton from "@/app/components/OptionModalButton";

export default async function DetailPage(props) {
  const userCookieData = cookies().has("userData");
  let db = (await connectDB).db("Toonda");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div className={styles.home}>
      <div className={styles.detailItem}>
        <div className={styles.detailSubTitle}>
          <p>{result?.title}</p>
          <p>{result?.date}</p>
        </div>
        <div className={styles.detailImage}>
          <Image src={result?.image} alt="image" width={490} height={400} />
        </div>
        <div className={styles.middleNavBar}>
          <div className={styles.middleNavBarLike}>
            <Image
              src="/icons/green_comment.svg"
              alt="comment-icon"
              width={30}
              height={30}
            />
            <Image
              src="/icons/green_star.svg"
              alt="like-icon"
              width={30}
              height={30}
            />
          </div>
          {userCookieData && <OptionModalButton />}
        </div>
        <div className={styles.detailText}>
          <span>{result?.content}</span>
        </div>
      </div>
    </div>
  );
}

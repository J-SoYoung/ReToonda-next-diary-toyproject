import Image from "next/image";

import styles from "./page.module.css";

// Database , next-auth
import { connectDB } from "../public/utils/database/database";

// 컴포넌트
import Btn_PostAdd from "./components/Btn_PostAdd";
import Btn_PageUp from "./components/Btn_PageUp";
import DiaryItem from "./components/DiaryItem";

export default async function Home() {

  const client = await connectDB;
  const db = client.db("Toonda");
  const result = await db.collection("post").find().toArray();

  return (
    <div className={styles.home}>
      <section className={styles.carousel}>
        <Image src={"/image/banner1.png"} alt="ex" width={500} height={200} />
      </section>

      <section className={styles.contentBox}>
        <div className={styles.contentTitle}>
          Today's DIARY
          <Btn_PostAdd />
        </div>
        <div className={styles.contentDiary}>
          {result.map((list)=>{
            return (
              <DiaryItem list={list} />
            )
          })}
        </div>
      </section>
      <Btn_PageUp />
    </div>
  );
}

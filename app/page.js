import Image from "next/image";
import styles from "./page.module.css";
import { connectDB } from "../public/utils/database/database";

// 컴포넌트
import Btn_PageUp from "./components/Btn_PageUp";
import DiaryItem from "./components/DiaryItem";
import DiaryTitleBar from "./components/DiaryTItleBar";
import DiaryContentSection from "./components/DiaryContentSection";

export default async function Home() {

  const client = await connectDB;
  const db = client.db("Toonda");
  const result = await db.collection("post").find().toArray();

  return (
    <div className={styles.home}>
      <section className={styles.carousel}>
        <Image src={"/image/banner1.png"} alt="ex" width={500} height={200} />
      </section>
      <DiaryContentSection title="Today's DIARY" items={result} />
      <Btn_PageUp />
    </div>
  );
}

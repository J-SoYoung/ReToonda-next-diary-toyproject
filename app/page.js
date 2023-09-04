import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import styles from "./page.module.css";

// Database , next-auth
import { connectDB } from "./utils/database/database";
import { parse } from "cookie";

// 컴포넌트
import Btn_PostAdd from "./components/Btn_PostAdd";
import Btn_PageUp from "./components/Btn_PageUp";

export default async function Home() {
  const userCookieData = cookies().get("userData");
  const loginUser = JSON.parse(userCookieData.value);

  // const client = await connectDB;
  // const db = client.db("Toonda");
  // const result = await db.collection("post").find().toArray();

  return (
    <div className={styles.home}>
      <section className={styles.carousel}>
        <Image src={"/image/banner1.png"} alt="ex" width={500} height={200} />
      </section>

      <section className={styles.contentBox}>
        <div className={styles.contentTitle}>
          Today's DIARY
          {userCookieData && <Btn_PostAdd loginUser={loginUser} />}
        </div>
        <div className={styles.contentDiary}>
          <Link href="/detailPage/1" className={styles.contentItem}>
            <Image
              className={styles.itemImg}
              alt="ex"
              src={"/image/toondaBasic.png"}
              width={140}
              height={160}
            />
            <div className={styles.itemText}>
              오늘의sssdfsdf sdf 툰오늘의툰오늘의툰오늘의툰오늘의툰
            </div>
          </Link>
          <Link href="/detailPage/1" className={styles.contentItem}>
            <Image
              className={styles.itemImg}
              alt="ex"
              src={"/image/toondaBasic.png"}
              width={140}
              height={160}
            />
            <div className={styles.itemText}>
              오늘의툰오늘의툰오늘의툰오늘의툰오늘의툰
            </div>
          </Link>
        </div>
      </section>
      <Btn_PageUp />
    </div>
  );
}

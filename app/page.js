import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import styles from "./page.module.css";
// Database , next-auth
import { connectDB } from "./utils/database/database";
import { parse } from "cookie";

// 컴포넌트
import PostAddButton from "./components/PostAddButton";
import PageUpButton from "./components/PageUpButton";
import GithubLoginButton from "./components/GithubLoginButton";

export default async function Home() {
  // const client = await connectDB;
  // const db = client.db("Toonda");
  // const result = await db.collection("post").find().toArray();

  const userCookieData = cookies().get("userData");
  const cookiesParse = JSON.parse(userCookieData.value)

  return (
    <div className={styles.home}>
      <nav className={styles.nav}>
        <Link href={"/"} className={styles.navLogo}>
          Toonda
        </Link>
        {userCookieData ? (
          <>
            <Link
              href={`/mypage/${cookiesParse.userid}`}
              className={styles.loginBtn}
            >
              마이페이지
            </Link>
          </>
        ) : (
          <Link href={"/loginPage"} className={styles.loginBtn}>
            로그인
          </Link>
        )}
      </nav>

      <section className={styles.carousel}>
        <Image src={"/image/banner1.png"} alt="ex" width={500} height={200} />
      </section>

      <section className={styles.contentBox}>
        <div className={styles.contentTitle}>
          Today's DIARY
          <PostAddButton />
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
      <PageUpButton />
    </div>
  );
}

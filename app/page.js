import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.home}>
      <nav className={styles.nav}>
        <Link href={'/'} className={styles.navLogo}>Toonda</Link>
        <Link href={'/'} className={styles.loginBtn}>로그인</Link>
        {/* <div>
          <p className={styles.loginBtn}>마이페이지</p>
          <p className={styles.loginBtn}>로그아웃</p>
        </div> */}
      </nav>

      <section className={styles.carousel}>
        <Image src={"/image/banner1.png"} width={500} height={200} />
      </section>

      <section className={styles.contentsBox}>
        <div>최신 DIARY</div>
        <div>
          <Image src={"/image/toondaBasic.png"} width={120} height={160} />
          <p>오늘의툰</p>
        </div>
      </section>

      <button className={styles.addDiaryBtn}> + </button>
    </div>
  );
}

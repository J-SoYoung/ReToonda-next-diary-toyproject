import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import PostAddButton from "./components/PostAddButton";

export default function Home() {
  return (
    <div className={styles.home}>
      <nav className={styles.nav}>
        <Link href={'/'} className={styles.navLogo}>Toonda</Link>
        <Link href={'/loginPage'} className={styles.loginBtn}>로그인</Link>
        {/* <div>
          <p className={styles.loginBtn}>마이페이지</p>
          <p className={styles.loginBtn}>로그아웃</p>
        </div> */}
      </nav>

      <section className={styles.carousel}>
        <Image src={"/image/banner1.png"} width={500} height={200} />
      </section>

      <section className={styles.contentBox}>
        <div className={styles.contentTitle}>최신 DIARY</div>
        <div className={styles.contentDiary}>
          <div className={styles.contentItem}>
            <Image className={styles.itemImg} src={"/image/toondaBasic.png"} width={140} height={160} />
            <div className={styles.itemText}>오늘의sssdfsdf sdf 툰오늘의툰오늘의툰오늘의툰오늘의툰</div>
          </div>
          <div className={styles.contentItem}>
            <Image className={styles.itemImg} src={"/image/toondaBasic.png"} width={140} height={160} />
            <div className={styles.itemText}>오늘의툰오늘의툰오늘의툰오늘의툰오늘의툰</div>
          </div>
          <div className={styles.contentItem}>
            <Image className={styles.itemImg} src={"/image/toondaBasic.png"} width={140} height={160} />
            <div className={styles.itemText}>오늘의툰오늘의툰 툰오늘의 오늘의툰오늘의툰오늘의툰</div>
          </div>
          <div className={styles.contentItem}>
            <Image className={styles.itemImg} src={"/image/toondaBasic.png"} width={140} height={160} />
            <div className={styles.itemText}>오늘의툰오늘의툰오늘의툰오늘의툰오늘의툰</div>
          </div>
          
        </div>
      </section>
      <PostAddButton/>
    </div>
  );
}

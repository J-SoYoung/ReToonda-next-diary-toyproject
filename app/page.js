import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import PostAddButton from "./components/PostAddButton";
import PageUpButton from "./components/PageUpButton";

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
        <Image src={"/image/banner1.png"} alt='ex' width={500} height={200} />
      </section>

      <section className={styles.contentBox}>
        <div className={styles.contentTitle}>
            Today's DIARY
          <PostAddButton/>
        </div>
        <div className={styles.contentDiary}>
          <Link href='/detailPage/1' className={styles.contentItem}>
            <Image className={styles.itemImg} alt='ex' src={"/image/toondaBasic.png"} width={140} height={160} />
            <div className={styles.itemText}>오늘의sssdfsdf sdf 툰오늘의툰오늘의툰오늘의툰오늘의툰</div>
          </Link>
          <Link href='/detailPage/1' className={styles.contentItem}>
            <Image className={styles.itemImg} alt='ex' src={"/image/toondaBasic.png"} width={140} height={160} />
            <div className={styles.itemText}>오늘의툰오늘의툰오늘의툰오늘의툰오늘의툰</div>
          </Link>
        </div>
      </section>
      <PageUpButton/>
    </div>
  );
}

import Link from "next/link";
import styles from "../mypage.module.css";
import Image from "next/image";
import PostAddButton from "@/app/components/PostAddButton";

export default function MyPage() {
  return (
    <div className={styles.home}>
      <nav className={styles.nav}>
        <Link href={"/"} className={styles.navLogo}>
          Toonda
        </Link>
        {/* <Link href={'/loginPage'} className={styles.loginBtn}>로그인</Link> */}
        <Link href="/mypage/thdud" className={styles.loginBtn}>
          마이페이지
        </Link>
      </nav>
      <div className={styles.userInfoBox}>
        <h2>나의 툰 다이어리</h2>
        <div className={styles.userInfo}>
          <div className={styles.imageBox}>
            <Image src="/image/user.jpg" width={100} height={100} />
            <Image
              src="/icons/white_pencil.svg"
              className={styles.userImgEditIcon}
              width={30}
              height={30}
            />
          </div>
          <div className={styles.textBox}>
            <p>기본 정보입니다. 정소영입니다. </p>
            <button>프로필 수정</button>
            <button>설정</button>
          </div>
        </div>
      </div>
      <div className={styles.myContentBox}>
        <div className={styles.contentTitle}>
            My DIARY
          <PostAddButton/>
        </div>
        <div className={styles.contentDiary}>
          <Link href='/detailPage/1' className={styles.contentItem}>
            <Image className={styles.itemImg} alt='ex' src={"/image/toondaBasic.png"} width={140} height={160} />
            <div className={styles.itemText}>오늘의sssdfsdf sdf 툰오늘의툰오늘의툰오늘의툰오늘의툰</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

import styles from "../myPage.module.css";
import PostAddButton from "@/app/components/Btn_PostAdd";
import Btn_logout from "@/app/components/Btn_logout";

export default function MyPage() {
  return (
    <div className={styles.home}>
      <div className={styles.userInfoBox}>
        <h2>나의 툰 다이어리</h2>
        <div className={styles.userInfo}>
          <div className={styles.imageBox}>
            <Image
              src="/image/user.jpg"
              alt="basic-user-icon"
              width={100}
              height={100}
            />
            <Image
              src="/icons/white_pencil.svg"
              className={styles.userImgEditIcon}
              alt="post-add-icon"
              width={30}
              height={30}
            />
          </div>
          <div className={styles.textBox}>
            <p>기본 정보입니다. 정소영입니다. </p>
            <button>프로필 수정</button>
            <Btn_logout />
          </div>
        </div>
      </div>
      <div className={styles.myContentBox}>
        <div className={styles.contentTitle}>
          My DIARY
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
        </div>
      </div>
    </div>
  );
}

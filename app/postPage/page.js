import Link from "next/link";
import Image from "next/image";
import styles from "./postPage.module.css";

export default function PostPage() {
  return (
    <div className={styles.home}>
      <nav className={styles.nav}>
        <Link href={"/"} className={styles.navLogo}>
          Toonda
        </Link>
        <Link href={"/"} className={styles.loginBtn}>
          <Image src="./icons/white_check_squre.svg" width={25} height={25} />
        </Link>
      </nav>
      <section className={styles.postBox}>
        <div className={styles.postInputBox}>
          <input name="date" type="date" />
          <input
            name="title"
            type="text"
            placeholder="툰 제목을 입력해주세요"
          />
        </div>
        <div className={styles.postTextarea}>
          <textarea maxLength="100" placeholder="오늘의 툰을 설명해주세요" />
        </div>
        <div className={styles.postImageBox}>
          <div className={styles.labelBox}>
            <label htmlFor="file">
              <Image src='/icons/gray_image_add.svg' width={100} height={100}/>
              <p>오늘의 툰을 올려주세요</p>
            </label>
          </div>
          <input type="file" id="file" accept="image/*" required />
        </div>
      </section>
    </div>
  );
}

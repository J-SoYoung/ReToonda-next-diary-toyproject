import Image from "next/image";
import Link from "next/link";
import styles from "../loginPage/loginPage.module.css";

export default function SingupPage() {
  return (
    <div className={styles.home}>
      <section className={styles.titleBox}>
        <Image className={styles.titleImg} alt='main-image' src={"/image/toonda.png"} width={70} height={70} />
        <div>
          <p className={styles.mainTitle}>ToonDa</p>
          <p className={styles.subTitle}>툰다에 오신것을 환영합니다</p>
        </div>
      </section>
      <form>
        <div className={styles.inputBox}>
          <input
            className={styles.inputItem}
            placeholder="아이디를 입력하세요"
          />
          <input
            className={styles.inputItem}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className={styles.buttonBox}>
          <button>회원가입</button>
          <Link href={"./loginPage"}>로그인하러 가기</Link>
        </div>
      </form>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import styles from "./loginPage.module.css";

export default function LoginPage() {

  return (
    <div className={styles.home}>
    <section className={styles.titleBox}>
      <Image src={'/image/toonda.png'} alt='main-image' width={150} height={150}/>
      <div>
        <p className={styles.mainTitle}>ToonDa</p>
        <p className={styles.subTitle}>툰으로 하루 일상을 표현해요</p>
      </div>
    </section>
    <form>
      <div className={styles.inputBox}>
        <input className={styles.inputItem} placeholder="아이디를 입력하세요"/>
        <input className={styles.inputItem} placeholder="비밀번호를 입력하세요"/>
      </div>
      <div className={styles.buttonBox}>
        <button>로그인</button>
        <Link href={'./signupPage'}>회원가입하러 가기</Link>
      </div>
    </form>
    </div>
  )
}
import Image from "next/image";
import Link from "next/link";
import styles from "../loginPage/loginPage.module.css";
import SignupInputBox from "./components/SignupInputBox";

export default function SingupPage() { 
  
  return (
    <div className={styles.home}>
      <section className={styles.titleBox}>
        <Image className={styles.titleImg} alt='main-image' src={"/image/toonda.png"} width={70} height={70} />
        <div className={styles.textBox}>
          <p className={styles.mainTitle}>ToonDa</p>
          <p className={styles.subTitle}>툰다에 오신것을 환영합니다</p>
        </div>
      </section>
      <SignupInputBox/>
    </div>
  );
}

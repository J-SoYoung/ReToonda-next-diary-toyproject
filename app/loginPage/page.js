import Image from "next/image";
import styles from "./loginPage.module.css";
import LoginInputBox from "./components/LoginInputBox";

export default async function LoginPage() {

  return (
    <div className={styles.home}>
      <section className={styles.titleBox}>
        <Image
          src={"/image/toonda.png"}
          alt="main-image"
          width={150}
          height={150}
        />
        <div>
          <p className={styles.mainTitle}>ToonDa</p>
          <p className={styles.subTitle}>툰으로 하루 일상을 표현해요</p>
        </div>
      </section>
      <LoginInputBox/>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import styles from "./loginPage.module.css";
import GithubLoginButton from "../components/GithubLoginButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

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
      <form method="POST" action="/api/auth/login">
        <div className={styles.inputBox}>
          <input
            name="userid"
            type="text"
            className={styles.inputItem}
            placeholder="아이디를 입력하세요"
          />
          <input
            name="password"
            type="password"
            className={styles.inputItem}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className={styles.buttonBox}>
          <button type="submit">로그인</button>
          {/* 미션_ 깃헙 소셜도 같이 구현 */}
          {/* <GithubLoginButton /> */}
          <Link href={"./signupPage"}>회원가입하러 가기</Link>
        </div>
      </form>
    </div>
  );
}

import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import styles from './pageLayout.module.css'

export default function NavBar() {
  const userCookieData = cookies().get("userData");

  if (userCookieData) {
    const cookiesParse = JSON.parse(userCookieData.value);
    return (
      <nav className={styles.nav}>
        <Link href={"/"} className={styles.navLogo}>
          Toonda
        </Link>
        <Link
          href={`/myPage/${cookiesParse.userid}`}
          className={styles.loginBtn}
        >
          마이페이지
        </Link>
      </nav>
    );
  }

  return (
    <>
      <nav className={styles.nav}>
        <Link href={"/"} className={styles.navLogo}>
          Toonda
        </Link>
        <Link href={"/loginPage"} className={styles.loginBtn}>
          로그인
        </Link>
      </nav>
    </>
  );
}

"use client";
import Link from "next/link";
import styles from "./pageLayout.module.css";

export default function NavBar() {
  let user;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("userid");
  }

  return (
    <>
      <nav className={styles.nav}>
        <Link href={"/"} className={styles.navLogo}>
          Toonda
        </Link>
        {user ? (
          <Link href={`/myPage/${user}`} className={styles.loginBtn}>
            마이페이지
          </Link>
        ) : (
          <Link href={"/loginPage"} className={styles.loginBtn}>
            로그인
          </Link>
        )}
      </nav>
    </>
  );
}

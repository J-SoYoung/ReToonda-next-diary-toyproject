"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import styles from "./pageLayout.module.css";

export default function NavBar() {
  const { data } = useContext(AuthenticationContext);

  return (
    <>
      <nav className={styles.nav}>
        <Link href={"/"} className={styles.navLogo}>
          Toonda
        </Link>
        {data ? (
          <Link href={`/myPage/${data.userid}`} className={styles.loginBtn}>
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

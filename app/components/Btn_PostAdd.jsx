"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import styles from "./pageComponent.module.css";

export default function Btn_PostAdd() {
  const router = useRouter();
  const { data } = useContext(AuthenticationContext);
  
  return (
    <button
      className={styles.postAddBtn}
      onClick={() => {
        if (!data) {
          alert("로그인 후 사용 가능합니다");
          router.push("/loginPage");
          return;
        }
        router.push("/postPage");
      }}
    >
      <Image
        src="/icons/green_pencil.svg"
        alt="post-add-icon"
        width={30}
        height={30}
      />
    </button>
  );
}

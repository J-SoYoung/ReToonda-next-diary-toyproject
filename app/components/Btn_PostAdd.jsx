"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./pageComponent.module.css";

export default function Btn_PostAdd({ loginUser }) {
  const router = useRouter();
  const path = usePathname();
  
  if(path == '/'){
    // 메인 페이지에서만 localStorage에 쿠키데이터 저장하기
    localStorage.setItem("userid", loginUser?.userid);
    localStorage.setItem("userIntro", loginUser?.userIntro);
    localStorage.setItem("userProfileImage", loginUser?.userProfileImage);
  }

  return (
    <button
      className={styles.postAddBtn}
      onClick={() => {
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

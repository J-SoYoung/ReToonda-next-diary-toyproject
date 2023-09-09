"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./pageComponent.module.css";

export default function Btn_PostAdd() {
  const router = useRouter();
  let user;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("userid");
  }



  return (
    <button
      className={styles.postAddBtn}
      onClick={() => {
      if(!user){
        alert('로그인 후 사용 가능합니다')
        router.push('/loginPage')
        return
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

"use client";
import styles from "./pageComponent.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Btn_PostAdd() {
  const router = useRouter();
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

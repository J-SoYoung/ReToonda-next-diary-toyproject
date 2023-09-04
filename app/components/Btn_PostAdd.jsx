"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./pageComponent.module.css";

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

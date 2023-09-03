"use client";
import React from "react";
import styles from "./pageComponent.module.css";
import Image from "next/image";

export default function Btn_PageUp() {
  return (
    <button
      className={styles.PageUpButton}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Image src="/icons/white_arrow_up.svg" alt='arrow-up-icon' width={50} height={50} />
    </button>
  );
}

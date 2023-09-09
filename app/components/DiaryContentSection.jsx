import React from "react";
import styles from "../page.module.css";
import Btn_PostAdd from "./Btn_PostAdd";
import DiaryItem from "./DiaryItem";
import Image from "next/image";

export default function DiaryContentSection({ title, items }) {
  return (
    <section className={styles.contentBox}>
      <div className={styles.contentTitle}>
        <span>{title}</span>
        <Btn_PostAdd />
      </div>
      <div className={styles.contentDiary}>
        {items.length == 0 ? (
          <div className={styles.emptyDiary}>
            <Image src='/image/toondaBasic.png' width={130} height={150} alt='basic-toonda'/>
            <p> 작성한 다이어리가 없네요!<br></br> 다이어리를 작성해보세요. </p>
          </div>
        ) : (
          items.map((item) => {
            return <DiaryItem item={item} />;
          })
        )}
      </div>
    </section>
  );
}

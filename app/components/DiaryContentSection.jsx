import React from "react";
import Image from "next/image";
import styles from "./pageComponent.module.css";
import Btn_PostAdd from "./Btn_PostAdd";
import DiaryItem from "./DiaryItem";
import DiaryTypeState from "./DiaryTypeState";


export default function DiaryContentSection({ title, items }) {
  return (
    <section className={styles.contentBox}>
      <div className={styles.contentTitle}>
        <span>{title}</span>
        <Btn_PostAdd />
      </div>
      <DiaryTypeState />
      <div className={styles.contentDiary}>
        {items.length == 0 ? (
          <div className={styles.emptyDiary}>
            <Image src='/image/toondaBasic.png' width={130} height={150} alt='basic-toonda'/>
            <p> 작성한 다이어리가 없네요!<br></br> 다이어리를 작성해보세요. </p>
          </div>
        ) : (
          // <DiaryItem items={items} type={'list'}/>
          items.map((item) => {
              return <DiaryItem item={item} type={'grid'}/>;
            })
          )
        }
      </div>
    </section>
  );
}

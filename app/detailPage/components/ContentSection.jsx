import React from "react";
import styles from "../detailPage.module.css";

export default function ContentSection({ date, content }) {
  return (
    <div className={styles.detailText}>
      <div className={styles.detailDateBox}>
        <span>{date}</span>
        <span>🌤️</span>
      </div>
      <div className={styles.detailContent}>{content}</div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import styles from "../detailPage.module.css";
import OptionModalButton from "@/app/components/OptionModalButton";

export default function DetailPage() {
  return (
    <div className={styles.home}>
      <div className={styles.detailItem}>
        <div className={styles.detailSubTitle}>
          <p>부제목입니다만후후</p>
          <p>2023.09.02</p>
        </div>
        <div className={styles.detailImage}>
          <Image src="/image/ex.jpg" alt='ex' width={490} height={400} />
        </div>
        <div className={styles.middleNavBar}>
          <div className={styles.middleNavBarLike}>
            <Image src="/icons/green_comment.svg" alt='comment-icon' width={30} height={30} />
            <Image src="/icons/green_star.svg" alt='like-icon' width={30} height={30} />
          </div>
            <OptionModalButton/>
        </div>
        <div className={styles.detailText}>
          <span>
            나비야 나비야 이리날아 오너라 호랑나비 흰나비 나비야 나비야 이리날아
            오너라 호랑나비 흰나비 춤을추며 오너라 가나다라 마바사아자차
            카타파하나비야 나비야 이리날아 오너라 호랑나비 흰나비 나비야 나비야
            이리날아 오너라 호랑나비 흰나비 춤을추며 오너라 가나다라
            마바사아자차 카타파하아 비야 나비야 이리날아 오너라 호랑나비 흰나비
            나비야 나비야 이리날아 나비야 나비야 이리날아 오너라 호랑나비 흰나비
            나비야 나비야 이리날아 오너라 호랑나비 흰나비 춤을추며 오너라
            가나다라 마바사아자차 카타파하나비야 나비야 이리날아 오너라 호랑나비
            흰나비 나비야 나비야 이리날아 오너라 호랑나비 흰나비 춤을추며 오너라
            가나다라 마바사아자차 카타파
          </span>
        </div>
      </div>
    </div>
  );
}

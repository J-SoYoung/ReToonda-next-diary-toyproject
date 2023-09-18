import Image from 'next/image'
import Link from 'next/link'
import styles from './pageComponent.module.css'
import DiaryItemCommenNo from './DiaryItemCommenNo';

export default function DiaryItem({item}) {
  return (
    <Link href={`/detailPage/${item._id}`} className={styles.ItemBox}>
      <div className={styles.contentItem}>
        <Image
          className={styles.itemImg}
          alt="image"
          src={item.image}
          width={146}
          height={220}
          />
        <div className={styles.itemText}>
          <DiaryItemCommenNo postid={item._id}/>
          <span className={styles.itemTitle}>{item.title}</span>
        </div>
      </div>
    </Link>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import styles from '../page.module.css'

export default function DiaryItem({list}) {
  return (
    <Link href={`/detailPage/${list._id}`} className={styles.contentItem}>
      <Image
        className={styles.itemImg}
        alt="image"
        src={list.image}
        width={140}
        height={160}
      />
      <div className={styles.itemText}>
        {list.title}
      </div>
    </Link>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import styles from './pageComponent.module.css'

export default function DiaryItem({item}) {
  return (
    <Link href={`/detailPage/${item._id}`} className={styles.contentItem}>
      <Image
        className={styles.itemImg}
        alt="image"
        src={item.image}
        width={140}
        height={160}
      />
      <div className={styles.itemText}>
        {item.title}
      </div>
    </Link>
  )
}

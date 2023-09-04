import Image from 'next/image'
import Link from 'next/link'
import styles from '../page.module.css'

export default function DiaryItem({list}) {
  console.log(list)
  return (
    <Link href={`/detailPage/${list._id}`} className={styles.contentItem}>
      <img
        className={styles.itemImg}
        alt="image"
        src='https://s3.ap-northeast-2.amazonaws.com/toonda-image-box/free.jpg'
        // src={list.image}
        width={140}
        height={160}
      />
      <div className={styles.itemText}>
        {list.content}
      </div>
    </Link>
  )
}

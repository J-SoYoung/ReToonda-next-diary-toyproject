import Image from 'next/image'
import Link from 'next/link'
import styles from './pageComponent.module.css'
import DiaryItemCommenNo from './DiaryItemCommenNo';


export default function DiaryItem({item, type}) {
  // const [ diaryType, setDiaryType ] = useState('grid')
  if(type =='list'){
    return (
      <Link href={`/detailPage/${item?._id}`} className={styles.listItemBox}>
      <div className={styles.listContentItem}>
        <Image
          className={styles.itemImg}
          alt="image"
          src={item?.image}
          width={110}
          height={110}
          />
        <div className={styles.itemText}>
          <div className={styles.itemTextBox}>
            <p className={styles.date}>{item?.date}</p>
            <DiaryItemCommenNo postid={item._id} type='list'/>
          </div>
          <p className={styles.itemTitle}>{item?.title}</p>
        </div>
      </div>
    </Link>
    )
  }
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
          <DiaryItemCommenNo postid={item._id} type='grid'/>
          <span className={styles.itemTitle}>{item.title}</span>
        </div>
      </div>
    </Link>
  )
}


import Link from 'next/link';
import styles from './postPage.module.css';

export default function PostPage() {
  return (
    <div className={styles.home}>
      <nav className={styles.nav}>
        <Link href={'/'} className={styles.navLogo}>Toonda</Link>
        <p>툰 작성하기</p>
        <Link href={'/loginPage'} className={styles.loginBtn}>작성</Link>
      </nav>
    </div>
  )
}

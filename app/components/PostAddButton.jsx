'use client'
import styles from './pageComponent.module.css'
import { useRouter } from "next/navigation";

export default function PostAddButton() {
  const router = useRouter();
  return (
    <button 
      className={styles.postAddBtn} 
      onClick={()=>{router.push('/postPage')}}
    >
      +
    </button>
  )
}

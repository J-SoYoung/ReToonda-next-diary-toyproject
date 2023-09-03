"use client";
import { useRouter } from "next/navigation";

export default function Btn_logout() {
  const router = useRouter();
  
  const handleClick = () => {
    const isConfirmed = window.confirm('로그아웃 하시겠습니까?');
    if (isConfirmed) {
      const cookieName = 'userData';
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;   
      router.refresh()
      router.push('/')
    }
  };

  return <button onClick={handleClick}>설정/로그아웃</button>;
}

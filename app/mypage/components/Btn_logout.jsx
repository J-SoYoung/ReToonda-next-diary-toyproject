"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";

export default function Btn_logout() {
  const { setAuthState, data } = useContext(AuthenticationContext);
  const router = useRouter();

  const handleClick = async () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirmed) {
      const cookieName = "jwt";
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

      // 로컬스토리지 사용하지 않음.?..
      // localStorage.clear();

      setAuthState({
        data: null,
        error: null,
        loading: false,
      });
      router.push("/");
    }
  };

  return <button onClick={handleClick}>설정/로그아웃</button>;
}

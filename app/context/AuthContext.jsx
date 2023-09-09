"use client";
import React, { useState, createContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next"; // cookies 사용 lib

// Context를 생성하고 어디서든 사용할 수 있도록 export한다
export const AuthenticationContext = createContext({
  loading: false,
  error: "contextAPI TEST",
  data: null,
  setAuthState: () => {},
});

export default function AuthContext({ children }) {
  const path = usePathname();
  const router = useRouter();

  // 인증과 관련한 state를 생성한다
  const [authState, setAuthState] = useState({
    loading: false,
    data: null,
    error: null,
  });

  // 쿠키에 토큰이 있는 경우 middleware에서 토큰 확인 후 자동 로그인
  const fetchUser = async () => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });

    try {
      const jwt = getCookie("jwt");
      if (!jwt) {
        return setAuthState({
          data: null,
          error: null,
          loading: false,
        });
      }
      await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((r) => {
          if (!r.ok) throw new Error("토큰이 유효하지 않습니다");
          return r.json();
        })
        .then((result) => {
          setAuthState({
            data: result,
            error: null,
            loading: false,
          });
          localStorage.setItem("userid", result.userid);
          localStorage.setItem("email", result.email);
          localStorage.setItem("userProfileImage", result.userProfileImage);
          localStorage.setItem("userIntro", result.userIntro);
          if (path == "/loginpage") {
            alert("메인 페이지로 이동합니다");
            router.push("/");
          }
          router.refresh();
        });
    } catch (error) {
      console.log(error);
      setAuthState({
        data: null,
        error: error,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // authContext를 전역으로 공급한다. 이후 layout에 전역으로 공급할 수 있도록 태그를 감싼다.
  return (
    <AuthenticationContext.Provider
      value={{
        ...authState,
        setAuthState,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

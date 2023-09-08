"use client";
import { useContext } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next"; // cookies 사용 lib

export default function useAuth() {
  const { setAuthState } = useContext(AuthenticationContext);
  const router = useRouter();
  const login = async ({ userid, password }) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });

    try {
      await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ userid: userid, password: password }),
        headers: { "Content-Type": "application/json" },
      })
        .then((r) => {
          console.log(r);
          if (!r.ok) {
            throw new Error("로그인 실패");
          }
          return r.json();
        })
        .then((result) => {
          setAuthState({
            data: result,
            error: null,
            loading: false,
          });
          router.push("/");
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

  const signup = async ({ userid, password, email }) => {
    console.log("회원가입", userid, password, email);
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          userid: userid,
          password: password,
          email: email,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((r) => {
          if (!r.ok) {
            throw new Error("회원가입 실패");
          }
          return r.json();
        })
        .then((result) => {
          console.log(result);
          setAuthState({
            data: result,
            error: null,
            loading: false,
          });
        });
    } catch (error) {
      console.log("회원가입 Error", error);
      setAuthState({
        data: null,
        error: error,
        loading: false,
      });
    }
  };

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
          console.log("result-user", result);
          setAuthState({
            data: result,
            error: null,
            loading: false,
          });
          // router.push('/')
        });
    } catch (error) {
      console.log(error);
      setAuthState({
        data: result,
        error: error,
        loading: false,
      });
    }
  };

  return { login, signup, fetchUser };
}

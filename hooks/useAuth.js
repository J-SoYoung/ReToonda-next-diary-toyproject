"use client";
import { useContext } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const { setAuthState } = useContext(AuthenticationContext);
  const router = useRouter();

  const signup = async ({ userid, password, email, passwordCheck }) => {
    console.log("회원가입", userid, password, email, passwordCheck);
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          userid: userid,
          password: password,
          passwordCheck: passwordCheck,
          email: email,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorMessage = await res.json();
        throw new Error(errorMessage.errorMessage);
      }

      const result = await res.json();
      setAuthState({
        data: result,
        error: null,
        loading: false,
      });
      router.push("/loginPage");
    } catch (error) {
      setAuthState({
        data: null,
        error: error,
        loading: false,
      });
    }
  };

  const login = async ({ userid, password }) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ userid: userid, password: password }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const errorMessage = await res.json();
        throw new Error(errorMessage.errorMessage);
      }

      const result = await res.json();
      setAuthState({
        data: result,
        error: null,
        loading: false,
      });
      localStorage.setItem("userid", result.userid);
      localStorage.setItem("email", result.email);
      localStorage.setItem("userProfileImage", result.userProfileImage);
      localStorage.setItem("userIntro", result.userIntro);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
      setAuthState({
        data: null,
        error: error,
        loading: false,
      });
    }
  };


  return { login, signup };
}

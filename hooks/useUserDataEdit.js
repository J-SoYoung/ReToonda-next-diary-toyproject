"use client";
import { useContext } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";

export default function useUserDataEdit() {
  const { setAuthState } = useContext(AuthenticationContext);

  const userDataEditFunc = async ({ userData }) => {
    try {
      await fetch("/api/user/edit/", {
        method: "POST",
        body: JSON.stringify( userData ),
        headers: { "Content-Type": "application/json" },
      })
        .then((r) => r.json())
        .then((result) => {
          alert("프로필이 수정되었습니다");
          setAuthState({
            data: result,
            error: null,
            loading: true,
          });
        });
    } catch (error) {
      setAuthState({
        data: null,
        error: error,
        loading: false,
      });
    }
  };

  return { userDataEditFunc };
}

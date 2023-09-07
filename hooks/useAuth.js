import { useContext } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";

export default function useAuth() {
  const { setAuthState } = useContext(AuthenticationContext);

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
        .then((r) => r.json())
        .then((result) => {
          console.log(result);
          setAuthState({
            data: result,
            error: null,
            loading: false,
          });
        });
    } catch (error) {
      console.log("로그인 Error", error);
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
        .then((r) => r.json())
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

  return { login, signup };
}

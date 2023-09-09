"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";

import { AuthenticationContext } from "@/app/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import styles from "@/app/loginPage/loginPage.module.css";
import { CircularProgress } from "@mui/material";

export default function SignupInputBox() {
  const { error, loading, data, setAuthState } = useContext(
    AuthenticationContext
  );

  const { signup, fetchUser } = useAuth();

  // 토큰이 있는 경우 자동 로그인
  useEffect(() => {
    fetchUser();
  }, []);

  const [loginInputs, setLoginInputs] = useState({
    userid: "",
    password: "",
    passwordCheck: "",
    email: "",
  });

  const handleChangeInput = (e) => {
    setLoginInputs({ ...loginInputs, [e.target.name]: e.target.value });
  };

  const handleClickSignup = async () => {
    if (
      loginInputs.email == "" ||
      loginInputs.userid == "" ||
      loginInputs.password == "" ||
      loginInputs.passwordCheck == ""
    ) {
      alert("빈칸을 채워주세요");
      return;
    }
    await signup({
      userid: loginInputs.userid,
      password: loginInputs.password,
      passwordCheck: loginInputs.passwordCheck,
      email: loginInputs.email,
    });
  };

  return (
    <div>
      <div className={styles.inputBox}>
        <input
          name="email"
          type="email"
          value={loginInputs.email}
          onChange={handleChangeInput}
          className={styles.inputItem}
          placeholder="이메일을 입력하세요"
        />
        <input
          name="userid"
          type="text"
          value={loginInputs.userid}
          onChange={handleChangeInput}
          className={styles.inputItem}
          placeholder="4-15자 이내의 아이디를 입력하세요"
        />
        <input
          name="password"
          type="password"
          value={loginInputs.password}
          onChange={handleChangeInput}
          className={styles.inputItem}
          placeholder="6-20자 이내의 비밀번호를 입력하세요"
        />
        <input
          name="passwordCheck"
          type="password"
          value={loginInputs.passwordCheck}
          onChange={handleChangeInput}
          className={styles.inputItem}
          placeholder="비밀번호를 한번 더 입력하세요"
        />
        <div className={styles.loadingSpinnerBox}>
          {loading && <CircularProgress color="success" />}
        </div>
        <p className={styles.errorMessage}>{error && error.message}</p>
      </div>
      <div className={styles.buttonBox}>
        <button onClick={handleClickSignup}>회원가입</button>
        <Link href={"/loginPage"}> 로그인 하러 가기 </Link>
      </div>
    </div>
  );
}

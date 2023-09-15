"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";

import { AuthenticationContext } from "@/app/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import styles from "../loginPage.module.css";
import { CircularProgress } from "@mui/material";
import { hasCookie } from "cookies-next";

export default function LoginInputBox() {
  const { error, loading } = useContext(AuthenticationContext);
  const { login } = useAuth();

  const [loginInputs, setLoginInputs] = useState({
    userid: "",
    password: "",
  });

  const handleChangeInput = (e) => {
    setLoginInputs({ ...loginInputs, [e.target.name]: e.target.value });
  };

  const handleClickLogin = async () => {
    if (loginInputs.userid == "" || loginInputs.password == "") {
      alert("빈칸을 채워주세요");
      return;
    }
    await login({
      userid: loginInputs.userid,
      password: loginInputs.password,
    });
    setLoginInputs({ userid: "", password: "" });
  };

  return (
    <div>
      <div className={styles.inputBox}>
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
        <div className={styles.loadingSpinnerBox}>
          {loading && <CircularProgress color="success" />}
        </div>
        <p className={styles.errorMessage}>{error && error.message}</p>
      </div>
      <div className={styles.buttonBox}>
        <button onClick={handleClickLogin}>로그인</button>
        <Link href={"/signupPage"}>회원가입 하러 가기</Link>
      </div>
    </div>
  );
}

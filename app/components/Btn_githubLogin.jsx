"use client";
import React from "react";
import { signIn, signOut } from "next-auth/react";

export default function Btn_githubLogin({session}) {
  return (
      <>
      {session? 
      <button onClick={()=>{signOut()}}>
      로그아웃
    </button>
      : 
      <button
      onClick={() => {
        signIn();
      }}
      >
      github 로그인
      </button>
      }
        </>
    
  );
}

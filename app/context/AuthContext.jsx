"use client";
import React, { useState, createContext } from "react";

// Context를 생성하고 어디서든 사용할 수 있도록 export한다
export const AuthenticationContext = createContext({
  loading: false,
  error: "contextAPI TEST",
  data: null,
  setAuthState: () => {},
});

export default function AuthContext({ children }) {
  // 인증과 관련한 state를 생성한다
  const [authState, setAuthState] = useState({
    loading: false,
    data: null,
    error: null,
  });

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

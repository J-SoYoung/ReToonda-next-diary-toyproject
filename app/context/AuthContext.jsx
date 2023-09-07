"use client";
import React, { useState, createContext } from "react";

export const AuthenticationContext = createContext({
  loading: false,
  error: "hello contextAPI TEST",
  data: null,
  setAuthState: () => {},
});

export default function AuthContext({ children }) {
  const [authState, setAuthState] = useState({
    loading: false,
    data: null,
    error: null,
  });
  
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

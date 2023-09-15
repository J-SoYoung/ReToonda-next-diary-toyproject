"use client";
import React, { useState, createContext, useEffect } from "react";

// Context를 생성하고 어디서든 사용할 수 있도록 export한다
export const PostDataContext = createContext({
  postError: null,
  imageFile: null,
  setPostState: () => {},
});

export default function PostContext({ children }) {
  // state를 생성한다
  const [postState, setPostState] = useState({
    postError: null,
    imageFile: null,
  });

  // Context를 전역으로 공급한다. 이후 layout에 전역으로 공급할 수 있도록 태그를 감싼다.
  return (
    <PostDataContext.Provider
      value={{
        ...postState,
        setPostState,
      }}
    >
      {children}
    </PostDataContext.Provider>
  );
}

"use client";
import React, { useState, createContext } from "react";

// Context를 생성하고 어디서든 사용할 수 있도록 export한다
export const ImageDataContext = createContext({
  imageFile: null,
  setImageState: () => {},
});
export default function ImageContext({ children }) {
  // state를 생성한다
  const [imageState, setImageState] = useState({
    imageFile: null,
  });

  // Context를 전역으로 공급한다. 이후 layout에 전역으로 공급할 수 있도록 태그를 감싼다.
  return (
    <ImageDataContext.Provider
      value={{
        ...imageState,
        setImageState,
      }}
    >
      {children}
    </ImageDataContext.Provider>
  );
}

import { useState } from "react";

// Custom Hook 정의
export default function useInput(initialState) {
  const [state, setState] = useState(initialState);

  const handleChange = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const resetState = () => {
    setState(initialState);
  };
  return [state, handleChange, resetState];
}

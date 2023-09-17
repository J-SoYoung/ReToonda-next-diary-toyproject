import { useContext } from "react";
import { PostDataContext } from "@/app/context/PostContext";

// Custom Hook 정의
export default function useInput() {
  const { setPostState, postState } = useContext(PostDataContext);

  const handleChange = (key, value) => {
    setPostState({ ...postState, [key]: value });
  };

  const resetState = () => {
    setPostState({
      date: "",
      title: "",
      content: "",
    });
  };

  return [ resetState, handleChange ]
}

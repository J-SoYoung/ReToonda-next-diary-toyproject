'use client';
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { ImageDataContext } from "@/app/context/ImageContext";
import useInput from "@/hooks/useInput";


export default function usePostApi() {
  const router = useRouter();
  const { setImageState } = useContext(ImageDataContext);
  const [resetState] = useInput();

  const postDataFetchingApi = async(type, postData) => {

    const response = await fetch(`/api/post/${type}`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/json" },
    })

    if(!response.ok){throw new Error("포스트 작성에 문제가 발생하였습니다.")}
    const result= await response.json();
    resetState();
    setImageState({ imageFile: null });
    alert(result);
    router.refresh();
    return result
  }

  return { postDataFetchingApi }
}

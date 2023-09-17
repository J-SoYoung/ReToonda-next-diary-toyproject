export default function usePostApi() {
  const postDataFetchingApi = async(type, postData) => {

    const response = await fetch(`/api/post/${type}`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/json" },
    })

    if(!response.ok){throw new Error("포스트 작성에 문제가 발생하였습니다.")}
    const result= await response.json();
    return result
  }

  return { postDataFetchingApi }
}

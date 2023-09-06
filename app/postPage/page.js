"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./postPage.module.css";
import ImageComponent from "./components/ImageComponent";

export default function PostPage() {
  const router = useRouter();
  // 이미지 미리보기 및 S3_upload
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState("");
  const [encodeFilename, setEncodeFilename] = useState("");

  const [state, setState] = useState({
    title: "",
    content: "",
    image: "",
    date: "",
  });

  // Image 미리보기
  const handleImagePreview = async (e) => {
    const file = e.target.files?.[0];
    setFile(file)
    setEncodeFilename(encodeURIComponent(file.name));
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    }
  };

  const handleClickPostAdd = async (e) => {
    e.preventDefault();
    // S3업로드를 위한 Presigned URL발행
    let s3_imageSrc = "";
    if (encodeFilename) {
      let res = await fetch(`/api/post/s3_ImageUpload?file=${encodeFilename}`);
      res = await res.json();

      // S3 업로드
      // entries를 통해 주어진 객체를 [key, value]를 배열로 반환
      const formData = new FormData();
      Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      let S3_imageUpload = await fetch(res.url, {
        method: "POST",
        body: formData,
      });
      s3_imageSrc = `${S3_imageUpload.url}/${encodeFilename}`;
      setState({ ...state, image: s3_imageSrc });
    }
    const freeSrc =
      "https://s3.ap-northeast-2.amazonaws.com/toonda-image-box/free.jpg";

    const newData = {
      date: state.date,
      title: state.title,
      content: state.content,
      image: encodeFilename ? s3_imageSrc : freeSrc,
      user: localStorage.getItem("userid"),
      createDate: new Date().getTime(),
    };

    const newPostRes = fetch(`/api/post/new`, {
      method: "POST",
      body: JSON.stringify(newData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        try {
          setState({ title: "", content: "", image: "", date: "" });
          alert(result);
          router.push("/");
        } catch (error) {
          console.log(error);
        }
      });
  };

  return (
    <div className={styles.home}>
      <div className={styles.postBox}>
        <div className={styles.postInputBox}>
          <input
            name="date"
            type="date"
            value={state.date}
            onChange={(e) => {
              setState({ ...state, date: e.target.value });
            }}
          />
          <input
            name="title"
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            type="text"
            maxLength="20"
            placeholder="툰 제목을 입력해주세요"
          />
        </div>
        <div className={styles.postTextarea}>
          <textarea
            name="content"
            value={state.content}
            onChange={(e) => setState({ ...state, content: e.target.value })}
            maxLength="100"
            placeholder="오늘의 툰을 설명해주세요"
          />
        </div>
        <div className={styles.postImageBox}>
          <div className={styles.labelBox}>
            {previewImage ? (
              <>
                <label htmlFor="file">
                  <p>이미지 변경</p>
                </label>
                <button
                  onClick={() => {
                    setPreviewImage("");
                    setEncodeFilename("");
                    setFile('')
                  }}
                >
                  이미지 삭제
                </button>
              </>
            ) : (
              <label htmlFor="file">
                <Image
                  src="/icons/gray_image_add.svg"
                  alt="image-add-icon"
                  width={100}
                  height={100}
                />
                <p>오늘의 툰을 올려주세요</p>
              </label>
            )}
          </div>
          <input
            type="file"
            name="image"
            id="file"
            accept="image/*"
            onChange={handleImagePreview}
          />
          {previewImage && (
            <Image
              src={previewImage}
              width={490}
              height={400}
              alt="preview-image"
            />
          )}
        </div>
        {/* <ImageComponent/> */}
        <button onClick={handleClickPostAdd}>글 작성</button>
      </div>
    </div>
  );
}

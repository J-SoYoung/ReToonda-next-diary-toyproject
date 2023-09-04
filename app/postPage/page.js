"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./postPage.module.css";
import ImageComponent from "./components/ImageComponent";

export default function PostPage() {
  // 이미지 미리보기 및 S3_upload
  const [previewImage, setPreviewImage] = useState("");
  const [filename, setFilename] = useState("");

  const [state, setState] = useState({
    title: "",
    content: "",
    image: "",
  });

  // Image 미리보기
  const handleImagePreview = async (e) => {
    const file = e.target.files?.[0];
    setFilename(encodeURIComponent(file.name));
    // const filename = encodeURIComponent(file.name);
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
    let s3_imageSrc =''
    if (filename) {
      let res = await fetch(`/api/post/s3_ImageUpload?file=${filename}`);
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
      s3_imageSrc = `${S3_imageUpload.url}/${filename}`;
      setState({ ...state, image: s3_imageSrc });
    }
      const freeSrc =
      "https://s3.ap-northeast-2.amazonaws.com/toonda-image-box/free.jpg";
    // 위에서 imageState가 비동기적으로 실행하기 때문에, 콜백함수로 전달해 업데이트함.

    const newData = {
      title: state.title,
      content: state.content,
      image: filename ? s3_imageSrc : freeSrc,
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
          console.log(result);
          setState({ title: "", content: "", image: "" });
          // router.push("/");
          // router.refresh();
        } catch (error) {
          console.log(error);
        }
      });
  };

  return (
    <div className={styles.home}>
      <div className={styles.postBox}>
        <div className={styles.postInputBox}>
          <input name="date" type="date" />
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
                    setFilename("");
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

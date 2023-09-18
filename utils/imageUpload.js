export const imagePreviewUtil = async (file) => {
  if (file) {
    // onload에 await을 사용할 수 없기 때문에 전체값을 promise로 감싸 결과 출력
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const result = reader.result;
        resolve(result);
      };
    })
  }
};

export const imageUploadUtil = async (imageFile) => {
  let uploadSrc = null;
  if (imageFile) {
    console.log("image util로 넘어옴--", imageFile);
    const filename = encodeURIComponent(imageFile.name);
    
    // presigned URL발행
    const res = await fetch(`/api/post/image?file=${filename}`);
    if (!res.ok)
      throw new Error(" 이미지 업로드에 문제가 생겼습니다. 다시 시도해주세요");
    const presignedUrlData = await res.json();
    console.log("presignedUrlData 출력--", presignedUrlData);

    // S3-upload
    // res.fields=서버가 보낸 정보 / file= 유저 이미지정보 => upload
    const formData = new FormData();
    Object.entries({ ...presignedUrlData.fields, file: imageFile }).forEach(
      ([key, value]) => {
        formData.append(key, value);
      }
    );

    let upload = await fetch(presignedUrlData.url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      uploadSrc = `${upload.url}/${filename}`;
      console.log("-- S3업로드 끝 URL --", uploadSrc);
    } else {
      throw new Error(" 이미지 업로드에 문제가 생겼습니다. 다시 시도해주세요");
    }
  }

  return uploadSrc;
};

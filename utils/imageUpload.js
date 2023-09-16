export const imageUpload = async(imageFile)=>{
  let uploadSrc = null
  if (imageFile) {
    const filename = encodeURIComponent(imageFile.name);

    // presigned URL발행
    const res = await fetch(`/api/post/image?file=${filename}`);
    if(!res.ok)throw new Error(" 이미지 업로드에 문제가 생겼습니다. 다시 시도해주세요")
    const presignedUrlData = await res.json();        

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
      // console.log("S3-upload URL --", uploadSrc);
    } else {
      throw new Error(" 이미지 업로드에 문제가 생겼습니다. 다시 시도해주세요")
    }
  }
  
  return uploadSrc
}
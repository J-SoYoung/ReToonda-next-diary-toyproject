import aws from "aws-sdk";
export default async function handler(req, res) {
  console.log(req.query);
  // amazon code
  aws.config.update({
    accessKeyId: "AKIAYPAN6TFGYVDMVJFS",
    secretAccessKey: "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",
    region: "ap-northeast-2",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  // createPresignedPost 함수 사용법
  const url = await s3.createPresignedPost({
    Bucket: "toonda",
    Fields: { key: req.query.file },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
    ],
  });
  console.log("s3프리url", url);
  res.status(200).json(url);
}

// accessKeyId: process.env.ACCESS_KEY,
// secretAccessKey: process.env.SECRET_KEY,
// Bucket: process.env.BUCKET_NAME,

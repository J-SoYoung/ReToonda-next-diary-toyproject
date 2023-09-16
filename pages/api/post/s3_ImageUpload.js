// 서버에서 AWS기능 사용하는 라이브러리
import aws from "aws-sdk";

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: "AKIAYPAN6TFGYVDMVJFS",
    secretAccessKey: "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",
    region: "ap-northeast-2",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  // prisignedURL 생성됨
  const url = await s3.createPresignedPost({
    Bucket: "toonda",
    Fields: { key: req.query.file },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
    ],
  });
  res.status(200).json(url);
}

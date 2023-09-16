import { connectDB } from "@/public/utils/database/database";
import jwt from "jsonwebtoken"; // token의 payload찾는 lib

export default async function handle(req, res) {
  // middleware에서 유효성 검사를 했으니 바로 사용가능
  const bearerToken = req.headers["authorization"];
  const token = bearerToken.split(" ")[1];

  // 사용자 payload확인 후 정보 출력
  const payload = jwt.decode(token);
  if (!payload.userid) {
    res.redirect(302, "/loginPage");
    return res.status(401).json({
      errorMessage: "인증되지 않은 요청입니다",
    });
  }

  const db = (await connectDB).db("Toonda");
  const userInfo = await db
    .collection("user_card")
    .findOne({ userid: payload.userid });

  if (!userInfo) {
    res.redirect(302, "/loginPage");
    return res.status(401).json({ errorMessage: "유저 정보가 없습니다." });
  }
  return res.status(200).json(userInfo);
}

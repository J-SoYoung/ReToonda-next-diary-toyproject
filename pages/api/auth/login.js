import { connectDB } from "@/public/utils/database/database";
import validator from "validator"; // 유효성 검사 lib
import bcrypt from "bcrypt"; // 암호화 lib
import * as jose from "jose"; // JWT token 생성 lib
import { setCookie } from "cookies-next"; // cookies 사용 lib

export default async function handle(req, res) {
  const { userid, password } = req.body;
  const errors = [];
  const db = (await connectDB).db("Toonda");

  if (req.method == "POST") {
    try {
      // 입력값 유효성검사
      const validationSchema = [
        {
          valid: validator.isLength(userid, {
            min: 4,
            max: 15,
          }),
          errorMessage: "아이디를 확인해주세요.",
        },
        {
          valid: validator.isLength(password, {
            min: 6,
            max: 20,
          }),
          errorMessage: " 비밀번호를 확인해주세요",
        },
      ];
      // Error반환
      {
        validationSchema.forEach((check) => {
          if (!check.valid) {
            errors.push(check.errorMessage);
          }
        });
        if (errors.length) {
          return res.status(404).json({ errorMessage: errors });
        }
      }
      // 유저 정보 확인
      const userInfo = await db
        .collection("user_card")
        .findOne({ userid: userid });
      if (!userInfo) {
        return res.status(401).json({
          errorMessage:
            "회원 정보가 없습니다. 아이디 또는 비밀번호를 확인해주세요.",
        });
      }

      // 비밀번호 확인 bcrypt암호화와 비교
      const isPaswwordMatch = await bcrypt.compare(password, userInfo.password);
      if (!isPaswwordMatch) {
        return res.status(401).json({
          errorMessage:
            "회원 정보가 없습니다. 아이디 또는 비밀번호를 확인해주세요.",
        });
      }

      // JWT 토큰 구조 생성
      const alg = "HS256";
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);

      // 토큰 생성 email을 고유 식별자로 함
      const token = await new jose.SignJWT({ email: userInfo.email })
        .setProtectedHeader({ alg }) // 알고리즘 선택
        .setExpirationTime("24h") // 토큰 만료기한 설정
        .sign(secret); // secret key 설정

      setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 }); // 6일 유지

      // 로그인이 되면,
      // 서버 token생성 -> jwt 키캆으로 cookies에 저장
      // 클라이언트에서는 localstorage에 user정보 저장
      return res.status(200).json(userInfo);
      
    } catch (error) {
      console.error(error);
      return res.status(404).json("로그인 실패");
    }
  }

  return res.status(404).json("잘못된 경로입니다");
}

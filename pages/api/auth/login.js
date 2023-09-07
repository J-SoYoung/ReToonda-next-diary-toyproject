import { connectDB } from "@/public/utils/database/database";
import { parse, serialize } from "cookie";
import validator from "validator";

export default async function handle(req, res) {
  console.log("---signin--", req.body);
  const { userid, password } = req.body;
  const errors = [];

  // 입력 데이터 유효성검사
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
      }),
      errorMessage: " 비밀번호를 확인해주세요",
    },
  ];
  // 유효성 검사에서 Error가 났을 경우
  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });
  // Error 반환
  if (errors.length) {
    return res.status(404).json({ errorMessage: errors });
  }

  let db = (await connectDB).db("Toonda");
  let userInfo = await db.collection("user_card").findOne({ userid: userid });
  if (!userInfo) {
    return res.status(401).json({
      errorMessage: "회원가입 정보가 없습니다. 이메일을 다시 입력하세요",
    });
  }

  // setCookie("userData", token, { req, res, maxAge: 60 * 6 * 24 });

  // serialize 쿠키 문자열로 직렬화, 모든 페이지에서 사용, 만료일 설정
  const serializedUserData = serialize("userData", JSON.stringify(userInfo), {
    path: "/",
    maxAge: 604800, // 1주일(초)
  });
  console.log("----쿠키----", serializedUserData);

  // 쿠키를 클라이언트에 보내기
  // res.status(200).json("가입성공");
  res.setHeader("Set-Cookie", [serializedUserData]);
  // res.redirect(302, "/");
  return res.status(200).json({ userInfo });
}

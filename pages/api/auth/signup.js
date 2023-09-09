import { connectDB } from "@/public/utils/database/database";
import validator from "validator"; // 유효성 검사 lib
import bcrypt from "bcrypt"; // 암호화 lib

export default async function handle(req, res) {
  // console.log("--회원가입--", req.body);
  const { userid, password, passwordCheck, email } = req.body;
  const errors = [];
  const db = (await connectDB).db("Toonda");

  if (req.method == "POST") {
    if (password !== passwordCheck) {
      return res.status(404).json({ errorMessage: "비밀번호를 확인해주세요" });
    }
    try {
      const validationSchema = [
        {
          valid: validator.isEmail(email),
          errorMessage: "이메일 형식을 확인해주세요.",
        },
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
      // Error 반환
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
      // email, id 중복여부 확인
      {
        const userWithEmail = await db
          .collection("user_card")
          .findOne({ email: email });
        const userWithId = await db
          .collection("user_card")
          .findOne({ userid: userid });

        if (userWithEmail) {
          return res
            .status(400)
            .json({ errorMessage: "이미 사용중인 Email입니다" });
        }
        if (userWithId) {
          return res
            .status(400)
            .json({ errorMessage: "이미 사용중인 아이디입니다" });
        }
      }
      // 비밀번호 hash
      const hashedPassword = await bcrypt.hash(password, 10);
      // userData 생성 및 DB저장
      const userData = {
        email,
        userid,
        password: hashedPassword,
        userProfileImage: null,
        userIntro: null,
      };
      await db.collection("user_card").insertOne(userData);

      return res.status(200).json("회원가입 성공");
    } catch (error) {
      console.error("Error:", error);
      return res.status(404).json("회원가입 실패, 다시 시도해주세요");
    }
  }
  return res.status(404).json("잘못된 경로입니다");
}

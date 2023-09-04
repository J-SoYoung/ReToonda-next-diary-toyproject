import { connectDB } from "@/app/utils/database/database";
// 암호화 라이브러리
import bcrypt from "bcrypt";

export default async function handle(req, res) {
  if (req.method == "POST") {
    // 미션_ 유효성검사 빈칸, email중복check, 길이제한 조건만들기
    // const hash = await bcrypt.hash(req.body.password, 10);
    // req.body.password = hash;

    const userData = {
      'userid': req.body.userid,
      'password': req.body.password,
      'userProfileImage' : '',
      'userIntro' : '',
    }
    console.log(userData)
    let db = (await connectDB).db("Toonda");
    await db.collection("user_card").insertOne(userData);
    
    return res.redirect(302, "/loginPage");
    // res.status(200).json("가입성공");
    // 미션_ 가입완료 메세지보내기
  }
}

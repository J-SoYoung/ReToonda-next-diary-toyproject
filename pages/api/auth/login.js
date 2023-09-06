import { connectDB } from "../../../public/utils/database/database";
import { parse, serialize } from "cookie";

export default async function handle(req, res) {
  console.log(req.body);
  let { userid, password } = req.body;

  // 미션_유효성 검사 - 빈칸, email중복check, 길이제한 조건만들기
  if (password == "" || userid == "") {
    console.log("빈칸입니다");
    return null;
  }

  if (req.method == "POST") {
    let db = (await connectDB).db("Toonda");
    let userInfo = await db.collection("user_card").findOne({ userid: userid });

    if (!userInfo) {
      console.log("해당 이메일은 없습니다");
      return null;
    }
    if (userInfo.password !== password) {
      console.log("아이디 혹은 비밀번호가 다릅니다");
      return null;
    }

    // serialize 쿠키 문자열로 직렬화, 모든 페이지에서 사용, 만료일 설정
    const serializedUserData = serialize("userData", JSON.stringify(userInfo), {
      path: "/",
      maxAge: 604800, // 1주일(초)
    });
    console.log("----쿠키----", serializedUserData);

    // 쿠키를 클라이언트에 보내기
    // res.status(200).json("가입성공");
    res.setHeader("Set-Cookie", [serializedUserData]);
    res.redirect(302, "/");
  }
}

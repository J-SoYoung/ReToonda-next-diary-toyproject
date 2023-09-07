import { connectDB } from "@/public/utils/database/database";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

export default async function handle(req, res) {
  // console.log("--userIntro--", req.body);
  const { userid, password, userProfileImage, userIntro, _id } = req.body;
  try {
    const client = await connectDB;
    const db = client.db("Toonda");
    const userInfoEdit = {
      userid: userid,
      password: password,
      userProfileImage: userProfileImage,
      userIntro: userIntro,
    };
    const result = await db
      .collection("user_card")
      .updateOne({ _id: new ObjectId(_id) }, { $set: userInfoEdit });

    // cookies().set(JSON.stringify(req.body), {
    //   httpOnly: true,
    //   path: "/",
    // });

    return res.status(200).json(req.body);
    // return res.redirect(302, `/myPage/${userid}`);
  } catch (error) {
    return res.status(500).json(error);
  }
}

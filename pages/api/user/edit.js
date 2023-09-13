import { connectDB } from "@/public/utils/database/database";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

export default async function handle(req, res) {
  const { userid, password, userProfileImage, userIntro, _id, email } =
    req.body;
  try {
    const client = await connectDB;
    const db = client.db("Toonda");
    const userInfoEdit = {
      userid,
      password,
      email,
      userProfileImage,
      userIntro,
    };
    const result = await db
      .collection("user_card")
      .updateOne({ _id: new ObjectId(_id) }, { $set: userInfoEdit });
    return res.status(200).json(userInfoEdit);
  } catch (error) {
    return res.status(500).json(error);
  }
}

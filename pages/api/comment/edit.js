import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function handle(req, res) {
  const { postid, userid, comment, createDate, userProfileImage, _id } =
    req.body;
  if (req.method == "POST") {
    try {
      const db = (await connectDB).db("Toonda");
      const editData = {
        postid,
        userid,
        comment,
        createDate,
        userProfileImage,
      };
      await db.collection("comment")
              .updateOne({ _id: new ObjectId(_id) }, { $set: editData });
      return res.status(200).json("댓글 수정이 완료되었습니다");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

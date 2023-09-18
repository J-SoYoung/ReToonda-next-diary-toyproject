import { connectDB } from "@/utils/database";

export default async function handle(req, res) {
  const { postid, userid, comment, createDate} = req.body
  const db = (await connectDB).db("Toonda")
  const user = await db.collection("user_card").findOne({ userid: userid });

  const commentData = {
    postid, userid, comment, createDate, userProfileImage: user.userProfileImage
  }
  
  if (req.method == "POST") {
    try {
      const collection = await db.collection("comment").insertOne(commentData);
      return res.status(200).json("댓글 작성이 완료되었습니다");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

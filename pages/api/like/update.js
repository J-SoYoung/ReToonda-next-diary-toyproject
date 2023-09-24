import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function handle(req, res) {
  const { likeid, postid, userid, isLike } = req.body;

  if (req.method == "POST") {
    try {
      const postLike = { postid, userid, isLike };
      const db = (await connectDB).db("Toonda");
      const collection = await db.collection("like");

      if (!likeid) {
        await collection.insertOne(postLike);
      } else {
        await collection.updateOne(
          { _id: new ObjectId(likeid) },
          { $set: postLike }
        );
      }
      return res.status(200).json("좋아요 반영");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
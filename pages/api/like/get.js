import { connectDB } from "@/utils/database";

export default async function handle(req, res) {
  const { postid, userid } = req.query;

  try {
    const db = (await connectDB).db("Toonda");
    const collection = await db.collection("like");
    const result = await collection.findOne({ $and: [{ postid }, { userid }] });
    return res.status(200).json("좋아요 loading 성공");
  } catch (error) {
    return res.status(500).json(error);
  }
}

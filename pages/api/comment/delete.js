import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function handle(req, res) {
  const db = (await connectDB).db("Toonda");
  let result = await db
    .collection("comment")
    .deleteOne({ _id: new ObjectId(req.query.id) });
  return res.status(200).json("삭제가 완료되었습니다.");
}

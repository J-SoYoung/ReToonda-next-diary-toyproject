import { connectDB } from "../../../public/utils/database/database";
import { ObjectId } from "mongodb";

export default async function handle(req, res) {
  const client = await connectDB;
  const db = client.db("Toonda");
  let result = await db
    .collection("post")
    .deleteOne({ _id: new ObjectId(req.query.id) });
  return res.status(200).json("삭제가 완료되었습니다.");
}

import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function handle(req, res) {
  const { title, content, image, date, _id } = req.body;

  if (req.method == "POST") {
    try {
      const client = await connectDB;
      const db = client.db("Toonda");
      const editData = {
        title: title,
        content: content,
        image: image,
        date: date,
      };
      const result = await db
        .collection("post")
        .updateOne({ _id: new ObjectId(_id) }, { $set: editData });
      // console.log('--- 수정 결과 ---', result)
      return res.status(200).json("글 수정이 완료되었습니다");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

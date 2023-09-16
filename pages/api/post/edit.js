import { connectDB } from "@/public/utils/database/database";
import { ObjectId } from "mongodb";

export default async function handle(req, res) {
  const { title, content, image, date, _id } = req.body;
  console.log("---edit 서버--", req.body);

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
        console.log('수정결과---', result)
        return res.status(200).json("글 수정이 완료되었습니다");
      // return res.redirect(302, `/detailPage/${id}`);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

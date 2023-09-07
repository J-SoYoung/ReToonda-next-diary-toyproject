import { connectDB } from "../../../public/utils/database/database";
import { ObjectId } from "mongodb";

export default async function handle(req, res) {
  const { title, content, image, date, id } = req.body;

  if (req.method == "POST") {
    if (req.body.title === "" || req.body.content === "") {
      return res.status(500).json("빈칸을 채워주세요");
    }
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
        .updateOne({ _id: new ObjectId(id) }, { $set: editData });
      return res.redirect(302, `/detailPage/${id}`);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

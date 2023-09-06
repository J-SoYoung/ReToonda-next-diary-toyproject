import { connectDB } from "../../../public/utils/database/database";
import { ObjectId } from "mongodb";

export default async function handle(req, res) {
  console.log("--req.body.edit---", req.body);
  const { title, content, image, date, id } = req.body;
  console.log(title);
  if (req.method == "POST") {
    if (req.body.title === "" || req.body.content === "") {
      return res.status(500).json('빈칸을 채워주세요')
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

// http://localhost:3000/detailPage/64f7e152d97752238ec052e3

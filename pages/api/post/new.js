import { connectDB } from "@/app/utils/database/database";

export default async function handle(req, res) {
  if (req.method == "POST") {

    try {
      const client = await connectDB;
      const db = client.db("Toonda");
      const collection = await db.collection("post").insertOne(req.body);
      return res.status(200).json("글 작성이 완료되었습니다");
      // return res.redirect(302, "/");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

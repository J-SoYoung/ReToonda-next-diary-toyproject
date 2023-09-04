import { connectDB } from "@/app/utils/database/database";
import aws from "aws-sdk";

export default async function handle(req, res) {
  if (req.method == "POST") {
    console.log("-----post-req.body------", req.body);
    if (req.body.title === "" || req.body.content === "") {
      return res.status(500).json("빈칸을 채워주세요");
    }
    try {
      const client = await connectDB;
      const db = client.db("Toonda");
      const collection = await db.collection("post").insertOne(req.body);
      // return res.status(200).json(data);
      // return res.redirect(302, "/list");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

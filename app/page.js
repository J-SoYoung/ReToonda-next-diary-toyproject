import "./globals.css";
import { connectDB } from "@/utils/database";

// 컴포넌트
import Btn_PageUp from "./components/Btn_PageUp";
import DiaryContentSection from "./components/DiaryContentSection";
import ImageCarousel from "./components/ImageCarousel";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("Toonda");
  const result = await db.collection("post").find().toArray();
  result.sort((a, b)=> b.createDate - a.createDate);

  return (
    <div className="home">
      <ImageCarousel />
      <DiaryContentSection title="Today's DIARY" items={result} />
      <Btn_PageUp />
    </div>
  );
}

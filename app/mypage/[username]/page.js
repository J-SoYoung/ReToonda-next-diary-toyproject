import { connectDB } from "@/utils/database";
// components
import styles from "../mypage.module.css";
import UserInfoBox from "../components/UserInfoBox";
import DiaryContentSection from "@/app/components/DiaryContentSection";

export default async function MyPage(props) {
  const db = (await connectDB).db("Toonda");
  const result = await db.collection("post").find().toArray();
  const myDiary = result.filter((r) => {
    return r.user == props.params.username;
  });

  return (
    <div className={styles.home}>
      <UserInfoBox />
      <DiaryContentSection title="MY DIARY" items={myDiary} />
    </div>
  );
}

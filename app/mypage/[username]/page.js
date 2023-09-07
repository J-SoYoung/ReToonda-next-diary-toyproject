import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { connectDB } from "@/public/utils/database/database";

// style
import styles from "../myPage.module.css";
import diaryItemStyle from '../../page.module.css'

// components
import Btn_PostAdd from "@/app/components/Btn_PostAdd";
import Btn_logout from "@/app/components/Btn_logout";
import DiaryItem from "@/app/components/DiaryItem";
import Btn_userIntro from "../components/Btn_userIntro";

export default async function MyPage() {
  const userCookieData = cookies().get("userData");
  const loginUser = JSON.parse(userCookieData?.value);
  const {userIntro, userProfileImage, userid} = loginUser;

  const client = await connectDB;
  const db = client.db("Toonda");
  const result = await db.collection("post").find().toArray();
  const myDiary = result.filter((r)=>{
    return r.user == userid
  })

  return (
    <div className={styles.home}>
      <div className={styles.userInfoBox}>
        <h2>{loginUser.userid}의 툰 다이어리</h2>
        <div className={styles.userInfo}>
          <div className={styles.imageBox}>
            
            <Image
              src={ userProfileImage ? userProfileImage : "/image/user.jpg" }
              alt="basic-user-icon"
              width={100}
              height={100}
            />
            <Image
              src="/icons/white_pencil.svg"
              className={styles.userImgEditIcon}
              alt="post-add-icon"
              width={30}
              height={30}
            />
          </div>
          <div className={styles.textBox}>
            <p>{userIntro? userIntro : `기본 소개글입니다. ${userid}입니다.`}</p>
            <Btn_userIntro loginUser={loginUser}/>
            <Btn_logout />
          </div>
        </div>
      </div>
      <div className={diaryItemStyle.contentBox}>
        <div className={diaryItemStyle.contentTitle}>
          My DIARY
          <Btn_PostAdd />
        </div>
        <div className={diaryItemStyle.contentDiary}>
            {myDiary.map((list)=>{
            return (
              <DiaryItem list={list} />
            )
          })}
        </div>
      </div>
    </div>
  );
}

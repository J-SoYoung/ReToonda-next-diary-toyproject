import { connectDB } from "@/public/utils/database/database";
import { ObjectId } from "mongodb";
import styles from "../../postPage/postPage.module.css";
import Image from "next/image";
import Link from "next/link";

export default async function EditPage(props) {
  let db = (await connectDB).db("Toonda");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <>
      <div className={styles.home}>
        <form className={styles.postBox} action="/api/post/edit" method="POST">
          <input type="hidden" name='id' value={props.params.id}/>
          <div className={styles.postInputBox}>
            <input
              name="date"
              type="date"
              defaultValue={result.date}
              // onChange={(e) => {
              //   setState({ ...state, date: e.target.value });
              // }}
            />
            <input
              name="title"
              // value={state.title}
              // onChange={(e) => setState({ ...state, title: e.target.value })}
              type="text"
              maxLength="20"
              defaultValue={result.title}
            />
          </div>
          <div className={styles.postTextarea}>
            <textarea
              name="content"
              // value={state.content}
              // onChange={(e) => setState({ ...state, content: e.target.value })}
              maxLength="100"
              defaultValue={result.content}
            />
          </div>
          <div className={styles.postImageBox}>
            {/* 이미지 변경하지 않았을 때. */}
            <input type="hidden" name="image" value={result.image} />
            <div className={styles.labelBox}>
              <Image
                src={result.image}
                alt="image"
                width={490}
                height={400}
              />
            </div>
          </div>
          {/* <ImageComponent/> */}
          <button type="submit">글 수정 하기</button>
          <Link href={`/detailPage/${props.params.id}`}>수정 취소</Link>
        </form>
      </div>
    </>
  );
}

import { connectDB } from "@/public/utils/database/database";
import { ObjectId } from "mongodb";
import styles from "@/app/postPage/postPage.module.css";
import EditInputComponent from "../components/EditInputComponent";

export default async function EditPage(props) {
  let db = (await connectDB).db("Toonda");
  let data = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <>
      <div className={styles.home}>
        <EditInputComponent postData={data} id={props.params.id}/>
      </div>
    </>
  );
}

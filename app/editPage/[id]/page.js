import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import styles from "@/app/postPage/postPage.module.css";
import InputComponent from "@/app/postPage/components/InputComponent";
import ImageComponent from "@/app/postPage/components/ImageComponent";
import EditBtnComponent from "../components/EditBtnComponent";

export default async function EditPage(props) {
  let db = (await connectDB).db("Toonda");
  let data = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <>
      <div className={styles.home}>
        <div className={styles.postBox}>
          <InputComponent type="edit" postData={data} />
          <ImageComponent type="edit" imageDefault={data?.image} />
          <EditBtnComponent postData={data} id={props.params.id} />
        </div>
      </div>
    </>
  );
}

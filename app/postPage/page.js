// component, style import
import styles from "./postPage.module.css";
import ImageComponent from "./components/ImageComponent";
import InputComponent from "./components/InputComponent";
import PostBtnComponent from "./components/PostBtnComponent";

export default function PostPage() {
  return (
    <div className={styles.home}>
      <div className={styles.postBox}>
        <InputComponent />
        <ImageComponent />
        <PostBtnComponent/>
      </div>
    </div>
  );
}

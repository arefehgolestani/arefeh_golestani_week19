import { Link } from "react-router-dom";

import img1 from "../assets/image/404.webp";

import styles from "./404.module.css";

function PageNoteFound() {
  return (
    <div className={styles.not_found}>
      <div className={styles.text}>
        <h2>صفحه مورد نظر یافت نشد!</h2>
        <Link to="/">بازگشت به صفحه اصلی</Link>
      </div>
      <img src={img1} />
    </div>
  );
}

export default PageNoteFound;

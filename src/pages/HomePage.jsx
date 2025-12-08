import { Link } from "react-router-dom";

import home from "../assets/image/homeimage1.png";

import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.container}>
      <h1>به پنل مدیریت کالا خوش آمدید</h1>
      <img src={home} />
      <div>
        <Link to="/register"> ثبت نام</Link>
        <Link to="/login">ورود</Link>
      </div>
    </div>
  );
}

export default HomePage;

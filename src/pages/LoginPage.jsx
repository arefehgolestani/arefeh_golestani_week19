import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import styles from "./LoginPage.module.css"
import logo from "../assets/image/Union.png"
import Alert from "../components/Alert"


function LoginPage() {
  const {
    setAlert
  } = useContext(ProductContext);
  return (
    <div className={styles.login_container}>
       {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <h2>بوت کمپ بوتواستارت</h2>
      <div className={styles.login_box}>
        <img src={logo} />
        <h3>فرم ورود</h3>
        <div className={styles.login_form}>
          <input type="text" placeholder="نام کاربری" />
          <input type="password" placeholder="رمز عبور" />
         
          <button>ورود</button>
          <span>ایجاد حساب کاربری!</span>
        </div>
        
      </div>
    </div>
  )
}

export default LoginPage
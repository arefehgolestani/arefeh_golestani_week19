import styles from "./RegisterPage.module.css"
import logo from "../assets/image/Union.png"

function RegisterPage() {
  return (
    <div className={styles.register_container}>
      <h2>بوت کمپ بوتواستارت</h2>
      <div className={styles.register_box}>
        <img src={logo} />
        <h3>فرم ثبت نام</h3>
        <div className={styles.register_form}>
          <input type="text" placeholder="نام کاربری" />
          <input type="password" placeholder="رمز عبور" />
          <input type="password" placeholder="تکرار رمز عبور" />
          <button>ثبت نام</button>
          <span>حساب کاربری دارید؟</span>
        </div>
        
      </div>
    </div>
  )
}

export default RegisterPage
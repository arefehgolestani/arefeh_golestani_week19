import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios"


import ProductContext from "../context/ProductContext";
import styles from "./RegisterPage.module.css"
import {registerInputs} from "../constants/inputs.js";
import logo from "../assets/image/Union.png"
import { registerUser } from "../services/EndpointApi";
import Alert from "../components/Alert";
import api from "../services/config";


function RegisterPage() {
  const {
    alert,
    setAlert
  } = useContext(ProductContext);

  const validationSchema = Yup.object({
      username: Yup.string().required("وارد کردن نام کاربری الزامی است"),
      password: Yup.string()
       .required("وارد کردن رمز عبور الزامی است")
       .matches(/^\d{6,}$/, "رمز عبور باید حداقل 6 رقم باشد!"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "رمزهای عبور یکسان نیستند")
        .required("تکرار رمز عبور الزامی است"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword:"",
    }
  });

  
  const navigate = useNavigate();

  const onSubmit = async ({username, password}) => {
    try {
      const res = await api.post(registerUser(), { username, password });
      setAlert({
        type: "success",
        message: "ثبت نام شما با موفقیت انجام شد ",
        duration: 2000
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setAlert({
        type: "error",
        message: "خطا در ثبت ‌نام !",
        duration: 2500
      });
    } 
  }

  return (
    <div className={styles.register_container}>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <h2>بوت کمپ بوتواستارت</h2>
      <div className={styles.register_box}>
        <img src={logo} />
        <h3>فرم ثبت نام</h3>
        <div className={styles.register_form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {registerInputs.map((input) => (
            <div  key={input.name}>
             <input type={input.type} {...register(input.name)} name={input.name} placeholder={input.placeholder} />
             <p className={styles.error}>{errors[input.name]?.message}</p>
            </div>
           
         ))}
          <button type="submit">ثبت نام</button>
          </form>
          <Link to="/login"><span>حساب کاربری دارید؟</span></Link>
        </div>
        
      </div>
    </div>
  )
}

export default RegisterPage
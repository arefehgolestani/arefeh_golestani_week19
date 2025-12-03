import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios"

import ProductContext from "../context/ProductContext";
import { loginUser } from "../services/ProductApi";
import {loginInputs} from "../constants/inputs"
import Alert from "../components/Alert";

import styles from "./LoginPage.module.css"
import logo from "../assets/image/Union.png"
import api from "../services/config";


function LoginPage() {

  
  const {
    setAlert, setToken, token
  } = useContext(ProductContext);

  const validationSchema = Yup.object({
    username: Yup.string().required("وارد کردن نام کاربری الزامی است"),
    password: Yup.string().required("وارد کردن رمز عبور الزامی است")
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
  }
});

const navigate = useNavigate();

  const onSubmit = async ({username, password}) => {
    try {
      const res = await api.post(loginUser(), { username, password });
      setToken(res.data.token)
    
      setAlert({
        type: "success",
        message: "شما با موفقیت وارد شدید  ",
        duration: 3000
      });
      navigate("/panel");
    } catch (error) {
      setAlert({
        type: "error",
        message: "خطا در ورود !",
        duration: 2500
      });
    } 
  }

  return (
    <div className={styles.login_container}>
      
      <h2>بوت کمپ بوتواستارت</h2>
      <div className={styles.login_box}>
        <img src={logo} />
        <h3>فرم ورود</h3>
        <div className={styles.login_form}>
          <form onSubmit={handleSubmit(onSubmit)}>
          {loginInputs.map((input) => (
            <div  key={input.name}>
             <input type={input.type} {...register(input.name)} name={input.name} placeholder={input.placeholder} />
             <p className={styles.error}>{errors[input.name]?.message}</p>
            </div>
           
         ))}
         
          <button type="submit">ورود</button>
          </form>
          
         <Link to="/register"> <span>ایجاد حساب کاربری!</span></Link>
        </div>
        
      </div>
    </div>
  )
}

export default LoginPage
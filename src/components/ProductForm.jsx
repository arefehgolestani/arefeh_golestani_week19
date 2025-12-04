import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import styles from "./ProductForm.module.css"
import { useEffect } from "react";

function ProductForm({onSubmitForm, submitRef}) {

    const validationSchema = Yup.object({
        name: Yup.string().required("وارد کردن نام محصول الزامی است"),
        quantity: Yup.string()
         .required("وارد کردن تعداد محصول الزامی است"),
  
         price: Yup.string()
         .required("وارد کردن قیمت محصول الزامی است")
    });
  
    const {
      register,
      trigger,
      handleSubmit,
      formState: { errors },
      getValues
    } = useForm({
      resolver: yupResolver(validationSchema),
      mode: "onChange",
      defaultValues: {
        name: "",
        quantity: "",
        price:"",
      }
    });

  

    const onSubmit = async (data) => {
      onSubmitForm(data);
      return data; 
    }

    useEffect(() => {
      submitRef.current = async () => {
        const isValid = await trigger();
        if (!isValid) return null;
    
        const values = getValues();
        onSubmitForm(values);
        return values;
      };
    }, [trigger, getValues]);




  
  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
                <label>نام کالا</label>
                <input type="text" {...register("name")} name="name" placeholder="نام کالا" />
                <p className={styles.error}>{errors["name"]?.message}</p>
            </div>
            <div className={styles.inputs}>
                <label>تعداد موجودی</label>
                <input type="text" {...register("quantity")} name="quantity" placeholder="تعداد موجودی" />
                <p className={styles.error}>{errors["quantity"]?.message}</p>
            </div>
            <div className={styles.inputs}>
                <label>قیمت</label>
                <input type="text" {...register("price")} name="price" placeholder="قیمت" />
                <p className={styles.error}>{errors["price"]?.message}</p>
            </div>
            {/* <button type="submit"></button> */}
        </form>
    </div>
  )
}

export default ProductForm
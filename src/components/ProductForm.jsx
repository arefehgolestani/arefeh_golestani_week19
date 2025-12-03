import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import styles from "./ProductForm.module.css"

function ProductForm() {

    const validationSchema = Yup.object({
        productName: Yup.string().required("وارد کردن نام محصول الزامی است"),
        quantity: Yup.string()
         .required("وارد کردن تعداد محصول الزامی است"),
  
         price: Yup.string()
         .required("وارد کردن قیمت محصول الزامی است")
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
        productName: "",
        quantity: "",
        price:"",
      }
    });

    const onSubmit = async ({productName, quantity, price}) => {
       const newProduct = {productName, quantity, price};
       return newProduct
    }

    // const onSubmitProduct = () => {
        
    // }



  

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>نام کالا</label>
                <input type="text" {...register("productName")} name="productName" placeholder="نام کالا" />
                <p className={styles.error}>{errors["productName"]?.message}</p>
            </div>
            <div>
                <label>تعداد موجودی</label>
                <input type="text" {...register("quantity")} name="quantity" placeholder="تعداد موجودی" />
                <p className={styles.error}>{errors["quantity"]?.message}</p>
            </div>
            <div>
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { modalInputs } from "../constants/inputs";

import styles from "./ProductForm.module.css";



function ProductForm({ onSubmitForm, submitRef, defaultValues = {} }) {
  const validationSchema = Yup.object({
    name: Yup.string().required("وارد کردن نام محصول الزامی است"),
    quantity: Yup.string().required("وارد کردن تعداد محصول الزامی است"),

    price: Yup.string().required("وارد کردن قیمت محصول الزامی است"),
  });

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      quantity: "",
      price: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    reset(defaultValues);
  }, []);

  const onSubmit = async (data) => {
    onSubmitForm(data);
    return data;
  };

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
        {modalInputs.map((input) => (
          <div className={styles.inputs} key={input.name}>
            <label>{input.placeholder}</label>
            <input
              type={input.type}
              {...register(input.name)}
              name={input.name}
              placeholder={input.placeholder}
            />
            <p className={styles.error}>{errors[input.name]?.message}</p>
          </div>
        ))}
      </form>
    </div>
  );
}

export default ProductForm;

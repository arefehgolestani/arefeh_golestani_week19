const registerInputs = [
  { type: "text", name: "username", placeholder: "نام کاربری  " },
  { type: "password", name: "password", placeholder: "رمز عبور  " },
  {
    type: "password",
    name: "confirmPassword",
    placeholder: "تکرار رمز عبور  ",
  },
];

const loginInputs = [
  { type: "text", name: "username", placeholder: "نام کاربری  " },
  { type: "password", name: "password", placeholder: "رمز عبور  " },
];

const modalInputs = [
  { type: "text", name: "name", placeholder: "نام کالا" },
  { type: "text", name: "quantity", placeholder: "تعداد موجودی" },
  { type: "text", name: "price", placeholder: "قیمت (تومان)" },
];

export { registerInputs, loginInputs, modalInputs };

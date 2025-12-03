
const getProductList = () => {
  return "products?page=1&limit=10";
};

const registerUser = () => {
  return "auth/register";
};

const loginUser = () => {
  return "auth/login";
};

export { getProductList, registerUser, loginUser };

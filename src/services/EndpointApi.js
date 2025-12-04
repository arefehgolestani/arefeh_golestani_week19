
const getProductList = () => {
  return "/products?page=1&limit=5";
};

const registerUser = () => {
  return "/auth/register";
};

const loginUser = () => {
  return "/auth/login";
};

const createProduct = () => {
  return "/products";
}

export { getProductList, registerUser, loginUser, createProduct };


const getProductList = () => {
  return "/products?page=1&limit=10";
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

const deleteProduct = (id) => {
  return `/products/${id}`
}

export { getProductList, registerUser, loginUser, createProduct, deleteProduct
 };

const getProductList = (page) => {
  return `/products?page=${page}&limit=10`;
};

const registerUser = () => {
  return "/auth/register";
};

const loginUser = () => {
  return "/auth/login";
};

const createProduct = () => {
  return "/products";
};

const deleteProduct = (id) => {
  return `/products/${id}`;
};

const editProduct = (id) => {
  return `/products/${id}`;
};

export {
  getProductList,
  registerUser,
  loginUser,
  createProduct,
  deleteProduct,
  editProduct,
};

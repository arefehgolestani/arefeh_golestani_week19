const getProductList = (page) => {
  return `/products?page=${page}&limit=10`;
};

const registerUser = "/auth/register";

const loginUser = "/auth/login";

const createProduct = "/products";

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

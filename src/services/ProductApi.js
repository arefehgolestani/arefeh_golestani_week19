const BASE_URL = "http://localhost:3000";

const getProductList = () => {
  return `${BASE_URL}/products?page=1&limit=10`;
};

export { getProductList };

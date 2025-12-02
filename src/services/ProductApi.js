const BASE_URL = "http://localhost:3000";

const getProductList = () => {
  return `${BASE_URL}/products?page=1&limit=10`;
};

const registerUser = () => {
    return `${BASE_URL}/auth/register`
}

export { getProductList, registerUser };

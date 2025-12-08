import { useEffect, useState, useCallback } from "react";

import ProductContext from "./ProductContext";
import Alert from "../components/Alert.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getProductList } from "../services/EndpointApi";
import api from "../services/config";
import { generateProductCode } from "../helper/helper";

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(null);
  const [user, setUser] = useLocalStorage("username", "");
  const [token, setToken] = useLocalStorage("token", "");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productCodes, setProductCodes] = useLocalStorage("productCodes", "{}");

  const fetchProducts = useCallback(async () => {
    try {
      const url = search !== "" ? "/products" : getProductList(page);
      const res = await api.get(url);

      const updatedCodes = { ...productCodes };

      const updated = res.data.data.map((p) => {
        if (!updatedCodes[p.id]) {
          updatedCodes[p.id] = generateProductCode();
        }
        return {
          ...p,
          productCode: updatedCodes[p.id],
        };
      });

      setProductCodes(updatedCodes);
      setProducts(updated);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  }, [page, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        alert,
        token,
        setToken,
        setAlert,
        modal,
        setModal,
        page,
        setPage,
        totalPages,
        fetchProducts,
        user,
        setUser,
        search,
        setSearch,
      }}
    >
      {children}

      {alert && (
        <Alert
          key={alert.message}
          type={alert.type}
          message={alert.message}
          duration={alert.duration || 2000}
          onClose={() => setAlert(null)}
        />
      )}
    </ProductContext.Provider>
  );
}

export default ProductProvider;

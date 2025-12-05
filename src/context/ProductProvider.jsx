import { useEffect, useState, useCallback } from "react";

import ProductContext from "./ProductContext";
import Alert from "../components/Alert.jsx";
import { getProductList } from "../services/EndpointApi";
import api from "../services/config";
import { generateProductCode } from "../helper/helper";




function ProductProvider({children}) {

  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(null);
  const [user, setUser] = useState(null);
  
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    return saved ? saved : "";
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchProducts = useCallback(async () => {
    try {
      const res = await api.get(getProductList(page));

      const savedCodes = JSON.parse(localStorage.getItem("productCodes") || "{}");
  
    const updated = res.data.data.map(p => {
      if (!savedCodes[p.id]) {
        savedCodes[p.id] = generateProductCode();
      }
      return {
        ...p,
        productCode: savedCodes[p.id]
      };
    });
  
    localStorage.setItem("productCodes", JSON.stringify(savedCodes));

      setProducts(updated);
      setTotalPages(res.data.totalPages);

    } catch (error) {
      console.log("Error fetching products:", error);
    }
  }, [page]);


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

    
  return (
    <ProductContext.Provider
      value={{products, setProducts,alert,token, setToken,
        setAlert,
        modal,
        setModal,page, setPage, totalPages, fetchProducts, user, setUser}}
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
  )
}

export default ProductProvider

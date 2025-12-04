import { useEffect, useState } from "react";

import ProductContext from "./ProductContext";
import Modal from "../components/Modal.jsx";
import Alert from "../components/Alert.jsx";
import { getProductList } from "../services/EndpointApi";
import api from "../services/config";



function ProductProvider({children}) {

  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(null);
  
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    return saved ? saved : "";
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(getProductList());
        setProducts(res.data.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    }
    fetchProducts()
  } , [products]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

    
  return (
    <ProductContext.Provider
      value={{products, setProducts,alert,token, setToken,
        setAlert,
        modal,
        setModal,}}
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

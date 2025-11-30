import { useEffect, useState } from "react";

import ProductContext from "./ProductContext";
import Modal from "../components/Modal.jsx";
import Alert from "../components/Alert.jsx";

const API_URL = "http://localhost:3000/products?page=1&limit=10";

function ProductProvider({children}) {

  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data)
      } catch (error) {
        console.log("Error fetching contacts:", error);
      }
      
    }
    fetchProduct()
  } , [])
  console.log(products)
    
  return (
    <ProductContext.Provider
      value={{products, setProducts,alert,
        setAlert,
        modal,
        setModal,}}
    >
      {children}

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          duration={alert.duration || 2000}
          onClose={() => dispatch({ type: "CLEAR_ALERT" })}
        />
      )}

      {modal && (
        <Modal
          title={modal.title}
          message={modal.message}
          confirmText={modal.confirmText}
          cancelText={modal.cancelText}
          onConfirm={modal.onConfirm}
          onCancel={() => dispatch({ type: "CLEAR_MODAL" })}
        />
      )}
    </ProductContext.Provider>
  )
}

export default ProductProvider
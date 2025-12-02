import { useEffect, useState } from "react";

import ProductContext from "./ProductContext";
import Modal from "../components/Modal.jsx";
import Alert from "../components/Alert.jsx";
import { getProductList } from "../services/ProductApi";


function ProductProvider({children}) {

  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(getProductList());
      const data = await res.json();
      setProducts(data.data)
      } catch (error) {
        console.log("Error fetching contacts:", error);
      }
      
    }
    fetchProduct()
  } , [])
    
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
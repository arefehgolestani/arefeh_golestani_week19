import { useContext, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

import styles from "./ManageProductPage.module.css"
import avatar1 from "../assets/image/avatar1.jpg"
import manage from "../assets/image/manage.png"
import trash from "../assets/image/trash.svg"
import edit from "../assets/image/edit.png"
import Modal from "../components/Modal";

import ProductContext from "../context/ProductContext";
import ProductForm from "../components/ProductForm";
import Alert from "../components/Alert";
import { createProduct } from "../services/EndpointApi";
import api from "../services/config";



function ManageProductPage() {
  const {
    products,
    setProducts,
    alert,
    setAlert,
    modal,
    setModal
  } = useContext(ProductContext);

  const [newProduct, setNewProduct] = useState({})

  const addHandler = () => {
    setModal({
      title: "ایجاد محصول جدید",
      mode: "add",
      children: <ProductForm onSubmitForm={onSubmitForm} submitRef={submitRef} />,
      confirmText: "ایجاد محصول",
      cancelText: "انصراف",
      onConfirm: CreateProductHandler,
    });
  }
  const submitRef = useRef(null)

  const onSubmitForm = (data) => {
    setNewProduct(data);
  }
   
  const CreateProductHandler = async () => {
   try {
    const result = await submitRef.current();
    if (!result) return;
  
    await api.post(createProduct(), result);
    
    // await fetchProducts();
    // setProducts(prev => [...prev, response.data]);
  
    setModal(null);
    setAlert({
      type: "success",
      message: "محصول جدید با موفقیت افزوده شد",
      duration: 2000
    });
   } catch (error) {
     console.log(error)
     console.log(error.response?.data)
   }
  };


  

  return (
    <div>
       {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className={styles.header}>
        <div className={styles.search}>
          <label><CiSearch /></label>
          <input type="text" placeholder="جستجوی کالا" />
        </div>
        <div className={styles.user}>
          <img src={avatar1} />
          <div>
            <p>میلاد عظمی</p>
            <span>مدیر</span>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.container_header}>
          <div>
            <img src={manage} />
            <span>مدیریت کالا</span>
          </div>
          <button onClick={addHandler}>افزودن محصول</button>
        </div>
        <div className={styles.product_table}>
           <table>
             <thead>
               <tr>
                 <th>نام کالا</th>
                 <th>موجودی</th>
                 <th>قیمت</th>
                 <th>شناسه کالا</th>
                 <th>
                 </th>
               </tr>
             </thead>
             <tbody>
              
                 {products.map((product) => (
                  
                   <tr key={product.id}>
                   <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td>{product.id}</td>
                    <td>
                      <button><img src={edit} /></button>
                      <button><img src={trash} /></button>
                    </td>
                   </tr>
                   
                 
                 )
                  
                 )}
             </tbody>
           </table>
           
        </div>
        <div className={styles.pagination} >
             <span>3</span>
             <span>2</span>
             <span className={styles.active}>1</span>
      
           </div>
      </div>
      {modal && (
        <Modal
          title={modal.title}
          mode={modal.mode}
          message={modal.message}
          confirmText={modal.confirmText}
          cancelText={modal.cancelText}
          onConfirm={modal.onConfirm}
          onCancel={() => setModal(null)}
        >
          {modal.children}
        </Modal>
      )}
    </div>
  )
}


export default ManageProductPage
import { useContext, useRef, useState, useCallback } from "react";



import styles from "./ManageProductPage.module.css"
import avatar1 from "../assets/image/avatar1.jpg"
import manage from "../assets/image/manage.png"
import trash from "../assets/image/trash.svg"
import edit from "../assets/image/edit.png"
import close from "../assets/image/close.png"
import Modal from "../components/Modal";

import ProductContext from "../context/ProductContext";
import ProductForm from "../components/ProductForm";
import Alert from "../components/Alert";
import { createProduct, deleteProduct } from "../services/EndpointApi";
import api from "../services/config";
import Search from "../components/Search";
import Pagination from "../components/Pagination";



function ManageProductPage() {
  const {
    products,
    setProducts,
    alert,
    setAlert,
    modal,
    setModal, 
    fetchProducts
  } = useContext(ProductContext);


  const [newProduct, setNewProduct] = useState({});
  const [search, setSearch] = useState("");
  

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

  const handleCloseAlert = useCallback(() => {
  setAlert(null);
}, []);
   
  const CreateProductHandler = async () => {
   try {
    const result = await submitRef.current();
    if (!result) return;
  
    await api.post(createProduct(), result);
    fetchProducts();
  
    setModal(null);
    setAlert({
      type: "success",
      message: "محصول جدید با موفقیت افزوده شد",
      duration: 2000
    });
   } catch (error) {
     console.log(error)
   }
  };



  const deleteHandler = (id) => {
    setModal({
      title: "حذف محصول",
      icon: <img src={close} />,
      mode: "delete",
      message: "آیا از حذف این محصول اطمینان دارید؟",
      confirmText: "حذف",
      cancelText: "لغو",
      onConfirm: () => deleteProductHandler(id),
    });
  }

  const deleteProductHandler = async (id) => {

  await api.delete(deleteProduct(id));
  fetchProducts();

    setModal(null);
    setAlert({
      type: "warning",
      message: "محصول مورد نظر حذف شد!",
      duration: 2000
    });
  }

  const filteredProducts = search
    ? products.filter((product) => {
        return (
          product.name?.toLowerCase().includes(search)
        );
      })
    : products;
  

  return (
    <div>
       {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      )}
      <div className={styles.header}>
        <Search search={search} setSearch={setSearch} />
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

             {products.length === 0 ? (
            <tr>
              <td colSpan="5">در حال حاضر هیچ محصولی وجود ندارد!</td>
            </tr>
          ) : filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="5">موردی یافت نشد!</td>
            </tr>
          ) : (
           <>
               {filteredProducts.map((product) => (
                  
                  <tr key={product.id}>
                  <td>{product.name}</td>
                   <td>{product.quantity}</td>
                   <td>{product.price}</td>
                   <td>{product.id}</td>
                   <td>
                     <button><img src={edit} /></button>
                     <button onClick={() => deleteHandler(product.id)}><img src={trash} /></button>
                   </td>
                  </tr>
                )
                )}
           </>
          )}
             </tbody>
           </table>
           
        </div>
       <Pagination />
      </div>
      {modal && (
        <Modal
          title={modal.title}
          mode={modal.mode}
          icon={modal.icon}
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
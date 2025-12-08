import { useContext, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

import avatar1 from "../assets/image/avatar1.jpg";
import manage from "../assets/image/manage.png";
import close from "../assets/image/close.png";
import Modal from "../components/Modal";
import ProductContext from "../context/ProductContext";
import ProductForm from "../components/ProductForm";
import Alert from "../components/Alert";
import {
  createProduct,
  deleteProduct,
  editProduct,
} from "../services/EndpointApi";
import api from "../services/config";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

import styles from "./ManageProductPage.module.css";
import ProductTable from "../components/productTable";

function ManageProductPage() {
  const {
    products,
    alert,
    setAlert,
    modal,
    setModal,
    fetchProducts,
    user,
    search,
  } = useContext(ProductContext);

  const [newProduct, setNewProduct] = useState({});

  const addHandler = () => {
    setModal({
      title: "ایجاد محصول جدید",
      mode: "add",
      children: (
        <ProductForm onSubmitForm={onSubmitForm} submitRef={submitRef} />
      ),
      confirmText: "ایجاد محصول",
      cancelText: "انصراف",
      onConfirm: CreateProductHandler,
    });
  };
  const submitRef = useRef(null);

  const onSubmitForm = (data) => {
    setNewProduct(data);
  };

  const handleCloseAlert = useCallback(() => {
    setAlert(null);
  }, []);

  const CreateProductHandler = async () => {
    try {
      const result = await submitRef.current();
      if (!result) return;

      await api.post(createProduct, result);
      fetchProducts();

      setModal(null);
      setAlert({
        type: "success",
        message: "محصول جدید با موفقیت افزوده شد",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
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
  };

  const deleteProductHandler = async (id) => {
    await api.delete(deleteProduct(id));
    fetchProducts();

    setModal(null);
    setAlert({
      type: "warning",
      message: "محصول مورد نظر حذف شد!",
      duration: 2000,
    });
  };

  const editHandler = (id) => {
    const selectedProduct = products.find((p) => p.id === id);

    setModal({
      title: "ویرایش اطلاعات",
      mode: "edit",
      children: (
        <ProductForm
          onSubmitForm={onSubmitForm}
          submitRef={submitRef}
          defaultValues={selectedProduct}
        />
      ),
      confirmText: "ثبت اطلاعات جدید",
      cancelText: "انصراف",
      onConfirm: () => editProductHandler(id),
    });
  };

  const editProductHandler = async (id) => {
    try {
      const result = await submitRef.current();
      if (!result) return;

      await api.put(editProduct(id), result);
      fetchProducts();

      setModal(null);
      setAlert({
        type: "success",
        message: "ویرایش با موفقیت انجام شد",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = search
    ? products.filter((product) => {
        return product.name?.toLowerCase().includes(search);
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
        <Search />
        <div className={styles.user}>
          <img src={avatar1} />
          <div>
            <p>{user}</p>
            <Link to="/login">
              <AiOutlineLogout /> <span>خروج</span>
            </Link>
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
          <ProductTable
            products={products}
            filteredProducts={filteredProducts}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
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
  );
}

export default ManageProductPage;

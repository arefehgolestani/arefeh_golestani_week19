import { useContext } from "react";

import ProductContext from "../context/ProductContext";
import styles from "./Pagination.module.css"

function Pagination() {

    const {
        page, setPage, totalPages 
       } = useContext(ProductContext);

 const nextHandler = () => {
    if (page < totalPages) setPage(page + 1);
  
 }

 const prevHandler = () => {
    if (page > 1) setPage(page - 1);
 }



  return (
    <div className={styles.pagination} >
    <button onClick={prevHandler}>قبلی</button>
    {Array.from({ length: totalPages }).map((_, i) => (
  <button
    key={i}
    className={page === i + 1 ? styles.active : ""}
    onClick={() => setPage(i + 1)}
  >
    {i + 1}
  </button>
))}
    <button onClick={nextHandler}>بعدی</button>
    
    </div>
  )
}

export default Pagination
import { CiSearch } from "react-icons/ci";

import styles from "./HomePage.module.css"
import avatar1 from "../assets/image/avatar1.jpg"
import avatar2 from "../assets/image/avatar2.jpg"
import manage from "../assets/image/manage.png"
import trash from "../assets/image/trash.svg"
import edit from "../assets/image/edit.png"

function HomePage() {
  return (
    <div>
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
          <button>افزودن محصول</button>
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
               <tr>
                 <td>تیشرت طرح انگولار</td>
                 <td>293</td>
                 <td>90 هزار تومان</td>
                 <td>90uf9g9h7895467g974</td>
                 <td>
                   <button><img src={edit} /></button>
                   <button><img src={trash} /></button>
                 </td>
               </tr>
               <tr>
                 <td>تیشرت طرح انگولار</td>
                 <td>293</td>
                 <td>90 هزار تومان</td>
                 <td>90uf9g9h7895467g974</td>
                 <td>
                   <button><img src={edit} /></button>
                   <button><img src={trash} /></button>
                 </td>
               </tr>
               <tr>
                 <td>تیشرت طرح انگولار</td>
                 <td>293</td>
                 <td>90 هزار تومان</td>
                 <td>90uf9g9h7895467g974</td>
                 <td>
                   <button><img src={edit} /></button>
                   <button><img src={trash} /></button>
                 </td>
               </tr>
             </tbody>
           </table>
           
        </div>
        <div className={styles.pagination} >
             <span>3</span>
             <span>2</span>
             <span className={styles.active}>1</span>
      
           </div>
      </div>
    </div>
  )
}

export default HomePage
import { useContext } from "react";
import { CiSearch } from "react-icons/ci";

import ProductContext from "../context/ProductContext";

import styles from "./Search.module.css";

function Search() {
  const { search, setSearch } = useContext(ProductContext);
  return (
    <div className={styles.search}>
      <label>
        <CiSearch />
      </label>
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value.toLowerCase())}
        placeholder="جستجوی کالا"
      />
    </div>
  );
}

export default Search;

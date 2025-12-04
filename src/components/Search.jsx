import { CiSearch } from "react-icons/ci";
import styles from "./Search.module.css"

function Search({search, setSearch}) {
  return (
    <div className={styles.search}>
          <label><CiSearch /></label>
          <input type="text" value={search}  onChange={(event) => setSearch(event.target.value.toLowerCase())} placeholder="جستجوی کالا" />
    </div>
  )
}

export default Search
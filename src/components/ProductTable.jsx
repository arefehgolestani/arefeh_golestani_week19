import trash from "../assets/image/trash.svg";
import edit from "../assets/image/edit.png";

function ProductTable({
  products,
  filteredProducts,
  editHandler,
  deleteHandler,
}) {

    
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه کالا</th>
            <th></th>
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
                  <td>{product.price} هزار تومان</td>
                  <td>{product.productCode}</td>
                  <td>
                    <button onClick={() => editHandler(product.id)}>
                      <img src={edit} />
                    </button>
                    <button onClick={() => deleteHandler(product.id)}>
                      <img src={trash} />
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ProductTable;

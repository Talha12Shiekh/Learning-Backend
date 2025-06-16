import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  async function getProducts() {
    const { data } = await axios.get("/products");
    setProducts(data);
    setTotal(data.length);
  }

  async function handleDeleteProduct(dltid) {
    try {
      if (confirm("Are you sure you want to delete !")) {
        await axios.delete(`/products/${dltid}`);
        await getProducts();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function handleSort(e) {
    const sortstr = e.target.value.split(".");
    const { data } = await axios.get(
      `/products/sort/?sortkey=${sortstr[0]}&order=${sortstr[1]}`
    );
    console.log(data);
    setProducts(data);
  }

  async function handlePagination(pgnum) {
    const { data } = await axios.get(
      `/products/sort/?page=${pgnum}`
    );
    setProducts(data);
  }

  return (
    <>
      <select onChange={handleSort}>
        <option value="price.desc">Price High to Low</option>
        <option value="price.asc">Price Low to High</option>
        <option value="rating.desc">Rating High to Low</option>
        <option value="rating.asc">Rating Low to High</option>
      </select>

      {Array(Math.ceil(total / 1))
        .fill(0)
        .map((e, i) => (
          <button onClick={() => handlePagination(i + 1)}>{i + 1}</button>
        ))}

      {products.map((product, index) => (
        <Product
          {...product}
          key={index}
          handleDeleteProduct={handleDeleteProduct}
        />
      ))}
    </>
  );
};

export default ProductList;

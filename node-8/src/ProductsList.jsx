import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const { data } = await axios.get("/products");
    setProducts(data);
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

  return (
    <>
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

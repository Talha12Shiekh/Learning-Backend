import Product from "./Product";
import { useEffect, useState } from "react";
import { ProductsData } from "./data";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const { data } = await axios.get("http://localhost:8080/products");
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {products.map((product, index) => (
        <Product {...product} key={index} />
      ))}
    </>
  );
};

export default ProductList;

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Product.css";

const ProductScreen = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(userInfo.token);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const { data } = await axios.get(
        `${baseUrl}/api/v1/products/allProducts`,
        config
      );
      console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      {products ? (
        <div className="parent_class">
          {products.map((product) => {
            return (
              <div key={product._id} className="container">
                <h1>{product.name}</h1>
                DESCRIPTION :{product.description}
                <br />
                PRICE: ${product.price}
              </div>
            );
          })}
        </div>
      ) : (
        "You don't have access to view the products"
      )}
    </div>
  );
};

export default ProductScreen;

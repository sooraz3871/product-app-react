import React, { createContext, useState } from "react";
import { products as initialProducts } from "../assets/productsData";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  const addProducts = (item) => {
    // Generate a unique ID for the new product
    item.id = Math.max(...products.map((product) => product.id)) + 1;
    setProducts([...products, item]);
  };

  const removeProducts = (itemId) => {
    const updatedProducts = products.filter((product) => product.id !== itemId);
    setProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider value={{ products, addProducts, removeProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;

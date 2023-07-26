import React, { createContext, useState, useEffect } from "react";
import { products as initialProducts } from "../assets/productsData";

import axiosClient from "../axios";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  //loader
  const [loading, setLoading] = useState(false);

  // Snackbar
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    // Fetch products from the API when the component mounts
    fetchProducts();
  }, [setProducts]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/products");
      setLoading(false);
      // console.log("<<<<<<PRODUCTS RESPONSE >>>>", response);
      const productsData = response?.data;
      setProducts(productsData.data);
    } catch (error) {
      setLoading(false);
      showSnackbar("Error fetching products", "error");
      // console.error("Error fetching products:", error);
    }
  };

  const addProducts = async (item) => {
    try {
      const response = await axiosClient.post("/products", item);
      // console.log("Add Response ", response);
      setProducts([...products, item]);
      showSnackbar("Product added successfully", "success");
    } catch (error) {
      showSnackbar("Error adding product", "error");
      // console.error("Error adding product:", error);
    }
  };

  const removeProducts = async (itemId) => {
    try {
      await axiosClient.delete(`/products/${itemId}`);
      const updatedProducts = products.filter(
        (product) => product.productId !== itemId
      );
      setProducts(updatedProducts);
      showSnackbar("Product deleted successfully", "success");
    } catch (error) {
      showSnackbar("Error deleting product", "error");
      // console.error("Error deleting product:", error);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProducts,
        removeProducts,
        loading,
      }}
    >
      {children}
      {/* Snackbar alert */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;

import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Container, Button, CircularProgress } from '@mui/material';
import ProductList from "../../components/ProductList";
import ProductFormDrawer from "../../components/ProductFormDrawer";
import { ProductContext } from "../../contexts/ProductContext";

function ListPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { products, addProducts, removeProducts,loading } = useContext(ProductContext);



  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Function to handle adding a new product to the list
  const handleAddProduct = (newProduct) => {
    addProducts(newProduct);
    handleCloseDrawer();
  };

  // Function to handle deleting a product from the list
  const handleDeleteProduct = (productId) => {
    removeProducts(productId);
  };

  return (
    <div>
      {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <CircularProgress />
          </div>
        ):(<><AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Products List</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <ProductList
          products={products}
          onDeleteProduct={handleDeleteProduct}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDrawer}
          style={{ marginTop: "1rem" }}
        >
          Add Product
        </Button>
        <ProductFormDrawer
          open={isDrawerOpen}
          onClose={handleCloseDrawer}
          onSubmit={handleAddProduct}
        />
      </Container>
      </>
      )}
    </div>
  );
}

export default ListPage;

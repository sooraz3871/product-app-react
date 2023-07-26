import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"; // Import the empty cart icon
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

const ProductList = ({ products, onDeleteProduct }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {}, [products]);

  const handleOpenDeleteDialog = (productId) => {
    setSelectedProductId(productId);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedProductId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    onDeleteProduct(selectedProductId);
    handleCloseDeleteDialog();
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      {products.length === 0 ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ textAlign: "center", padding: "24px" }}>
              <CardContent>
                <RemoveShoppingCartIcon fontSize="large" color="disabled" />
                <Typography variant="h6">No Products</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.productId}>
              <Card style={{ position: "relative" }}>
                <CardContent style={{ paddingBottom: "48px" }}>
                  <Typography variant="h6">{product.name}</Typography>
                  {product.imageURL && (
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        marginTop: "0.5rem",
                      }}
                    />
                  )}
                  <Typography variant="body1">
                    Price: ${product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2">{product.description}</Typography>
                </CardContent>
                <IconButton
                //   color="secondary"
                  aria-label="delete"
                  style={{ position: "absolute", bottom: "8px", left: "8px", color :"#FF0000" }}
                  onClick={() => handleOpenDeleteDialog(product.productId)}
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ProductList;

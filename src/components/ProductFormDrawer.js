import React from "react";
import {
  Drawer,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProductFormDrawer = ({ open, onClose, onSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.number()
      .typeError("Invalid price")
      .required("Required")
      .positive("Price must be positive")
      .min(0.01, "Price must be at least $0.01"),
    imageUrl: Yup.string().url("Invalid URL format"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      imageUrl: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Parse the price to a number within the form submission
      const price = parseFloat(values.price);

      // Check if the parsed price is a valid number
      if (isNaN(price)) {
        formik.setFieldError(
          "price",
          "Invalid price. Please enter a valid number."
        );
        return;
      }

      onSubmit({ ...values, price });
      formik.resetForm();
      onClose();
    },
  });

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {/* Header */}
      <AppBar
        position="static"
        style={{ background: "#1976d2", color: "#fff" }}
      >
        <Toolbar>
          <Typography variant="h6" style={{ flex: 1 }}>
            Add New Product
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Form */}
      <div style={{ width: 300, padding: "1rem" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            id="imageUrl"
            name="imageUrl"
            label="Image URL"
            value={formik.values.imageUrl}
            onChange={formik.handleChange}
            error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
            helperText={formik.touched.imageUrl && formik.errors.imageUrl}
            style={{ marginBottom: "1rem" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Add Product
          </Button>
        </form>
      </div>
    </Drawer>
  );
};

export default ProductFormDrawer;

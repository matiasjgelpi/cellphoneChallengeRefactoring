import {
  Button,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getAllBrands, deleteBrand } from "../../redux/brandSlice";
import { getAllProducts, deleteProduct } from "../../redux/productSlice";
import EditBrandDetail from "../../components/edit-brand-detail/EditBrandDetail";
import EditProductDetail from "../../components/edit-product-detail/EditProductDetail";
import { Routes, Route } from "react-router-dom";

export default function EditDeletePage() {
  let brands = useSelector((state) => state.brands.brands);
  let products = useSelector((state) => state.products.products);

  const dispatch = useDispatch();
  const location = useLocation();

  const [inputs, setInputs] = useState({
    brand: "",
    product: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleDelete = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        if (e.target.name === "brand") {
          dispatch(deleteBrand(inputs.brand));
        } else if (e.target.name === "product") {
          dispatch(deleteProduct(inputs.product));
        }

        setInputs({
          brand: "",
          product: "",
        });
      } else {
        Swal.close();
      }
    });
  };


  const handleEdit = (e) => {
    if (e.target.name === "brand") {
      navigate(`EditBrand/${inputs.brand}`);
    }
    if (e.target.name === "product") {
      navigate(`EditProduct/${inputs.product}`);
    }
  };

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          display:
            location.pathname !== "/admin/EditOrDelete" ? "none" : "flex",
          flexDirection: "column",
          gap: "4rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <FormControl fullWidth>
            <InputLabel variant="outlined" htmlFor="description">
              Brands
            </InputLabel>
            <Select
              label="Brands"
              name="brand"
              value={inputs.brand}
              error={inputs.brand === ""}
              onChange={handleChange}
            >
              {brands?.map((brand) => {
                return (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText variant="outlined">
              {inputs.brand === "" && "Select a product to edit or delete"}
            </FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            size="small"
            sx={{
              width: "12%",
              maxHeight: "3rem",
            }}
            name="brand"
            onClick={handleEdit}
            disabled={inputs.brand === ""}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              width: "12%",
              maxHeight: "3rem",
            }}
            name="brand"
            onClick={(e) => handleDelete(e)}
            disabled={inputs.brand === ""}
          >
            Delete
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <FormControl fullWidth>
            <InputLabel variant="outlined" htmlFor="description">
              Products
            </InputLabel>
            <Select
              label="Products"
              name="product"
              value={inputs.product}
              error={inputs.product === ""}
              onChange={handleChange}
            >
              {products?.map((product) => {
                return (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText variant="outlined">
              {inputs.product === "" && "Select a product to edit or delete"}
            </FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            size="small"
            sx={{
              width: "12%",
              maxHeight: "3rem",
            }}
            name="product"
            onClick={handleEdit}
            disabled={inputs.product === ""}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              width: "12%",
              maxHeight: "3rem",
            }}
            name="product"
            onClick={handleDelete}
            disabled={inputs.product === ""}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <Routes>
        <Route path="EditBrand/:id" element={<EditBrandDetail />} />
        <Route path="EditProduct/:id" element={<EditProductDetail />} />
      </Routes>
    </>
  );
}

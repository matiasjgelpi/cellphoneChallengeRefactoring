import { useState, useEffect } from "react";
import {
  Button,
  Box,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addNewProduct, editProduct } from "../../redux/productSlice";
import { getAllBrands } from "../../redux/brandSlice";
import { validateProduct } from "../../utils/validators";
import Swal from "sweetalert2";

export default function ProductForm({ edit, id }) {
  let brands = useSelector((state) => state.brands.brands);
  const dispatch = useDispatch();

  const location = useLocation();

  const [inputs, setInputs] = useState({
    name: "",
    image_url: "",
    price: "",
    brand: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.target.name === "edit" ? "edit" : "create";
    Swal.fire({
      title: "You want to continue?",
      text: `You will ${action} a product!`,
      icon: "info",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        if (e.target.name !== "edit") {
          const validInputs = {
            ...inputs,
            price: parseFloat(inputs.price),
          };
          dispatch(addNewProduct(validInputs));
        } else {
          const editedProduct = {
            ...inputs,
            id: id,
          };
          if (editedProduct.price !== "") {
            editedProduct.price = parseFloat(editedProduct.price);
          }

          for (let key in editedProduct) {
            if (editedProduct[key] === "") {
              delete editedProduct[key];
            }
          }

          dispatch(editProduct(editedProduct));
        }
      } else {
        Swal.close();
      }
    });
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors(validateProduct(inputs));
  };

  useEffect(() => {
    setErrors(validateProduct(inputs, edit));
  }, [setErrors, inputs, edit]);

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "75vw",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "center",
      }}
    >
      <TextField
        name="name"
        fullWidth
        error={errors.name !== undefined}
        helperText={errors?.name && errors?.name}
        variant="outlined"
        label="Name"
        margin="normal"
        value={inputs.name}
        onChange={handleChange}
      />

      <TextField
        name="image_url"
        error={errors?.image_url !== undefined}
        helperText={errors?.image_url && errors?.image_url}
        variant="outlined"
        label="Image URL"
        margin="normal"
        value={inputs.image_url}
        sx={{ width: "85%" }}
        onChange={handleChange}
      />

      <TextField
        name="price"
        error={errors?.price !== undefined}
        helperText={errors?.price && errors?.price}
        variant="outlined"
        label="Price"
        type="number"
        margin="normal"
        value={inputs.price}
        sx={{ width: "15%" }}
        onChange={handleChange}
      />

      <FormControl error={errors?.brand !== undefined} fullWidth>
        <InputLabel variant="outlined" htmlFor="description">
          Brand
        </InputLabel>
        <Select
          label="Brand"
          name="brand"
          value={inputs.brand}
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
          {errors?.brand && errors?.brand}
        </FormHelperText>
      </FormControl>

      <FormControl error={errors?.description !== undefined} fullWidth>
        <InputLabel variant="outlined" htmlFor="description">
          Description
        </InputLabel>
        <OutlinedInput
          label="Description"
          name="description"
          multiline
          minRows={10}
          onChange={handleChange}
          value={inputs.description}
        ></OutlinedInput>
        <FormHelperText variant="outlined">
          {errors?.description && errors?.description}
        </FormHelperText>
      </FormControl>
      {location.pathname === "/admin/AddProduct" ? (
        <Button
          variant="contained"
          size="small"
          sx={{ width: "15%" }}
          onClick={handleSubmit}
          disabled={errors.isValid}
          type="submit"
        >
          Add Product
        </Button>
      ) : (
        <Button
          variant="contained"
          size="small"
          sx={{ width: "15%" }}
          name="edit"
          onClick={handleSubmit}
          disabled={
            errors.isValid ||
            (inputs.name === "" &&
              inputs.image_url === "" &&
              inputs.price === "" &&
              inputs.brand === "" &&
              inputs.description === "")
          }
        >
          Edit Product
        </Button>
      )}
    </Box>
  );
}

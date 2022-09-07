import { useEffect, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { validateBrand } from "../../utils/validators";
import { useLocation } from "react-router-dom";
import { addNewBrand, editBrand } from "../../redux/brandSlice";
import Swal from "sweetalert2";


export default function BrandForm({ edit, id }) {
  const dispatch = useDispatch();
  const brand = useSelector((state) => state.brands.brandDetail);

  const [inputs, setInputs] = useState({
   
    name: "",
    logo_url: "",
  });
  const [errors, setErrors] = useState({});


  const location = useLocation();


  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.target.name === 'edit' ? 'edit' : "create"
    Swal.fire({
      title: "You want to continue?",
      text: `You will ${action} a brand!`,
      icon: "info",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        if (e.target.name === "edit") {
          const editedBrand = {
            ...inputs,
            id: id,
          };

          for (let key in editedBrand) {
            if (editedBrand[key] === "") {
              delete editedBrand[key];
            }
          }

          dispatch(editBrand(editedBrand));
        } else {
          dispatch(addNewBrand(inputs));
        }
      } else {
        Swal.close();
      }
    });
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors(validateBrand(inputs, edit));
  };

  useEffect(() => {
    if(edit !== undefined) {
      setInputs({ name: brand.name??'' ,
      logo_url:brand.logo_url??'' })
    }
    
  },[brand, inputs, edit])

  useEffect(() => {
    setErrors(validateBrand(inputs, edit));
  }, [setErrors, inputs, edit]);

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
        error={errors?.name !== undefined}
        helperText={errors?.name && errors?.name}
        variant="outlined"
        label="Name"
        margin="normal"
        value={inputs.name}
        onChange={handleChange}
      />

      <TextField
        name="logo_url"
        fullWidth
        error={errors?.logo_url !== undefined}
        helperText={errors?.logo_url && errors?.logo_url}
        variant="outlined"
        label="Logo URL"
        margin="normal"
        value={inputs.logo_url}
        onChange={handleChange}
      />

      {location.pathname === "/admin/AddBrand" ? (
        <Button
          variant="contained"
          size="small"
          sx={{
            width: "20%",
          }}
          onClick={handleSubmit}
          disabled={errors.isValid}
        >
          Add Brand
        </Button>
      ) : (
        <Button
          variant="contained"
          size="small"
          sx={{ width: "20%" }}
          name="edit"
          onClick={handleSubmit}
          disabled={
            errors.isValid || (inputs.name === "" && inputs.logo_url === "")
          }
        >
          Edit Brand
        </Button>
      )}
    </Box>
  );
}

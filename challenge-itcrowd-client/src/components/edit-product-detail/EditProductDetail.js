import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../redux/productSlice";
import ProductForm from "../product-form/ProductForm";

export default function EditBrandDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productDetail);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  return (
    <Box
      sx={{
        maxWidth: "80vw",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          width: "100%",
          paddingBottom: "15px",
          textAlign: "center",
        }}
      >
        Edit Product
      </Typography>

      <Box
        sx={{
          width: "45%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingLeft: "6rem",
        }}
      >
        <Typography variant="h4">Preview</Typography>
        <Typography variant="h6">Name: {product.name}</Typography>
        <Typography variant="h6">
          Brand: {product.brand !== null ? product.brand?.name : "Not specified"}
        </Typography>
        <Typography variant="h6">Price: ${product.price}</Typography>
        <Typography variant="h6">
          Description:
          <Typography variant="body1">{product.description}</Typography>
        </Typography>

        <Typography
          variant="h6"
          component="span"
          sx={{
            width: "25%",
          }}
        >
          {" "}
          Image:{" "}
        </Typography>

        <img
          style={{
            borderRadius: "10px",
            width: "25%",
            display: "inline",
          }}
          src={product.image_url}
          alt="kitty"
        ></img>
      </Box>
      <Box
        sx={{
          width: "48%",
          paddingBottom: "5px",
        }}
      >
        <ProductForm edit={"edit"} id={id} />
      </Box>
    </Box>
  );
}

import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../redux/productSlice";
import ProductForm from "../product-form/ProductForm";
import style from "./style.module.css";

export default function EditBrandDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productDetail);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  return (
    <Box className={style.container}>
      <Typography className={style.title} variant="h3">
        Edit Product
      </Typography>

      <Box className={style.logo_preview_container}>
        <Typography variant="h5" className={style.logo_preview_title}>Current Image:</Typography>

        <img className={style.logo} src={product.image_url} alt="kitty"></img>
      </Box>
      <Box className={style.form}>
        <ProductForm edit={"edit"} id={id} />
      </Box>
    </Box>
  );
}

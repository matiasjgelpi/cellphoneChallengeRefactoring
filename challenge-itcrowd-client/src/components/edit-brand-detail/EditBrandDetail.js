import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBrandDetail } from "../../redux/brandSlice";
import BrandForm from "../brand-form/BrandForm";
import style from "./style.module.css";

export default function EditBrandDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const brand = useSelector((state) => state.brands.brandDetail);

  useEffect(() => {
    dispatch(getBrandDetail(id));
  }, [dispatch, id]);

  return (
    <Box className={style.container}>
      <Typography variant="h3" className={style.title}>
        Edit Brand
      </Typography>

      <Box className={style.logo_preview_container}>
        <Typography variant="h4"> Current Logo:</Typography>

        <img
        className={style.logo}
          src={
            brand?.logo_url?.length < 10
              ? "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-145679137-scaled-e1619025176434.jpg?resize=2048,1365"
              : brand.logo_url
          }
          alt="kitty"
        ></img>
      </Box>
      <Box>
        <BrandForm edit={"edit"} id={brand.id} />
      </Box>
    </Box>
  );
}

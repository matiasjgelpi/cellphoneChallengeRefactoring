import { useEffect } from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { getProductDetail, cleanProductDetail } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetail() {
  const { id } = useParams();
  const product = useSelector((state) => state.products.productDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(cleanProductDetail());
    };
  }, [dispatch]);

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "lightblue",
        tranparent: true,
        height: "85vh",
        margin: "1rem",
        padding: "0 10% 0 10%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {product?.name?.length > 0 ? (
        <>
          <Typography variant="h3" textAlign="center" width="100%">
            {product?.name}
          </Typography>
          <Box
            sx={{
              width: "45%",
            }}
          >
            <img
              style={{
                borderRadius: "10px",
                maxHeight: "500px",
                objectFit: "contain",
              }}
              width="85%"
              src={product.image_url}
              alt="kitty"
            ></img>
          </Box>
          <Box
            sx={{
              width: "45%",
              height: "60%",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <img
              style={{
                borderRadius: "10px",
                width: "100px",
                display: "inline",
              }}
              src={product.brand?.logo_url}
              alt="kitty"
            ></img>
            <Typography variant="h6" textAlign="start" width="100%">
              Price:<b> ${product.price}</b>
            </Typography>

            <Typography variant="body1" textAlign="start" width="100%">
              {" "}
              <b>Description:</b> {product.description}
            </Typography>

            <Typography variant="body1" textAlign="start" width="100%">
              {" "}
              <b>Brand:</b> {product.brand?.name}
            </Typography>
          </Box>
        </>
      ) : (
        <CircularProgress />
      )}
    </Paper>
  );
}

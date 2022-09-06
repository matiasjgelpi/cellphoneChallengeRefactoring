import {
  Paper,
  Typography,
  Box,
  Pagination,
  CircularProgress,
} from "@mui/material";
import ProductCard from "../../components/product-card/ProductCard";
import { getAllProducts } from "../../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import style from "./style.module.css";

export default function MainPage() {
  let products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();



  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(3);

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const pagesTotal = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Paper className={style.main_page_container} elevation={3}>
      <Typography variant="h4" className={style.main_page_title}>
        PRODUCTS:
      </Typography>
      <Box className={style.products_container}>
        {products.length > 0 ? (
          products
            ?.slice(indexOfFirstProduct, indexOfLastProduct)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <CircularProgress />
        )}
      </Box>

      <Box className={style.pagination_container}>
        <Pagination count={pagesTotal} onChange={(e, page) => setPage(page)} />
      </Box>
    </Paper>
  );
}

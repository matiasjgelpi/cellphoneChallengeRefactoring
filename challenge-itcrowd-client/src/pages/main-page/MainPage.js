import {
  Paper,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ProductCard from "../../components/product-card/ProductCard";
import {
  getAllProducts,
  orderProductsByPrice,
  orderProductsByAlphabet,
} from "../../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import style from "./style.module.css";

export default function MainPage() {
  let products = useSelector((state) => state.products.products);
  console.log(products);
  const dispatch = useDispatch();

  const [orderDirection, setOrderDirection] = useState("");

  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(4);

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const pagesTotal = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handlePriceOrderInput = (e) => {
    setOrderDirection(e.target.value);
    dispatch(orderProductsByPrice(orderDirection));
  };

  const handleAlphabetOrderInput = (e) => {
    setOrderDirection(e.target.value);
    dispatch(orderProductsByAlphabet(orderDirection));
  };

  return (
    <Paper className={style.main_page_container} elevation={3}>
      <Typography variant="h4" className={style.main_page_title}>
        PRODUCTS:
      </Typography>
      <Box
        sx={{
          width: "70vw",
        }}
      >
        <FormControl className={style.select}>
          <InputLabel>Orden alfabético</InputLabel>
          <Select
            label="Orden alfabético"
            name="alphabeticOrder"
            value={orderDirection}
            onChange={handleAlphabetOrderInput}
          >
            <MenuItem className={style.select_item} value="ASC">
              ASC
            </MenuItem>
            <MenuItem className={style.select_item} value="DSC">
              DSC
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl className={style.select}>
          <InputLabel>Orden por precio</InputLabel>
          <Select
            label="Orden por precio"
            name="priceOrder"
            value={orderDirection}
            onChange={handlePriceOrderInput}
          >
            <MenuItem className={style.select_item} value="ASC">
              Ascendente
            </MenuItem>
            <MenuItem className={style.select_item} value="DSC">
              Descendente
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
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

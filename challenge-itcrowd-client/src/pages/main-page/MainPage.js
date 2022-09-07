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
  getProductsByBrand,
  orderProductsByPrice,
  orderProductsByAlphabet,
} from "../../redux/productSlice";
import { getAllBrands } from "../../redux/brandSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import style from "./style.module.css";

export default function MainPage() {
  const products = useSelector((state) => state.products.products);
  const brands = useSelector((state) => state.brands.brands);
  const dispatch = useDispatch();

  const [priceOrderDirection, setPriceOrderDirection] = useState("");
  const [alphabetDirection, setAlphabetDirection] = useState("");

  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(4);

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const pagesTotal = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllBrands());
  }, [dispatch]);

  const handlePriceOrderInput = (e) => {
    if (e.target.value !== "n") {
      setPriceOrderDirection(e.target.value);
      dispatch(orderProductsByPrice(e.target.value));
    } else {
      dispatch(getAllProducts());
    }
  };

  const handleAlphabetOrderInput = (e) => {
    if (e.target.value !== "n") {
      setAlphabetDirection(e.target.value);
      dispatch(orderProductsByAlphabet(e.target.value));
    } else {
      dispatch(getAllProducts());
    }
  };

  const handleFilterByBrands = (e) => {
    if (e.target.value !== "todas") {
      dispatch(getProductsByBrand(e.target.value));
    } else {
      dispatch(getAllProducts());
    }
  };

  return (
    <Paper className={style.main_page_container} elevation={3}>
      <Typography variant="h4" className={style.main_page_title}>
        PRODUCTS:
      </Typography>
      <Box
        sx={{
          width: "70vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormControl className={style.select}>
          <InputLabel>Orden alfabético</InputLabel>
          <Select
            label="Orden alfabético"
            name="alphabeticOrder"
            defaultValue="N"
            value={alphabetDirection}
            onChange={handleAlphabetOrderInput}
          >
            <MenuItem className={style.select_item} value="N">
              Ninguno
            </MenuItem>
            <MenuItem className={style.select_item} value="ASC">
              Ascendente
            </MenuItem>
            <MenuItem className={style.select_item} value="DSC">
              Descendente
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl className={style.select}>
          <InputLabel>Orden por precio</InputLabel>
          <Select
            label="Orden por precio"
            name="priceOrder"
            defaultValue="N"
            value={priceOrderDirection}
            onChange={handlePriceOrderInput}
          >
            <MenuItem className={style.select_item} value="N">
              Ninguno
            </MenuItem>
            <MenuItem className={style.select_item} value="ASC">
              Ascendente
            </MenuItem>
            <MenuItem className={style.select_item} value="DSC">
              Descendente
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl className={style.select}>
          <InputLabel>Filtrar por marcas</InputLabel>
          <Select
            label="Orden por marcas"
            name="brandFilter"
            defaultValue="todas"
            onChange={handleFilterByBrands}
          >
            <MenuItem value="todas">Todas</MenuItem>
            {brands?.map((brand) => {
              return (
                <MenuItem key={brand.id} value={brand.id}>
                  {brand.name}
                </MenuItem>
              );
            })}
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

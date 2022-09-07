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
import {
  getAllBrands
} from '../../redux/brandSlice'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import style from "./style.module.css";

export default function MainPage() {
  const products = useSelector((state) => state.products.products);
  const brands = useSelector((state) => state.brands.brands);
  console.log(products);
  const dispatch = useDispatch();

  const [orderDirection, setOrderDirection] = useState("");
  const [brandFilter, setbrandFilter] = useState("");

  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(4);

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const pagesTotal = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllBrands())
  }, [dispatch, brandFilter])

  const handlePriceOrderInput = (e) => {
    setOrderDirection(e.target.value);
    dispatch(orderProductsByPrice(orderDirection));
  };

  const handleAlphabetOrderInput = (e) => {
    setOrderDirection(e.target.value);
    dispatch(orderProductsByAlphabet(orderDirection));
  };

  const handleFilterByBrands = (e) => {
    console.log(e.target.value)
    if(e.target.value !== "todas"){
    // setbrandFilter(e.target.value)
    dispatch(getProductsByBrand(e.target.value))
    } else {
      dispatch(getAllProducts());
    }
  }



  return (
    <Paper className={style.main_page_container} elevation={3}>
      <Typography variant="h4" className={style.main_page_title}>
        PRODUCTS:
      </Typography>
      <Box
        sx={{
          width: "70vw",
          display:"flex",
          justifyContent:"center"
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

        <FormControl className={style.select}>
          <InputLabel>Filtrar por marcas</InputLabel>
          <Select
            label="Orden por marcas"
            name="brandFilter"
            value={brandFilter}
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

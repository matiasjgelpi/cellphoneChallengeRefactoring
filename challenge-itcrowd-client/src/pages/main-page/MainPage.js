import { Paper, Typography, Box, Pagination, CircularProgress} from "@mui/material";
import ProductCard from "../../components/product-card/ProductCard";
import { getAllProducts } from "../../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";


export default function MainPage() {
  let products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

console.log(process.env.REACT_APP_GIL);

  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(3);

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const pagesTotal = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Paper
      elevation={3}
      sx={{
        minHeight: "85vh",
        backgroundColor: "lightblue",
        tranparent: true,
        margin: "1rem",
        padding: "0 10% 0 10%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Typography
        variant="h4"
        textAlign="start"
        width="90vw"
        margin="1rem 0 2rem 0"
      >
        Products:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-evenly",
        }}
      >
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

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        <Pagination count={pagesTotal} onChange={(e, page) => setPage(page)} />
      </Box>
    </Paper>
  );
}

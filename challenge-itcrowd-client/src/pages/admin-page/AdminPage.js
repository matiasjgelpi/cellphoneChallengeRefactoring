import { Paper, Box, Button } from "@mui/material";
import ProductForm from "../../components/product-form/ProductForm";
import BrandForm from "../../components/brand-form/BrandForm";
import { useNavigate, Navigate } from "react-router-dom";
import EditDeletePage from "../edit-delete-page/EditDeletePage";
import { Routes, Route } from "react-router-dom";

export default function AdminPage() {
  const navItems = ["Edit Or Delete", "Add Product", "Add Brand"];
  const navigate = useNavigate();

  const handleClick = (item) => {
    const routeItem = item.split(" ").join("");
    navigate(`/admin/${routeItem}`);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        minHeight: "85vh",
        backgroundColor: "lightblue",
        tranparent: true,
        margin: "1rem",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxHeight: "5rem",
          minHeight: "5rem",
          display: "flex",
          backgroundColor: "white",
          color: "black",
          opacity: "0.5",
          justifyContent: "center",
        }}
      >
        {navItems.map((item) => (
          <Button
            key={item}
            sx={{
              color: "black",
              fontWeight: "900",
            }}
            onClick={() => handleClick(item)}
          >
            {item}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          width: "75vw",
        }}
      >
        <Routes>
          <Route path="EditOrDelete/*" element={<EditDeletePage />} />
          <Route path="AddProduct" element={<ProductForm />} />
          <Route path="AddBrand" element={<BrandForm />} />
          <Route path="*" element={<Navigate to="EditOrDelete" />} />
        </Routes>
      </Box>
    </Paper>
  );
}

import { Paper, Box, Button } from "@mui/material";
import ProductForm from "../../components/product-form/ProductForm";
import BrandForm from "../../components/brand-form/BrandForm";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import EditDeletePage from "../edit-delete-page/EditDeletePage";
import EditBrandDetail from "../../components/edit-brand-detail/EditBrandDetail";
import EditProductDetail from "../../components/edit-product-detail/EditProductDetail";
import { Routes, Route } from "react-router-dom";

export default function AdminPage() {
  const navItems = ["Edit Or Delete", "Add Product", "Add Brand"];
  const location = useLocation();
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
        {/* {location.pathname === "/admin/Edit/Delete" && <EditDeletePage />}
        {location.pathname === "/admin/AddProduct" && <ProductForm />}
        {location.pathname === "/admin/AddBrand" && <BrandForm />}
        {location.pathname.includes ("/admin/Edit/Delete/EditBrand/") && <EditBrandDetail />}
        {location.pathname.includes ("/admin/Edit/Delete/EditProduct/") && <EditProductDetail />}      */}
        <Routes>
          <Route path="EditOrDelete/*" element={<EditDeletePage/>}/>
          {/* <Route path="EditBrand/:id" element={<EditBrandDetail />}/>
            <Route path="EditProduct/:id" element={<EditProductDetail/>}/> */}
          
          <Route path="AddProduct" element={<ProductForm />}/>
          <Route path="AddBrand" element={<BrandForm />}/>
          {/* <Route path="EditOrDelete/EditBrand/:id" element={<EditBrandDetail />}/><Route path="Ed
          itOrDelete/EditProduct/:id" element={<EditProductDetail/>}/> */}
          <Route path="*"  element={< Navigate to = "EditOrDelete"  />} />
        </Routes>
        {/* <Routes>
            <Route path="EditBrand/:id" element={<EditBrandDetail />}/>
            <Route path="EditProduct/:id" element={<EditProductDetail/>}/>
          </Routes> */}


         </Box>

      {/* <ProductForm />
      <BrandForm /> */}
    </Paper>
  );
}

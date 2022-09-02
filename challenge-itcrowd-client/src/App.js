import "./App.css";
import MainPage from "./pages/main-page/MainPage";
import ProductDetail from "./components/product-detail/ProductDetail";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import AdminPage from "./pages/admin-page/AdminPage";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="detail/:id" element={<ProductDetail />} />
        <Route path="admin/Edit/Delete" element={<AdminPage />} />
        <Route path="admin/AddProduct" element={<AdminPage />} />
        <Route path="admin/AddBrand" element={<AdminPage />} />
        <Route path="admin/Edit/Delete/EditBrand/:id" element={<AdminPage />} />
        <Route path="admin/Edit/Delete/EditProduct/:id" element={<AdminPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;

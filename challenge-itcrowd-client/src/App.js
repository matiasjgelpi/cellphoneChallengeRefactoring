import "./App.css";
import MainPage from "./components/MainPage";
import ProductDetail from "./components/ProductDetail";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import AdminPage from "./components/AdminPage";
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

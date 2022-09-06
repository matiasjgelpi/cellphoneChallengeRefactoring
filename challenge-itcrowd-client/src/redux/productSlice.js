import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    try {
      const response = await axios("http://localhost:4000/products");
      return response.data;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.msg,
        icon: "error",
      });
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "products/getAllProductDetail",
  async (id) => {
    try {
      const response = await axios(`http://localhost:4000/product/${id}`);

      return response.data;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.msg,
        icon: "error",
      });
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (newProduct) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/product/`,
        newProduct
      );
      Swal.fire({
        title: "Success",
        text: response.data.msg,
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.msg,
        icon: "error",
      });
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (editedProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/product/${editedProduct.id}`,
        editedProduct
      );
      Swal.fire({
        title: "Success",
        text: response.data.msg,
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.msg,
        icon: "error",
      });
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/product/${id}`
      );
      Swal.fire({
        title: "Success",
        text: response.data.msg,
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.msg,
        icon: "error",
      });
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productDetail: {},
    productsStatus: "null",
    productDetailStatus: "null",
    productAddStatus: "null",
    editProductStatus: "null",
    deleteProductStatus: "null",
  },
  reducers: {
    cleanProductDetail: (state) => {
      state.productDetail = {};
    }
  },

  extraReducers: {
    [getAllProducts.pending]: (state, action) => {
      state.productsStatus = "loading";
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.products = [...action.payload];
      state.productsStatus = "success";
    },
    [getAllProducts.rejected]: (state, action) => {
      state.productsStatus = "failed";
    },

    [getProductDetail.pending]: (state, action) => {
      state.productDetailStatus = "loading";
    },
    [getProductDetail.fulfilled]: (state, action) => {
      state.productDetail = { ...action.payload };
      state.productDetailStatus = "success";
    },
    [getProductDetail.rejected]: (state, action) => {
      state.productDetailStatus = "failed";
    },

    [addNewProduct.pending]: (state) => {
      state.productAddStatus = "loading";
    },
    [addNewProduct.fulfilled]: (state) => {
      state.productAddStatus = "success";
    },
    [addNewProduct.rejected]: (state) => {
      state.productAddStatus = "failed";
    },
    [editProduct.pending]: (state) => {
      state.editProductStatus = "loading";
    },
    [editProduct.fulfilled]: (state) => {
      state.editProductStatus = "success";
    },
    [editProduct.rejected]: (state) => {
      state.editProductStatus = "failed";
    },

    [deleteProduct.pending]: (state) => {
      state.deleteProductStatus = "loading";
    },
    [deleteProduct.fulfilled]: (state) => {
      state.deleteProductStatus = "success";
    },
    [deleteProduct.rejected]: (state) => {
      state.deleteProductStatus = "failed";
    },
  },
});

export const {cleanProductDetail} = productsSlice.actions;
export default productsSlice.reducer;

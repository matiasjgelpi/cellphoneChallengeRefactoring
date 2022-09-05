import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF0aWFzamdlbHBpQGdtYWlsLmNvbSIsImVtYWlsIjoibWF0aWFzamdlbHBpQGdtYWlsLmNvbSIsImlzQWRtaW5pc3RyYXRvciI6dHJ1ZSwiaWF0IjoxNjYyMzQ3ODU4LCJleHAiOjE2NjIzNzY2NTh9.QJ0PrC3LS9Ya3yHG1JxTsklWbz4VN2mozMt3nFEaC1A`

export const getAllBrands = createAsyncThunk(
  "brands/getAllbrands",
  async () => {
    try {
      const response = await axios("http://localhost:4000/brands");
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

export const getBrandDetail = createAsyncThunk(
  "brands/getBrandDetail",
  async (id) => {
    try {
      const response = await axios(`http://localhost:4000/brand/${id}`);
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

export const addNewBrand = createAsyncThunk(
  "brand/addNewBrand",
  async (newBrand) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/brand/`,
        newBrand
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

export const editBrand = createAsyncThunk(
  "brand/editBrand",
  async (editedBrand) => {

    try {
      const response = await axios.put(
        `http://localhost:4000/brand/${editedBrand.id}?`,editedBrand     
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

export const deleteBrand = createAsyncThunk("brand/deleteBrand", async (id) => {
  try {
    const response = await axios.delete(`http://localhost:4000/brand/${id}`);
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
});

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    brandDetail: {},
    brandsStatus: "null",
    brandDetailStatus: "null",
    brandAddStatus: "null",
    editBrandStatus: "null",
    deleteBrandStatus: "null",
  },
  extraReducers: {
    [getAllBrands.pending]: (state, action) => {
      state.brandsStatus = "loading";
    },
    [getAllBrands.fulfilled]: (state, action) => {
      state.brands = [...action.payload];
      state.brandsStatus = "success";
    },
    [getAllBrands.rejected]: (state, action) => {
      state.brandsStatus = "failed";
    },
    [getBrandDetail.pending]: (state, action) => {
      state.brandDetailStatus = "loading";
    },
    [getBrandDetail.fulfilled]: (state, action) => {
      state.brandDetail = { ...action.payload };
      state.brandDetailStatus = "success";
    },
    [getBrandDetail.rejected]: (state, action) => {
      state.brandDetailStatus = "failed";
    },
    [addNewBrand.pending]: (state) => {
      state.brandAddStatus = "loading";
    },
    [addNewBrand.fulfilled]: (state) => {
      state.brandAddStatus = "success";
    },
    [addNewBrand.rejected]: (state) => {
      state.brandAddStatus = "failed";
    },
    [editBrand.pending]: (state) => {
      state.editBrandStatus = "loading";
    },
    [editBrand.fulfilled]: (state) => {
      state.editBrandStatus = "success";
    },
    [editBrand.rejected]: (state) => {
      state.editBrandStatus = "failed";
    },
    [deleteBrand.pending]: (state) => {
      state.deleteBrandStatus = "loading";
    },
    [deleteBrand.fulfilled]: (state) => {
      state.deleteBrandStatus = "success";
    },
    [deleteBrand.rejected]: (state) => {
      state.deleteBrandStatus = "failed";
    },
  },
});

export default brandSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const login = createAsyncThunk(
    "user/login",
    async () => {
      try {
        const response = await axios("http://localhost:4000/user");
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

const userSlice = createSlice({
    name: "brands",
    initialState: {
      user: {},
   
    },
    extraReducers: {
      [login.pending]: (state, action) => {
        state.brandsStatus = "loading";
      },
      [login.fulfilled]: (state, action) => {
        state.user = action.payload;
        state.brandsStatus = "success";
      },
      [login.rejected]: (state, action) => {
        state.brandsStatus = "failed";
      },
     
    },
  });
  
  export default userSlice.reducer;
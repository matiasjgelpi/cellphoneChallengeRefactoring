import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const login = createAsyncThunk(
    "user/login",
    async (user) => {
      try {
        
        const loggedUser = {
            name : user.name,
            email: user.email,
            isAdministrator: false
        }
        
        const response = await axios.post("http://localhost:4000/user", loggedUser);
        localStorage.setItem('token', response.data.token)
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
    name: "user",
    initialState: {
      user: {},
   
    },
    extraReducers: {
      [login.pending]: (state, action) => {
        state.userloginStatus = "loading";
      },
      [login.fulfilled]: (state, action) => {
        const {name, isAdministrator} = action.payload.user
        const {token} = action.payload
        
        state.user = {name, isAdministrator, token};
        state.userloginStatus = "success";
      },
      [login.rejected]: (state, action) => {
        state.userloginStatus = "failed";
      },
     
    },
  });
  
  export default userSlice.reducer;
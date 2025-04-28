import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { useSyncExternalStore } from "react";
const initialState = {
    isAuthentiacated: false,
    isLoading : false,
    user : null

};
export const registerUser = createAsyncThunk('/auth/register', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', formData, { withCredentials: true });
        console.log("Thunk : ", response.data);
        return response.data;  
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: "Network Error" });
        }
    }
});
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser : (state,action) =>{
            
        },
    },
    extraReducers : (builder) => {
        builder.addCase(registerUser.pending,(state)=>{
           state.isLoading = true;

        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthentiacated = false;
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthentiacated = false;
        })
    }
})
export const {setUser} = authSlice.actions;
export default authSlice.reducer;
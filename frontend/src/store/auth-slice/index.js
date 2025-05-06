import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
const initialState = {
    isAuthenticated: false,
    isLoading : true,
    user : null

};
export const registerUser = createAsyncThunk('/auth/register', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', formData, { withCredentials: true });
        return response.data;  
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: "Network Error" });
        }
    }
});
export const loginUser = createAsyncThunk('/auth/login', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', formData, { withCredentials: true });
        return response.data;  
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: "Network Error" });
        }
    }
});
export const checkAuth = createAsyncThunk('/auth/checkAuth', async () => {
        const response = await axios.get('http://localhost:5000/api/auth/check-auth',
            { withCredentials: true, 
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate'
                }
        });
        return response.data;  
});
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser : () =>{
            
        },
    },
    extraReducers : (builder) => {
        builder.addCase(registerUser.pending,(state)=>{
           state.isLoading = true;

        }).addCase(registerUser.fulfilled,(state)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(registerUser.rejected,(state)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
 
         }).addCase(loginUser.fulfilled,(state,action)=>{
             state.isLoading = false;
             state.user = action.payload.success ? action.payload?.user : null;
             state.isAuthenticated = action.payload.success ? true :   false;
         }).addCase(loginUser.rejected,(state)=>{
             state.isLoading = false;
             state.user = null;
             state.isAuthenticated = false;
         }).addCase(checkAuth.pending,(state)=>{
            state.isLoading = true;
 
         }).addCase(checkAuth.fulfilled,(state,action)=>{
             state.isLoading = false;
             state.user = action.payload.success ? action.payload?.user : null;
             state.isAuthenticated = action.payload.success ? true :   false;
         }).addCase(checkAuth.rejected,(state)=>{
             state.isLoading = false;
             state.user = null;
             state.isAuthenticated = false;
         })
    }
})
export const {setUser} = authSlice.actions;
export default authSlice.reducer;
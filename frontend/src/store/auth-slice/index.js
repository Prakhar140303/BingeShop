import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "@/lib/axiosInstance";
import { Trophy } from "lucide-react";
const initialState = {
    isAuthenticated: false,
    isLoading : true,
    isLoadingAddress : true,
    user : null,
    addresses : []

};
export const registerUser = createAsyncThunk('/auth/register', async (formData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/auth/signup`, formData, { withCredentials: true });
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
        const response = await axiosInstance.post('/auth/login', formData, { withCredentials: true });
        return response.data;  
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: "Network Error" });
        }
    }
});
export const logoutUser = createAsyncThunk('/auth/logout', async (_,{rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/auth/logout', {},{ withCredentials: true });
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
    const response = await axiosInstance.get('/auth/check-auth',
        { withCredentials: true, 
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate'
            }
        });
        return response.data;  
    });

export const terminateAccount = createAsyncThunk('/auth/terminate', async (_,{getState,rejectWithValue}) => {
    try{
        const {user}= getState().auth;
        console.log({user}, "user in terminateAccount");
        const userId = user.id;
        const response = await axiosInstance.delete(`/auth/terminate-account/${userId}`,{ withCredentials: true });
        return response.data;
    }catch(error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: "Network Error" });
        }
    }
});

export const getAddress = createAsyncThunk('/auth/address/get-address', async (_,{getState,rejectWithValue}) => {
    try{
        const {user}= getState().auth;
        console.log({user}, "user in getAddress");
        const response = await axiosInstance.get('/auth/address/get-address', { params:{
            userId : user.id
        }, withCredentials: true });
        return response.data;
    }catch(error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: "Network Error" });
        }
    }
});
export const  addAddress = createAsyncThunk('/auth/address/add-address', async (formData, { getState,rejectWithValue }) => {
    try {const {user} = getState().auth;
        const response = await axiosInstance.post('/auth/address/add-address', { user : user ,address : formData}, { withCredentials: true });
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
         .addCase(logoutUser.fulfilled,(state)=>{
             state.isLoading = false;
             state.user = null;
             state.isAuthenticated = false;
         })
         .addCase(terminateAccount.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(terminateAccount.fulfilled, (state ) => {
            state.isLoading = false;
            state.user = null;             // user deleted
            state.isAuthenticated = false; // no longer logged in
        })
        .addCase(terminateAccount.rejected, (state) => {
            state.isLoading = false;
            // keep the user data if termination failed
        })
         .addCase(getAddress.pending,(state)=>{
             state.isLoadingAddress = true;
             state.addresses =[];
            })
         .addCase(getAddress.rejected,(state)=>{
             state.isLoadingAddress = false;
             state.addresses =[];
            })
            .addCase(getAddress.fulfilled,(state,action)=>{
                state.isLoadingAddress = false;
                state.addresses = action.payload.data;
         })
         .addCase(addAddress.pending,(state)=>{
             state.isLoadingAddress = true;
             state.addresses =[];
            })
         .addCase(addAddress.rejected,(state)=>{
             state.isLoadingAddress = false;
             state.addresses =[];
            })
            .addCase(addAddress.fulfilled,(state,action)=>{
                state.isLoadingAddress = false;
                state.addresses = action.payload.data;
         })
    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;
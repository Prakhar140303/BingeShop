import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoading : false,
    productList : [],

}
export const addNewProduct = createAsyncThunk('/product/add', async (formData) => {
    const result = await axiosInstance.post('/admin/products/add', formData,{
        headers : {
            'Content-Type' : 'application/json'
        }
    });
    return result?.data;
})
export const fetchAllProducts = createAsyncThunk('/product/fetchAllProducts', async () => {
    const result = await axiosInstance.get('/admin/products/getAll');
    console.log("result :",result.data);
    console.log("result2 :",result.data.data);
    return result?.data;
})
export const editProduct = createAsyncThunk('/product/editProduct', async ({id,formData}) => {
    console.log("edit form data : ",formData);
    const result = await axiosInstance.put(`/admin/products/edit/${id}`, formData,{
        headers : {
            'Content-Type' : 'application/json'
        }
    });
    return result?.data;
})
export const deleteProduct = createAsyncThunk('/product/delete', async (id) => {
    const result = await axiosInstance.delete(`/admin/products/delete/${id}`,{
        headers : {
            'Content-Type' : 'application/json'
        }
    });
    return result?.data;
})

const AdminProductSlice = createSlice({
    name : 'adminProducts',
    initialState : initialState,
    reducers : {},
    extraReducers :(builder) => {
        builder.addCase(fetchAllProducts.pending,(state) => {
            state.isLoading = true;
        }).addCase(fetchAllProducts.fulfilled,(state,action) => {
            state.isLoading = false;
            state.productList = action.payload.data;
        }).addCase(fetchAllProducts.rejected,(state) => {
            state.isLoading = false;
            state.productList = [];
        })
    }
})
export default AdminProductSlice.reducer;
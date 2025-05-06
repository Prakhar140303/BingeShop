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
    return result?.data;
})
export const editProduct = createAsyncThunk('/product/editProduct', async ({id,formData}) => {
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
            console.log(action)
            state.isLoading = false;
            state.productList = action.payload.products;
        }).addCase(fetchAllProducts.rejected,(state) => {
            state.isLoading = false;
            state.productList = [];
        })
    }
})
export default AdminProductSlice.reducer;
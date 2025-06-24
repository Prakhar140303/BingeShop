import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';


const initialState = {
    isProductLoading : false,
    FilteredProductList : [],
}
export const fetchAllFitteredProducts = createAsyncThunk('/product/fetchAllProducts', async () => {
    const result = await axiosInstance.get('/shop/products/get');
    return result?.data;
})

 
const shopProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState : initialState,
    reducers : {},
    extraReducers :(builder) =>{
        builder.addCase(fetchAllFitteredProducts.pending,(state) => {
            state.isLoading = true;
        }).addCase(fetchAllFitteredProducts.fulfilled,(state,action) => {
            state.isLoading = false;
            state.FilteredProductList = action.payload.data;
        }).addCase(fetchAllFitteredProducts.rejected,(state) => {
            state.isLoading = false;
            state.FilteredProductList = [];
        })
    }
})
export default shopProductSlice.reducer 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';


const initialState = {
    isProductLoading : false,
    FilteredProductList : [],
    totalPages :0
}
export const fetchAllFitteredProducts = createAsyncThunk('/product/fetchAllProducts', async ({filters,SortType,page,limit}) => {
    const result = await axiosInstance.post('/shop/products/get',{filters,SortType,page,limit});
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
            state.totalPages = action.payload.totalPages
        }).addCase(fetchAllFitteredProducts.rejected,(state) => {
            state.isLoading = false;
            state.FilteredProductList = [];
            state.totalPages = 0
        })
    }
})
export default shopProductSlice.reducer 
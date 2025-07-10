import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';


const initialState = {
    isProductLoading : false,
    isLoadingCart : false,
    FilteredProductList : [],
    allProduct :[],
    cartProduct :[],
    totalPages :0
}
export const fetchAllFitteredProducts = createAsyncThunk('/product/fetchAllFilteredProducts', async ({filters,SortType,page,limit},thunkAPI) => {
    try{
        const result = await axiosInstance.post('/shop/products/get',{filters,SortType,page,limit});
        return result?.data;
        
    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});


export const fetchAllProduct = createAsyncThunk('/product/fetchAllProducts', async (_,thunkAPI) => {
    try{
        const result = await axiosInstance.get('/shop/products/get');
        return result?.data;
    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const fetchCartProduct = createAsyncThunk('/product/fetchAllCartProduct', async ({userId},thunkAPI) => {
    try{
        if(!userId) {
            return thunkAPI.rejectWithValue('Missing user ID for fetching cart');
       }
        console.log('in fetch',userId)
        const result = await axiosInstance.get(`/shop/products/cart/get/${userId}`);
        console.log('data in fetchAllCartProduct',result.data);
        return result?.data;
        

    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const addCartProduct = createAsyncThunk('/product/addCartProduct', async ({userId,productId},thunkAPI) => {
    try{
        const result = await axiosInstance.post('/shop/products/cart/add',{userId,productId});
        return result?.data;

    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const deleteCartProduct = createAsyncThunk('/product/deleteCartProduct', async ({cartProductId},thunkAPI) => {
    try{
        const result = await axiosInstance.delete(`/shop/products/cart/delete/${cartProductId}`,{
             headers : {
                'Content-Type' : 'application/json'
            }
        });
        return result?.data;

    }
    catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

 
const shopProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState : initialState,
    reducers : {},
    extraReducers :(builder) =>{
        builder.addCase(fetchAllFitteredProducts.pending,(state) => {
            state.isProductLoading = true;
        }).addCase(fetchAllFitteredProducts.fulfilled,(state,action) => {
            state.isProductLoading = false;
            state.FilteredProductList = action.payload.data;
            state.totalPages = action.payload.totalPages
        }).addCase(fetchAllFitteredProducts.rejected,(state) => {
            state.isProductLoading = false;
            state.FilteredProductList = [];
            state.totalPages = 0
        })
        .addCase(fetchAllProduct.pending,(state) => {
            state.isProductLoading = true;
        }).addCase(fetchAllProduct.fulfilled,(state,action) => {
            state.isProductLoading = false;
            state.allProduct = action.payload.data;
        }).addCase(fetchAllProduct.rejected,(state) => {
            state.isProductLoading = false;
            state.allProduct = [];
        })
        .addCase(fetchCartProduct.pending,(state) => {
            state.isLoadingCart = true;
        }).addCase(fetchCartProduct.fulfilled,(state,action) => {
            state.isLoadingCart = false;
            state.cartProduct = action.payload.data;
        }).addCase(fetchCartProduct.rejected,(state) => {
            state.isLoadingCart = false;
            state.cartProduct = [];
        })
    }
})
export default shopProductSlice.reducer 
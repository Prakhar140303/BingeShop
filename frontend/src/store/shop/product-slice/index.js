import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';

const initialState = {
  isProductLoading: false,
  FilteredProductList: [],
  allProduct: [],
  cartProduct: [],
  totalPages: 0,
  loadingProductId: null // <-- Added for per-product loading
};

export const fetchAllFilteredProducts = createAsyncThunk(
  '/product/fetchAllFilteredProducts',
  async ({ filters, SortType, page, limit }, thunkAPI) => {
    try {
      const result = await axiosInstance.post('/shop/products/get', { filters, SortType, page, limit });
      return result?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchAllProduct = createAsyncThunk(
  '/product/fetchAllProducts',
  async (_, thunkAPI) => {
    try {
      const result = await axiosInstance.get('/shop/products/get');
      return result?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchCartProduct = createAsyncThunk(
  '/product/fetchAllCartProduct',
  async ({ userId }, thunkAPI) => {
    try {
      if (!userId) {
        return thunkAPI.rejectWithValue('Missing user ID for fetching cart');
      }
      const result = await axiosInstance.get(`/shop/products/cart/get/${userId}`);
      return result?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addCartProduct = createAsyncThunk(
  '/product/addCartProduct',
  async ({ userId, productId }, thunkAPI) => {
    try {
      const result = await axiosInstance.post('/shop/products/cart/add', { userId, productId });
      return result?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  '/product/deleteCartProduct',
  async ({ cartProductId }, thunkAPI) => {
    try {
      const result = await axiosInstance.delete(`/shop/products/cart/delete/${cartProductId}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      return result?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const shopProductSlice = createSlice({
  name: 'shoppingProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FILTERED PRODUCTS
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.FilteredProductList = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isProductLoading = false;
        state.FilteredProductList = [];
        state.totalPages = 0;
      })

      // ALL PRODUCTS
      .addCase(fetchAllProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.allProduct = action.payload.data;
      })
      .addCase(fetchAllProduct.rejected, (state) => {
        state.isProductLoading = false;
        state.allProduct = [];
      })

      // CART PRODUCTS
      .addCase(fetchCartProduct.fulfilled, (state, action) => {
        state.cartProduct = action.payload.data;
      })

      // ADD CART PRODUCT
      .addCase(addCartProduct.pending, (state, action) => {
        state.loadingProductId = action.meta.arg.productId; // Track specific product
      })
      .addCase(addCartProduct.fulfilled, (state, action) => {
        const newItem = action.payload.data;
        const idx = state.cartProduct.findIndex(i => i._id === newItem._id);
        if (idx >= 0) {
          state.cartProduct[idx] = newItem;
        } else {
          state.cartProduct.push(newItem);
        }
        state.loadingProductId = null; // Reset after success
      })
      .addCase(addCartProduct.rejected, (state) => {
        state.loadingProductId = null; // Reset on error
      })

      // DELETE CART PRODUCT
      .addCase(deleteCartProduct.pending, (state, action) => {
        const cartItem = state.cartProduct.find(i => i._id === action.meta.arg.cartProductId);
        state.loadingProductId = cartItem ? cartItem.productId._id : null;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        const returned = action.payload.data;
        if (returned && returned._id) {
          const idx = state.cartProduct.findIndex(i => i._id === returned._id);
          if (idx >= 0) {
            state.cartProduct[idx].quantity = returned.quantity;
          }
        } else {
          const removedId = action.meta.arg.cartProductId;
          state.cartProduct = state.cartProduct.filter(i => i._id !== removedId);
        }
        state.loadingProductId = null;
      })
      .addCase(deleteCartProduct.rejected, (state) => {
        state.loadingProductId = null;
      });
  }
});

export default shopProductSlice.reducer;

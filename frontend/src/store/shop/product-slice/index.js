import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';

const initialState = {
  isProductLoading: false,
  isLoadingCart: false,
  FilteredProductList: [],
  allProduct: [],
  cartProduct: [],
  totalPages: 0
};

export const fetchAllFitteredProducts = createAsyncThunk(
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
      .addCase(fetchAllFitteredProducts.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(fetchAllFitteredProducts.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.FilteredProductList = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllFitteredProducts.rejected, (state) => {
        state.isProductLoading = false;
        state.FilteredProductList = [];
        state.totalPages = 0;
      })

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

      .addCase(fetchCartProduct.pending, (state) => {
        state.isLoadingCart = true;
      })
      .addCase(fetchCartProduct.fulfilled, (state, action) => {
        state.isLoadingCart = false;
        state.cartProduct = action.payload.data;
      })
      .addCase(fetchCartProduct.rejected, (state) => {
        state.isLoadingCart = false;
        state.cartProduct = [];
      })

      // ─── NEW: handle addCartProduct.fulfilled ─────────────────────────────────
      .addCase(addCartProduct.fulfilled, (state, action) => {
        const newItem = action.payload.data;
        const idx = state.cartProduct.findIndex(i => i._id === newItem._id);
        if (idx >= 0) {
          state.cartProduct[idx] = newItem;
        } else {
          state.cartProduct.push(newItem);
        }
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
      });
  }
});

export default shopProductSlice.reducer;

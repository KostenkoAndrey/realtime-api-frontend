import { createSlice } from '@reduxjs/toolkit';
import { logoutThunk } from '../auth/operations';
import { fetchStocks } from '@/redux/stock/operations';
import { Stock } from '@/types/stock';

export interface StocksState {
  items: Stock[];
  loading: boolean;
  error: string | null;
}

export const initialState: StocksState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load stocks';
      })
      .addCase(logoutThunk.fulfilled, () => initialState);
  },
});

export const stocksReducer = slice.reducer;

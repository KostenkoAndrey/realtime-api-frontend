import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StocksResponse } from '@/types/stock';

export const ApiStocks = axios.create({
  baseURL: 'https://realtime-api-backend.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const fetchStocks = createAsyncThunk<StocksResponse, void, { rejectValue: string }>(
  'stocks/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await ApiStocks.get<StocksResponse>('/stock/info');
      return data;
    } catch (error) {
      const e = error as AxiosError<{ message?: string }>;
      const message = e.response?.data?.message || e.message || 'Failed to fetch stocks';

      if (e.response?.status === 401) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }

      return thunkAPI.rejectWithValue(message);
    }
  },
);

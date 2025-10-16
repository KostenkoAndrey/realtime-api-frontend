import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { SignUpFormData, AuthResponse, LoginFormData, RequestEmail, GoogleFormData } from '@/types/auth';
import { config } from '@/config/api';

export const ApiAuth = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

export const registerThunk = createAsyncThunk<AuthResponse, SignUpFormData, { rejectValue: string }>(
  'auth/signup',
  async (credentials, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await ApiAuth.post<{
        status: number;
        message: string;
        data: AuthResponse;
      }>('/auth/register', credentials);
      toast.success('Registration successful! Please log in.');
      return data;
    } catch (error) {
      const e = error as AxiosError<{ status?: number; message?: string }>;
      if (e.response?.status === 409) {
        toast.error('User already exists');
      }
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const loginThunk = createAsyncThunk<AuthResponse, LoginFormData, { rejectValue: string }>(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await ApiAuth.post<{
        status: number;
        message: string;
        data: AuthResponse;
      }>('/auth/login', credentials);
      return data;
    } catch (error) {
      const e = error as AxiosError<{ status?: number; message?: string }>;
      if (e.response?.status === 401) {
        toast.error('Unauthorized');
      } else if (e.response?.status === 404) {
        toast.error('User not found');
      }
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>('auth/logout', async (_, thunkAPI) => {
  try {
    await ApiAuth.post('/auth/logout');
    return;
  } catch (error) {
    const e = error as AxiosError;
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const authenticateWithGoogleThunk = createAsyncThunk<string, void, { rejectValue: string }>(
  'auth/get-oauth-url',
  async (_, thunkAPI) => {
    try {
      const { data } = await ApiAuth.get('/auth/get-oauth-url');
      return data.data.url;
    } catch (error) {
      const e = error as AxiosError;
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const confirmGoogleAuthThunk = createAsyncThunk<AuthResponse, GoogleFormData, { rejectValue: string }>(
  'auth/confirm-oauth',
  async ({ code }, thunkAPI) => {
    try {
      const { data } = await ApiAuth.post<{
        status: number;
        message: string;
        data: AuthResponse;
      }>('/auth/confirm-oauth', { code });
      return data.data;
    } catch (error) {
      console.error('❌ Error in confirmGoogleAuthThunk:', error);
      const e = error as AxiosError;
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const resetPasswordThunk = createAsyncThunk<{ message: string }, RequestEmail, { rejectValue: string }>(
  'auth/request-reset-email',
  async ({ email }, thunkAPI) => {
    try {
      const { data } = await ApiAuth.post<{
        status: number;
        message: string;
      }>('/auth/request-reset-email', { email });
      toast.success('Reset password email was successfully sent!');
      return { message: data.message };
    } catch (error) {
      const e = error as AxiosError<{ message?: string }>;
      toast.error(e.response?.data?.message || 'User not found');
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

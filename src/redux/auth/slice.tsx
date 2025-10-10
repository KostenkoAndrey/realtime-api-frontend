import { createSlice } from '@reduxjs/toolkit';
import { confirmGoogleAuthThunk, loginThunk, logoutThunk } from './operations';
import { AuthState } from '@/types/auth';

const initialState: AuthState = {
  user: {
    name: null,
    email: null,
  },
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.isLoggedIn = true;
      })
      .addCase(confirmGoogleAuthThunk.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      });

    // .addCase(refreshThunk.fulfilled, (state, action) => {
    //   state.user.name = action.payload.name;
    //   state.user.email = action.payload.email;
    //   state.isLoggedIn = true;
    //   state.isRefreshing = false;
    // })
    // .addCase(refreshThunk.pending, (state) => {
    //   state.isRefreshing = true;
    // })
    // .addCase(refreshThunk.rejected, (state) => {
    //   state.isRefreshing = false;
    // });
  },
});

export const authReducer = slice.reducer;

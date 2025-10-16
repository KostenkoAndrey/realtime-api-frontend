import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    country: '',
    symbolOrName: '',
  },
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeCountry: (state, actions) => {
      state.filters.country = actions.payload;
    },
    changeSymbolOrName: (state, actions) => {
      state.filters.symbolOrName = actions.payload;
    },
  },
});

export const filtersReducer = slice.reducer;
export const { changeCountry } = slice.actions;
export const { changeSymbolOrName } = slice.actions;

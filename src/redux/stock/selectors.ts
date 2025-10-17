import { RootState } from '../store';
export const selectStocks = (state: RootState) => state.stocks.items;
export const selectLoading = (state: RootState) => state.stocks.loading;

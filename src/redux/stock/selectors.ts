import { RootState } from '../store';
export const selectStocks = (state: RootState) => state.stocks.items;

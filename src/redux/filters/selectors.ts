import { createSelector } from '@reduxjs/toolkit';
import { selectStocks } from '@/redux/stock/selectors';
import { RootState } from '../store';

export const selectCountryFilter = (state: RootState) => state.filters.filters.country;
export const selectSymbolOrNameFilter = (state: RootState) => state.filters.filters.symbolOrName;
export const selectFilteredContacts = createSelector(
  [selectStocks, selectCountryFilter, selectSymbolOrNameFilter],
  (stocks, filterByCountry, filterBySymbolOrName) => {
    if (!Array.isArray(stocks)) {
      return [];
    }

    return stocks.filter((stock) => {
      const matchesCountry = filterByCountry
        ? stock.locale.toLowerCase().includes(filterByCountry.toLowerCase())
        : true;

      const matchesSymbolOrName = filterBySymbolOrName
        ? stock.symbol.toLowerCase().includes(filterBySymbolOrName.toLowerCase()) ||
          stock.name.toLowerCase().includes(filterBySymbolOrName.toLowerCase())
        : true;

      return matchesCountry && matchesSymbolOrName;
    });
  },
);

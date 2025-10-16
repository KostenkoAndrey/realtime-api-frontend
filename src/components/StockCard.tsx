import React from 'react';

import { StockCardProps } from '@/types/stock';
import { formatMarketCap } from '@/utils/formatMarketCap';

const StockCard = ({ stocks }: StockCardProps) => {
  return (
    <table className='m-auto mt-[86px] w-full text-white text-center text-[1em] !border-separate border-spacing-y-[25px]'>
      <thead>
        <tr className='text-[0.875rem]'>
          <th className='w-12 text-center'>#</th>
          <th className='w-24 text-center'>Symbol</th>
          <th className='w-24 text-center'>Country</th>
          <th className='text-center'>Name</th>
          <th className='w-40 text-center'>Market Cap</th>
          <th className='w-32 text-center'>Price</th>
          <th className='w-32 text-center'>Daily Change</th>
          <th className='w-32 text-center'>Monthly Change</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock, i) => (
          <tr key={i} className='hover:bg-gray-700 transition'>
            <td className='font-medium text-center'>{i + 1}</td>
            <td className='font-bold text-blue-400 text-center'>{stock.symbol}</td>
            <td className='font-bold text-blue-400 text-center'>{stock.locale.toUpperCase()}</td>
            <td className='text-center px-4'>{stock.name}</td>
            <td className='text-center tabular-nums'>{formatMarketCap(stock.market_cap)}</td>
            <td className='text-center tabular-nums font-semibold'>${stock.price.toFixed(2)}</td>
            <td
              className={`text-center tabular-nums font-semibold ${
                stock.dailyChange > 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {stock.dailyChange > 0 ? '+' : ''}
              {stock.dailyChange.toFixed(2)}%
            </td>
            <td
              className={`text-center tabular-nums font-semibold ${
                stock.monthlyChange > 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {stock.monthlyChange > 0 ? '+' : ''}
              {stock.monthlyChange.toFixed(2)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockCard;

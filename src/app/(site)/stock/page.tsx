'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import { Pagination } from '@heroui/pagination';

import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import { fetchStocks } from '@/redux/stock/operations';
import { changeCountry, changeSymbolOrName } from '@/redux/filters/slice';
import { selectCountryFilter, selectFilteredContacts, selectSymbolOrNameFilter } from '@/redux/filters/selectors';

import StockCard from '@/components/StockCard';
import { pagination } from '@/utils/pagination';
import { INPUT_STYLES, ITEMS_PER_PAGE } from '@/constants';
import { selectLoading } from '@/redux/stock/selectors';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const filtered = useAppSelector(selectFilteredContacts);
  const country = useAppSelector(selectCountryFilter);
  const symbolOrName = useAppSelector(selectSymbolOrNameFilter);
  const isLoading = useAppSelector(selectLoading);

  const { currentItems: currentStocks, totalPages } = pagination(filtered, currentPage, ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [country, symbolOrName]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className='max-w-[282px] m-auto flex flex-col gap-7 mt-8'>
        <Input
          placeholder='Enter your country'
          value={country}
          onChange={(e) => dispatch(changeCountry(e.target.value))}
          isClearable
          onClear={() => dispatch(changeCountry(''))}
          classNames={INPUT_STYLES}
          radius='full'
          size='lg'
        />

        <Input
          placeholder='Enter symbol or name'
          value={symbolOrName}
          onChange={(e) => dispatch(changeSymbolOrName(e.target.value))}
          isClearable
          onClear={() => dispatch(changeSymbolOrName(''))}
          classNames={INPUT_STYLES}
          radius='full'
          size='lg'
        />
      </div>
      {isLoading ? (
        <div className='m-auto text-center text-white py-8 text-2xl'>Loading...</div>
      ) : (
        <>
          <StockCard stocks={currentStocks} />
          {totalPages > 1 && (
            <div className='flex justify-center py-8'>
              <Pagination
                loop
                color='primary'
                total={10}
                page={currentPage}
                onChange={handlePageChange}
                showControls
                size='lg'
                classNames={{
                  wrapper: 'gap-4 bg-transparent',
                  item: `w-14 h-14 text-xl font-semibold transition-all duration-300 flex items-center justify-center rounded-2xl
                  text-white cursor-pointer hover:scale-105 data-[active=true]:bg-blue-600 data-[active=true]:shadow-[0_0_20px_rgba(37,99,235,0.8)]
                  data-[active=true]:text-white data-[active=true]:scale-110`,
                  prev: 'text-white cursor-pointer',
                  next: 'text-white cursor-pointer',
                }}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Page;

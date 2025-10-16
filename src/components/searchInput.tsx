import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface SearchInputProps {
  label: string;
  register?: UseFormRegisterReturn;
  error?: string;
  className?: string;
}

const SearchInput = ({ label, register, error, className }: SearchInputProps) => {
  return (
    <div className='text-[1em] w-full text-white leading-[1.42]'>
      <input
        id={label}
        type='text'
        placeholder={label}
        {...register}
        className='w-full py-1 px-5 border-2 border-[#a1a1aa] rounded-2xl font-normal text-[0.875rem]
        placeholder:font-normal placeholder:text-[0.875rem] placeholder-white outline-none'
      />
      <label htmlFor={label} className='hidden'>
        {label}
      </label>
    </div>
  );
};

export default SearchInput;

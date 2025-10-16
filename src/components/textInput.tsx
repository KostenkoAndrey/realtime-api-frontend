'use client';

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface TextInputProps {
  type?: 'text' | 'email';
  label: string;
  isRequired?: boolean;
  register?: UseFormRegisterReturn;
  error?: string;
  className?: string;
}

const TextInput = ({
  type = 'text',
  label,
  isRequired,
  register,
  error,
  className,
}: TextInputProps) => {
  return (
    <div className='relative text-[1em] w-full'>
      <input
        id={label}
        type={type}
        placeholder=' '
        {...register}
        className={`peer w-full font-normal text-[0.85em] text-[#d4d4d8] bg-[#27272a] leading-[1.68] rounded-[14px] border-2 ${className}
        ${error ? 'border-[#F31260]' : 'border-[#4b4b50]'} px-[10px] py-4 focus:border-[#006fee] focus:ring-2 focus:ring-[#006fee]/40
        transition-all duration-200 outline-none custom-shadow`}
      />
      <label
        htmlFor={label}
        className={`
      absolute left-3 text-[#9ca3af] text-[0.8rem] font-medium leading-[1.68]
      transition-all duration-200 pointer-events-none
      top-5 peer-focus:top-1 peer-focus:text-[#006fee] peer-focus:text-[0.65rem]
      peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-[0.65rem]
      peer-[&:not(:placeholder-shown)]:text-[#9ca3af]
    `}
      >
        {label}
        {isRequired && <span className='text-[#F31260] ml-1'>*</span>}
      </label>
      {error && (
        <p className='text-red-500 text-[0.75rem] mt-1 transition-all duration-150'>{error}</p>
      )}
    </div>
  );
};

export default TextInput;

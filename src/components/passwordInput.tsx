'use client';

import React, { useState } from 'react';
import SvgIcon from '@/components/svgIcon';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  label: string;
  isRequired: boolean;
  register: UseFormRegisterReturn;
  error?: string;
};

const PasswordInput = ({ label, isRequired, register, error }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className='w-full'>
      <div className='relative w-full'>
        <input
          id={label}
          type={visible ? 'text' : 'password'}
          placeholder=' '
          {...register}
          className={`peer w-full font-normal text-[0.85em] text-[#d4d4d8] bg-[#27272a] leading-[1.68] rounded-[14px] border-2
        ${error ? 'border-[#F31260]' : 'border-[#4b4b50]'} py-4 pl-[10px] pr-10 focus:border-[#006fee] focus:ring-2 focus:ring-[#006fee]/40
        transition-all duration-200 focus:outline-none outline-none custom-shadow`}
        />
        <button
          type='button'
          onClick={(): void => setVisible((prev): boolean => !prev)}
          className='flex justify-center items-center absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1AA]'
        >
          <SvgIcon
            name={visible ? 'EyeOpen' : 'EyeClosed'}
            className={'w-5 h-5 stroke-[#d4d4d8] fill-[#27272a]'}
          />
        </button>
        <label
          htmlFor={label}
          className={`absolute left-3 text-[#9ca3af] text-[0.8rem] font-medium leading-[1.68] transition-all duration-200 pointer-events-none
          top-5 peer-focus:top-1 peer-focus:text-[#006fee] peer-focus:text-[0.65rem] peer-[&:not(:placeholder-shown)]:top-1
          peer-[&:not(:placeholder-shown)]:text-[0.65rem] peer-[&:not(:placeholder-shown)]:text-[#9ca3af]`}
        >
          {label}
          {isRequired && (
            <span className='absolute top-[1px] -right-[10px] text-[#F31260] text-[1.1em]'>
              *
            </span>
          )}
        </label>
      </div>

      {error && (
        <p className='text-red-500 text-[0.75rem] mt-1 transition-all duration-150'>
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;

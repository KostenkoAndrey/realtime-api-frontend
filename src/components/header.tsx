'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { selectorAuthUser } from '@/redux/auth/selectors';
import { logoutThunk } from '@/redux/auth/operations';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import Button from '@/components/button';

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectorAuthUser);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        router.push('/login');
      });
  };

  if (!isClient) return null;

  return (
    <div className='flex justify-end m-auto px-5 py-2 border-b-2 border-[#1f1f1f]'>
      <div className='flex gap-2 justify-center items-center'>
        <div className='text-[#d4d4d8] font-medium text-[14px] leading-[1.42]'>{user?.name || 'Guest'}</div>
        <div className='w-[2px] h-[100%] rounded-full bg-neutral-400' />
        <Button
          onClick={handleLogout}
          className='max-w-[300px] text-white hover:text-black bg-red-800 hover:bg-red-900'
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Header;

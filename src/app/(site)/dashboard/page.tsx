'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';

import { logoutThunk, resetPasswordThunk } from '@/redux/auth/operations';
import { useRouter } from 'next/navigation';
import Button from '@/components/button';
import { selectorAuthUser } from '@/redux/auth/selectors';
import { RestrictedRoute } from '@/components/RestrictedRoute';

const Page = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { email } = useAppSelector(selectorAuthUser);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    await dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        router.push('/login');
      })
      .catch((err) => {
        setIsLoggingOut(false);
        console.error('RESET ERROR:', err);
      })
      .finally(() => {
        setIsLoggingOut(false);
      });
  };

  const handleResetPassword = async () => {
    dispatch(resetPasswordThunk({ email }))
      .unwrap()
      .then(() => {
        router.push('/login');
      })
      .catch((err) => {
        console.error('RESET ERROR:', err);
      });
  };

  return (
    <RestrictedRoute>
      <div className='text-white flex flex-col justify-center items-center gap-6 h-screen'>
        <div className='text-5xl'>DASHBOARD</div>
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className='max-w-[300px] text-white hover:text-black hover:bg-[#007bff]'
        >
          {isLoggingOut ? 'Logging out...' : 'Log out'}
        </Button>
        <Button
          onClick={handleResetPassword}
          className='max-w-[300px] text-white hover:text-black hover:bg-[#007bff]'
        >
          Reset password
        </Button>
      </div>
    </RestrictedRoute>
  );
};

export default Page;

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { LayoutProps } from '@/types/layout';
import Header from '@/components/header';
import Navigation from '@/components/navigation';
import { selectorIsLoggedIn } from '@/redux/auth/selectors';

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isLoggedIn = useAppSelector(selectorIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className='max-w-[1280px] m-auto h-screen'>
        <Navigation />
        {children}
      </div>
    </>
  );
};

export default Layout;

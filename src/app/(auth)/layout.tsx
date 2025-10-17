'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { LayoutProps } from '@/types/layout';
import { selectorIsLoggedIn } from '@/redux/auth/selectors';

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isLoggedIn = useAppSelector(selectorIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return <div className='max-w-[1280px] m-auto flex justify-center items-center h-screen'>{children}</div>;
};

export default Layout;

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { selectorIsLoggedIn } from '@/redux/auth/selectors';

interface RestrictedRouteProps {
  children: React.ReactNode;
}

export const RestrictedRoute: React.FC<RestrictedRouteProps> = ({
  children,
}) => {
  const router = useRouter();
  const isLoggedIn = useAppSelector(selectorIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className='text-white text-3xl h-screen flex items-center justify-center'>
        Проверяем доступ...
      </div>
    );
  }

  return <>{children}</>;
};

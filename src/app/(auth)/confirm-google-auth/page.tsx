'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { confirmGoogleAuthThunk } from '@/redux/auth/operations';
import { useAppDispatch } from '@/hooks/useReduxHooks';

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) return;

    (() => {
      console.log('📤 Отправляем code на бэк:', code);
      dispatch(confirmGoogleAuthThunk({ code }))
        .unwrap()
        .then(() => {
          console.log('✅ Login with Google success!');
          router.push('/dashboard');
        })
        .catch((err) => {
          console.error('❌ Ошибка Google авторизации:', err);
          router.push('/login');
        });
    })();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen text-white text-3xl'>
      Авторизация через Google...
    </div>
  );
};

export default Page;

'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { confirmGoogleAuthThunk } from '@/redux/auth/operations';
import { useAppDispatch } from '@/hooks/useReduxHooks';

let isProcessing = false;

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    // Двойная защита: ref + глобальная переменная
    if (hasRun.current || isProcessing) {
      console.log('⚠️ Already processing, skipping');
      return;
    }

    hasRun.current = true;
    isProcessing = true;

    const code = new URLSearchParams(window.location.search).get('code');

    if (!code) {
      router.push('/login?error=no_code');
      isProcessing = false;
      return;
    }

    console.log('🔵 Processing OAuth code (once):', code.substring(0, 20) + '...');

    dispatch(confirmGoogleAuthThunk({ code }))
      .unwrap()
      .then((data) => {
        console.log('✅ Auth success:', data);
        router.push('/');
      })
      .catch((error) => {
        console.error('❌ Auth error:', error);
        router.push('/login?error=auth_failed');
      })
      .finally(() => {
        isProcessing = false;
      });
  }, []); // ✅ Пустой массив зависимостей

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
        <p className='mt-4'>Авторизация через Google...</p>
      </div>
    </div>
  );
};

export default Page;

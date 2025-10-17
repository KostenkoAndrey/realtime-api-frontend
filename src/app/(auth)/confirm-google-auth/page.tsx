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
    if (hasRun.current || isProcessing) {
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

    dispatch(confirmGoogleAuthThunk({ code }))
      .unwrap()
      .then(() => {
        router.push('/');
      })
      .catch(() => {
        router.push('/login?error=auth_failed');
      })
      .finally(() => {
        isProcessing = false;
      });
  }, []);

  return null;
};

export default Page;

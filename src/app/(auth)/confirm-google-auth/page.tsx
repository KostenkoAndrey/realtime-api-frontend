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
      dispatch(confirmGoogleAuthThunk({ code }))
        .unwrap()
        .then(() => {
          router.push('/dashboard');
        })
        .catch(() => {
          router.push('/login');
        });
    })();
  }, []);

  return nul;
};

export default Page;

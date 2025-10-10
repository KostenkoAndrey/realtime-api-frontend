import React, { useState } from 'react';
import Button from '@/components/button';
import Image from 'next/image';
import { authenticateWithGoogleThunk } from '@/redux/auth/operations';
import { useAppDispatch } from '@/hooks/useReduxHooks';

const GoogleAuthButton = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const authenticateWithGoogle = async () => {
    try {
      setLoading((prev) => !prev);
      const resultAction = await dispatch(authenticateWithGoogleThunk());
      if (authenticateWithGoogleThunk.fulfilled.match(resultAction)) {
        const googleUrl = resultAction.payload;
        if (googleUrl) {
          window.location.href = googleUrl;
        }
      }
    } catch (err) {
      setLoading(false);
      console.error('RESET ERROR:', err);
    }
  };

  return (
    <Button
      type='button'
      onClick={authenticateWithGoogle}
      disabled={loading}
      className='text-black flex items-center justify-center gap-3 bg-white hover:bg-[#dbe7fd] hover:text-[#1a73e8]
      focus:ring-offset-[#18181b] active:scale-[0.95]  shadow-[0_2px_5px_rgba(0,0,0,0.1)] hover:shadow-[0_3px_8px_rgba(0,0,0,0.15)]'
    >
      <Image
        src='/svg/googleicon.svg'
        alt='Google logo'
        width={20}
        height={20}
      />
      {loading ? 'Continuing with Google...' : 'Log in with Google'}
    </Button>
  );
};

export default GoogleAuthButton;

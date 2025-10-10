'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { LoginFormData } from '@/types/auth';

import AuthForm from '@/components/authForm';
import TextInput from '@/components/textInput';
import PasswordInput from '@/components/passwordInput';
import Button from '@/components/button';
import GoogleAuthButton from '@/components/googleAuthButton';
import { loginThunk } from '@/redux/auth/operations';
import { useAppDispatch } from '@/hooks/useReduxHooks';
import { useRouter } from 'next/navigation';
import { authenticateWithGoogle } from '@/utils/authenticateWithGoogle';

const Page = () => {
  const [loading, setLoading] = useState({
    login: false,
    google: false,
    isRedirecting: false,
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading((prev) => ({ ...prev, login: true }));
      await dispatch(loginThunk(data)).unwrap();
      setLoading((prev) => ({ ...prev, isRedirecting: true }));
      router.push('/dashboard');
    } catch {
      setLoading((prev) => ({ ...prev, login: false }));
    } finally {
      if (!loading.isRedirecting) {
        setLoading((prev) => ({ ...prev, login: false }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-[384px] w-full'>
      <AuthForm
        title={'Log in'}
        subtitle={'Don’t have an account?'}
        fields={
          <>
            <TextInput
              label={'email'}
              type={'email'}
              isRequired={true}
              register={register('email', {
                required: 'Email is required',
                minLength: { value: 3, message: 'Minimum 3 characters' },
                maxLength: { value: 30, message: 'Maximum 30 characters' },
              })}
              error={errors.email?.message}
            />
            <PasswordInput
              label={'password'}
              isRequired={true}
              register={register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Minimum 8 characters' },
                maxLength: { value: 30, message: 'Maximum 30 characters' },
              })}
              error={errors.password?.message}
            />
          </>
        }
        buttons={
          <>
            <Button
              type='submit'
              disabled={
                loading.login || loading.google || loading.isRedirecting
              }
              className={'text-white hover:text-black hover:bg-[#007bff]'}
            >
              {loading.login ? 'Logging in...' : 'Log in'}
            </Button>
            <GoogleAuthButton
              onClick={() => authenticateWithGoogle(dispatch, setLoading)}
              disabled={
                loading.login || loading.google || loading.isRedirecting
              }
              label={
                loading.google
                  ? 'Continuing with Google...'
                  : 'Log in with Google'
              }
            />
          </>
        }
        linkText={'Create an account'}
        href={'/register'}
      />
    </form>
  );
};

export default Page;

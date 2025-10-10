'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import AuthForm from '@/components/authForm';
import TextInput from '@/components/textInput';
import PasswordInput from '@/components/passwordInput';
import Button from '@/components/button';
import GoogleAuthButton from '@/components/googleAuthButton';
import {
  authenticateWithGoogleThunk,
  registerThunk,
} from '@/redux/auth/operations';
import { useAppDispatch } from '@/hooks/useReduxHooks';
import { SignUpFormData } from '@/types/auth';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [loading, setLoading] = useState({ register: false, google: false });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setLoading((prev) => ({ ...prev, register: true }));
      await dispatch(registerThunk(data)).unwrap();
      router.push('/login');
    } catch {
      setLoading((prev) => ({ ...prev, register: false }));
    } finally {
      setLoading((prev) => ({ ...prev, register: false }));
    }
  };

  const authenticateWithGoogle = async () => {
    try {
      setLoading((prev) => ({ ...prev, google: true }));
      const resultAction = await dispatch(authenticateWithGoogleThunk());
      if (authenticateWithGoogleThunk.fulfilled.match(resultAction)) {
        const googleUrl = resultAction.payload;
        if (googleUrl) {
          window.location.href = googleUrl;
        }
      }
    } catch (err) {
      setLoading((prev) => ({ ...prev, google: false }));
      console.error('RESET ERROR:', err);
    } finally {
      setLoading((prev) => ({ ...prev, google: false }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-[384px] w-full'>
      <AuthForm
        title={'Sign Up'}
        subtitle={'Already have an account?'}
        fields={
          <>
            <TextInput
              label={'name'}
              type={'text'}
              isRequired={true}
              register={register('name', {
                required: 'Name is required',
                minLength: { value: 3, message: 'Minimum 3 characters' },
                maxLength: { value: 30, message: 'Maximum 30 characters' },
              })}
              error={errors.name?.message}
            />
            <TextInput
              label={'email'}
              type={'email'}
              isRequired={true}
              register={register('email', {
                required: 'Email is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
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
              disabled={loading.google || loading.register}
              className='text-white hover:text-black hover:bg-[#007bff]'
            >
              {loading.register ? 'Signing up...' : 'Sign up'}
            </Button>
            <GoogleAuthButton
              onClick={authenticateWithGoogle}
              disabled={loading.register || loading.google}
              label={
                loading.google
                  ? 'Continuing with Google...'
                  : 'Log in with Google'
              }
            />
          </>
        }
        linkText={'Log in'}
        href={'/login'}
      />
    </form>
  );
};

export default Page;

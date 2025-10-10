'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import AuthForm from '@/components/authForm';
import TextInput from '@/components/textInput';
import PasswordInput from '@/components/passwordInput';
import Button from '@/components/button';
import GoogleAuthButton from '@/components/googleAuthButton';
import { registerThunk } from '@/redux/auth/operations';
import { useAppDispatch } from '@/hooks/useReduxHooks';
import { SignUpFormData } from '@/types/auth';
import { useRouter } from 'next/navigation';

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await dispatch(registerThunk(data)).unwrap();
      router.push('/login');
    } catch {}
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
              disabled={isSubmitting}
              className='text-white hover:text-black hover:bg-[#007bff]'
            >
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </Button>
            <GoogleAuthButton />
          </>
        }
        linkText={'Log in'}
        href={'/login'}
      />
    </form>
  );
};

export default Page;

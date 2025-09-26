'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Component
import {
  Button,
  getFriendlyMessage,
  Heading,
  InputController,
  showToast,
} from '../common';

// Icons
import { Facebook } from 'lucide-react';

// Constants
import {
  ROUTES,
  TOAST_MESSAGES,
  TOAST_TITLES,
  TOAST_VARIANTS,
} from '@/constants';

// Utils
import { SignUpFormValues, signUpSchema } from '@/utils';
import { authApi } from '@/api/auth/auth';

function SignUpForm() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      remember: false,
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await authApi.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      showToast(TOAST_MESSAGES.ACCOUNT_CREATED);
      router.push(ROUTES.LOGIN);
    } catch (err) {
      showToast({
        title: TOAST_TITLES.SIGNUP_FAILED,
        description: getFriendlyMessage(err),
        variant: TOAST_VARIANTS.ERROR,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex-1 flex flex-col gap-4'
    >
      <Heading
        level={3}
        className='font-secondary text-3xl font-bold mb-2 text-white'
      >
        Sign Up
      </Heading>
      <div className='mb-2'>
        <span className='text-secondary text-sm'>
          You have account ?{' '}
          <Link href={ROUTES.LOGIN} className='font-bold text-white '>
            Login
          </Link>
        </span>
      </div>
      <div className='flex gap-6 mb-4'>
        <Button
          type='button'
          variant='tertiary'
          className=' flex items-center justify-center gap-2'
        >
          <Image
            src='/icons/google.svg'
            alt='Google'
            className='w-6 h-6'
            width={24}
            height={24}
          />
          Google
        </Button>
        <Button
          type='button'
          variant='tertiary'
          className=' flex items-center justify-center gap-2'
        >
          <Facebook />
          Facebook
        </Button>
      </div>
      <div className='flex gap-4'>
        <InputController
          name='firstName'
          control={control}
          label='First Name'
          placeholder='First Name'
        />
        <InputController
          name='lastName'
          control={control}
          label='Last Name'
          placeholder='Last Name'
        />
      </div>
      <InputController
        name='email'
        control={control}
        label='Email'
        placeholder='Email'
      />
      <InputController
        name='password'
        control={control}
        label='Password'
        placeholder='Password'
        iconType='password'
        showIcon
        type='password'
      />
      <InputController
        name='confirmPassword'
        control={control}
        label='Entry Keyword Again'
        placeholder='Enter keyword again'
        iconType='password'
        showIcon
        type='password'
      />
      <div className='flex items-center gap-2 self-start w-full'>
        <InputController
          name='remember'
          control={control}
          type='checkbox'
          label=''
          className='w-auto'
        />
        <span className='font-bold text-white text-sm flex-nowrap w-full'>
          Remember Me
        </span>
      </div>
      <div className='flex gap-2 self-end'>
        <Button variant='secondary' type='submit'>
          Sign Up
        </Button>
      </div>
    </form>
  );
}
export default SignUpForm;

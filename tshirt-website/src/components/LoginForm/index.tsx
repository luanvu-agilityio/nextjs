'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import {
  Button,
  getFriendlyMessage,
  Heading,
  InputController,
  showToast,
} from '../common';

// Constants
import {
  ROUTES,
  TOAST_MESSAGES,
  TOAST_TITLES,
  TOAST_VARIANTS,
} from '@/constants';

// Utils
import { LoginFormValues, loginSchema } from '@/utils';

const LoginForm = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        showToast({
          title: TOAST_TITLES.LOGIN_FAILED,
          description: getFriendlyMessage(res.error),
          variant: TOAST_VARIANTS.ERROR,
        });

        return;
      }

      showToast(TOAST_MESSAGES.LOGIN_SUCCESS);
      router.push(ROUTES.ACCOUNT);
    } catch (err) {
      showToast({
        title: TOAST_TITLES.LOGIN_FAILED,
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
        Login
      </Heading>
      <div className='mb-2'>
        <span className='text-secondary text-sm'>
          Don’t have account ?{' '}
          <Link href={ROUTES.SIGNUP} className='font-bold text-white '>
            Sign Up
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
          <Image
            src='/icons/facebook.svg'
            alt='Facebook'
            className='w-6 h-6'
            width={24}
            height={24}
          />
          Facebook
        </Button>
      </div>
      <InputController
        name='email'
        control={control}
        label='Email'
        placeholder='Email'
        showIcon={false}
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
      <div className='flex items-center justify-between mt-2 mb-4'>
        <div className='flex items-center gap-2 w-full'>
          <InputController
            name='remember'
            control={control}
            type='checkbox'
            label=''
            className='w-auto'
          />
          <span className='font-bold text-white text-sm'>Remember Me</span>
        </div>
        <Link
          href='/forgot-password'
          className='font-bold text-white text-sm w-full text-right'
        >
          Forget Password ?
        </Link>
      </div>
      <div className='flex self-end gap-2'>
        <Button type='submit' variant='secondary'>
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

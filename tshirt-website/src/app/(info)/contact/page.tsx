'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';

// Components
import {
  Breadcrumbs,
  Button,
  Heading,
  InputController,
  Typography,
} from '@/components';

// Icons
import { MapPin, Phone } from 'lucide-react';

// Constants
import { ROUTES } from '@/constants/route';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  });

  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;
    const u = session.user as {
      firstName?: string | null;
      lastName?: string | null;
      name?: string | null;
      email?: string | null;
    };

    const firstName = u.firstName ?? u.name?.split(' ')?.[0] ?? '';
    const lastName = u.lastName ?? u.name?.split(' ')?.slice(1).join(' ') ?? '';
    const email = u.email ?? '';
    const message = '';

    reset({
      firstName,
      lastName,
      email,
      message,
    });
  }, [session, reset]);

  const onSubmit = (data: FormValues) => {
    alert('Message sent. We will get back to you shortly.');
    reset({ ...data, message: '' });
  };

  return (
    <main>
      <section className='bg-gradient-primary px-30 py-10 h-116'>
        <div className='container flex flex-col gap-9.5 items-start justify-start w-127'>
          <Breadcrumbs
            items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Contact' }]}
            variant='dark'
          />
          <Heading
            level={2}
            className='text-4xl text-white font-secondary font-bold'
          >
            Contact
          </Heading>
          <Typography className='text-white  text-lg leading-relaxed'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
            gravida leo, nec iaculis diam. Nam bibendum mi sed sem finibus
            ullamcorper.
          </Typography>
        </div>
      </section>

      <div className='container mx-auto px-30 py-12 pt-48'>
        <div className='absolute top-97 max-w-[1010px] z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 mx-auto left-1/2 -translate-x-1/2'>
          <div className='bg-white shadow-tertiary p-10'>
            <div className='flex items-start flex-col gap-2 mb-3'>
              <div className='w-10.5 h-10.5 rounded-full bg-blue-background flex items-center justify-center text-white'>
                <MapPin size={32} />
              </div>
              <div>
                <Typography className='font-bold text-xl font-secondary'>
                  Location
                </Typography>
                <Typography className='text-lg text-gray-foreground'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  eget gravida leo, nec iaculis diam.
                </Typography>
              </div>
            </div>
          </div>

          <div className='bg-white shadow-tertiary p-8'>
            <div className='flex items-start flex-col gap-2 mb-3'>
              <div className='w-10.5 h-10.5 rounded-full bg-blue-background flex items-center justify-center text-white'>
                <Phone size={26} />
              </div>

              <Typography className='font-bold text-xl font-secondary'>
                Contact
              </Typography>
              <Typography className='text-lg text-gray-foreground'>
                T-shirt12@gmail.com
              </Typography>
              <Typography className='text-lg text-gray-foreground'>
                (021) 12345678
              </Typography>
            </div>
          </div>
        </div>

        <Heading
          level={3}
          className='font-secondary text-4xl mb-6 text-center font-bold'
        >
          Send a Message
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)} className='max-w-4xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <InputController
              name='firstName'
              control={control}
              rules={{ required: 'First name is required' }}
              placeholder='Firs Name'
              variant='default'
              size='regular'
              className='border border-gray-foreground placeholder:text-gray-foreground'
            />
            <InputController
              name='lastName'
              control={control}
              rules={{ required: 'Last name is required' }}
              placeholder='Last Name'
              variant='default'
              size='regular'
              className='border border-gray-foreground placeholder:text-gray-foreground'
            />
          </div>

          <div className='mb-4'>
            <InputController
              name='email'
              control={control}
              rules={{
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
              }}
              placeholder='Your Email'
              variant='default'
              size='regular'
              className='border border-gray-foreground placeholder:text-gray-foreground'
            />
          </div>

          <div className='mb-6'>
            <textarea
              rows={8}
              name='description'
              className='w-full border border-gray-foreground p-4 rounded resize-vertical placeholder:text-gray-foreground'
              placeholder='Description'
            />
          </div>

          <div className='text-center'>
            <Button type='submit' variant='primary' size='small'>
              Send
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

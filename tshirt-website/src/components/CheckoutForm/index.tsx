'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Button, InputController, Typography } from '../common';

// Types & Validation
import { CheckoutFormData, checkoutFormSchema } from '@/utils';
import { User } from '@/types';

// Utils
import { cn } from '@/lib/utils';

interface CheckoutFormProps {
  user?: User;
  isLoggedIn: boolean;
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting: boolean;
}

function CheckoutForm({
  user,
  isLoggedIn,
  onSubmit,
  isSubmitting,
}: Readonly<CheckoutFormProps>) {
  const [activeSection, setActiveSection] = useState<'shipping' | 'payment'>(
    'shipping'
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      isGuest: !isLoggedIn,
      shippingInfo: {
        firstName: '',
        lastName: '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
      },
      paymentInfo: {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
      },
    },
  });

  const isGuest = watch('isGuest');

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (user && !isGuest) {
      setValue('shippingInfo.firstName', user.name?.split(' ')[0] || '');
      setValue(
        'shippingInfo.lastName',
        user.name?.split(' ').slice(1).join(' ') || ''
      );
      setValue('shippingInfo.email', user.email || '');
      setValue('shippingInfo.phone', user.phone || '');
      setValue('shippingInfo.address', user.address || '');
    }
  }, [user, isGuest, setValue]);

  return (
    <div className='bg-white rounded-lg shadow-lg p-6'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        {/* Guest Checkout Toggle */}
        {isLoggedIn && (
          <div className='flex items-center gap-3 p-4 bg-blue-300 rounded-lg'>
            <input
              type='checkbox'
              id='guest-checkout'
              checked={isGuest}
              onChange={e => setValue('isGuest', e.target.checked)}
              className='rounded'
            />
            <label htmlFor='guest-checkout' className='text-lg font-medium'>
              Checkout as guest (don&apos;t save this information)
            </label>
          </div>
        )}

        {/* Section Navigation */}
        <div className='flex border-b'>
          <button
            type='button'
            onClick={() => setActiveSection('shipping')}
            className={cn(
              'flex-1 py-3 px-4 text-lg font-medium border-b-2 transition-colors',
              activeSection === 'shipping'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            1. Shipping Information
          </button>
          <button
            type='button'
            onClick={() => setActiveSection('payment')}
            className={cn(
              'flex-1 py-3 px-4 text-lg font-medium border-b-2 transition-colors',
              activeSection === 'payment'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            2. Payment Information
          </button>
        </div>

        {/* Shipping Information */}
        {activeSection === 'shipping' && (
          <div className='space-y-6'>
            <Typography className='font-bold text-primary text-xl text-center py-4'>
              Shipping Information
            </Typography>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <InputController
                name='shippingInfo.firstName'
                control={control}
                placeholder='First Name'
                label='First Name'
                size='regular'
                className='text-gray-foreground text-lg mb-2'
              />
              <InputController
                name='shippingInfo.lastName'
                control={control}
                placeholder='Last Name'
                label='Last Name'
                size='regular'
                className='text-gray-foreground text-lg mb-2'
              />
            </div>

            <InputController
              name='shippingInfo.email'
              control={control}
              placeholder='Email Address'
              label='Email Address'
              type='email'
              size='regular'
              className='text-gray-foreground text-lg mb-2'
            />

            <InputController
              name='shippingInfo.phone'
              control={control}
              placeholder='Phone Number'
              label='Phone Number'
              type='tel'
              size='regular'
              className='text-gray-foreground text-lg mb-2'
            />

            <InputController
              name='shippingInfo.address'
              control={control}
              placeholder='Street Address'
              label='Address'
              size='regular'
              className='text-gray-foreground text-lg mb-2'
            />

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <InputController
                name='shippingInfo.city'
                control={control}
                placeholder='City'
                label='City'
                size='regular'
                className='text-gray-foreground text-lg mb-2'
              />
              <InputController
                name='shippingInfo.state'
                control={control}
                placeholder='State'
                label='State'
                size='regular'
                className='text-gray-foreground text-lg mb-2'
              />
              <InputController
                name='shippingInfo.zipCode'
                control={control}
                placeholder='ZIP Code'
                label='ZIP Code'
                size='regular'
                className='text-gray-foreground text-lg mb-2'
              />
            </div>

            <InputController
              name='shippingInfo.country'
              control={control}
              placeholder='Country'
              label='Country'
              size='regular'
              className='text-gray-foreground text-lg'
            />

            <div className='flex justify-end mt-6 '>
              <Button
                type='button'
                onClick={() => setActiveSection('payment')}
                className='bg-gradient-primary text-white w-auto'
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Payment Information */}
        {activeSection === 'payment' && (
          <div className='space-y-6'>
            <Typography className='font-bold text-primary text-xl text-center py-4'>
              Payment Information
            </Typography>

            <InputController
              name='paymentInfo.cardholderName'
              control={control}
              placeholder='Cardholder Name'
              label='Cardholder Name'
              size='regular'
              className='text-gray-foreground text-lg mb-2'
            />

            <InputController
              name='paymentInfo.cardNumber'
              control={control}
              placeholder='1234 5678 9012 3456'
              label='Card Number'
              maxLength={16}
              size='regular'
              className='text-gray-foreground text-lg mb-2'
            />

            <div className='grid grid-cols-2 gap-4'>
              <InputController
                name='paymentInfo.expiryDate'
                control={control}
                placeholder='MM/YY'
                label='Expiry Date'
                maxLength={5}
                size='regular'
                className='text-gray-foreground text-lg mb-2'
              />
              <InputController
                name='paymentInfo.cvv'
                control={control}
                placeholder='123'
                label='CVV'
                maxLength={4}
                size='regular'
                className='text-gray-foreground text-lg '
              />
            </div>

            <div className='flex justify-end gap-4 mt-6'>
              <Button
                type='button'
                variant='secondary'
                onClick={() => setActiveSection('shipping')}
                className='w-auto'
              >
                Back to Shipping
              </Button>
              <Button
                variant='primary'
                type='submit'
                disabled={isSubmitting}
                className=' w-auto'
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
export default CheckoutForm;

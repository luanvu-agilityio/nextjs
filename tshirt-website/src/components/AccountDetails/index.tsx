'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { TOAST_MESSAGES, TOAST_TITLES } from '@/constants';

// Components
import { Button, InputController, showToast, Typography } from '../common';
import { getFriendlyMessage } from '../common/ErrorMessage';

// Types / Validation
import { AccountFormValues, accountSchema } from '@/utils';
import { cn } from '@/lib/utils';

// hooks
import { useMe, useUpdateUser } from '@/hooks/useRegisterUser';

const DEFAULT_VALUES: AccountFormValues = {
  name: '',
  street: '',
  address: '',
  phone: '',
  gender: 'male',
};

export function AccountScreen() {
  const { control, handleSubmit, watch, setValue } = useForm<AccountFormValues>(
    {
      resolver: zodResolver(accountSchema),
      defaultValues: DEFAULT_VALUES,
    }
  );

  const { data: user } = useMe();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (!user) return;
    setValue('name', user.name ?? '');
    setValue('street', user.street ?? '');
    setValue('address', user.address ?? '');
    setValue('phone', user.phone ?? '');
    setValue(
      'gender',
      (user.gender ?? DEFAULT_VALUES.gender) as AccountFormValues['gender']
    );
  }, [user, setValue]);

  const onSubmit = (data: AccountFormValues) => {
    if (!user?.id) {
      showToast(TOAST_MESSAGES.MUST_BE_LOGGED_IN);
      return;
    }

    updateUser.mutate(
      { id: user.id, patch: data },
      {
        onSuccess: () => {
          showToast(TOAST_MESSAGES.PROFILE_UPDATED);
        },
        onError: err => {
          showToast({
            title: TOAST_TITLES.UPDATE_FAILED,
            description: getFriendlyMessage(err),
            variant: 'error',
          });
        },
      }
    );
  };

  return (
    <section className='w-full px-30'>
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-1 md:grid-cols-2 gap-8  z-10'
      >
        <div className='space-y-6'>
          <div className='mb-2'>
            <Typography size='lg' className='font-bold mb-2 '>
              Name
            </Typography>
            <InputController
              name='name'
              control={control}
              placeholder='Name'
              className='w-full  text-gray-foreground font-bold placeholder-gray-400'
              size='regular'
            />
          </div>

          <div className='mb-2'>
            <Typography size='lg' className='font-bold mb-2 '>
              Street
            </Typography>
            <InputController
              name='street'
              control={control}
              placeholder='Street'
              className='w-full  text-gray-foreground font-bold placeholder-gray-400'
              size='regular'
            />
          </div>

          <div>
            <Typography size='lg' className='font-bold mb-2 '>
              Address
            </Typography>
            <textarea
              {...{
                name: 'address',
                value: watch('address'),
                onChange: e => setValue('address', e.target.value),
              }}
              rows={5}
              placeholder='Address'
              className={cn(
                'w-full rounded-md border border-gray-foreground px-4 py-3 text-gray-foreground font-bold placeholder-gray-400 resize-none',
                'bg-white/95'
              )}
            />
          </div>

          <div className='mt-4'>
            <Button
              type='submit'
              className='bg-gradient-primary text-white py-3 px-6 rounded-md shadow-2xl'
            >
              Update
            </Button>
          </div>
        </div>

        <div className='space-y-6'>
          <div className='mt-22 mb-2'>
            <Typography size='lg' className='font-bold mb-2 '>
              No. Phone
            </Typography>
            <InputController
              name='phone'
              control={control}
              placeholder='Phone'
              className='w-full text-gray-foreground font-bold placeholder-gray-400'
              size='regular'
            />
          </div>

          <div>
            <Typography size='lg' className='font-bold mb-2 '>
              Gender
            </Typography>
            <div className='flex gap-6 mt-2 items-center'>
              {['male', 'female', 'other'].map(g => (
                <label
                  key={g}
                  className='flex items-center gap-2 cursor-pointer text-primary'
                >
                  <input
                    type='radio'
                    value={g}
                    {...{
                      checked: watch('gender') === g,
                      onChange: () =>
                        setValue('gender', g as AccountFormValues['gender']),
                    }}
                    className='accent-purple-background'
                  />
                  <span className='text-primary'>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* empty box to keep alignment with left column button */}
          <div />
        </div>
      </form>
    </section>
  );
}

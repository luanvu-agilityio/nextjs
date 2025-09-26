import Image from 'next/image';

// Components
import { Breadcrumbs, Heading } from '@/components';

// Constants
import { ROUTES } from '@/constants';

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='relative px-30 py-10 overflow-hidden h-auto'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/background/background-gradient.jpg'
          alt='Background'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className='absolute inset-0 z-10 bg-gradient-secondary'></div>

      {/* Content */}
      <div className='relative z-20'>
        <div className='container flex flex-col gap-9.5 items-start justify-start w-127'>
          <Breadcrumbs
            variant='dark'
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'My Account' },
            ]}
          />
          <Heading
            level={2}
            className='font-secondary text-4xl font-bold text-white'
          >
            My Account
          </Heading>
        </div>

        <div className='relative z-10 mt-11'>{children}</div>
      </div>
    </section>
  );
};

export default AccountLayout;

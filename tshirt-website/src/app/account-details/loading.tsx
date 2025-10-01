import { Breadcrumbs, Heading, Typography } from '@/components';
import AccountScreenSkeleton from '@/components/AccountDetails/AccountScreenSkeleton';
import ProfileCardSkeleton from '@/components/ProfileCard/ProfileCardSkeleton';
import { ROUTES } from '@/constants';

function Loading() {
  return (
    <main>
      <section
        className='relative bg-gradient-primary px-30 py-10 h-86 flex gap-52 items-start justify-between'
        style={{
          borderBottomLeftRadius: '5px',
          borderBottomRightRadius: '5px',
        }}
      >
        <div className='container mx-auto flex flex-col gap-9.5 items-start justify-start w-127'>
          <Breadcrumbs
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'My Account' },
            ]}
            variant='dark'
          />
          <Heading
            level={2}
            className='text-4xl text-white font-secondary font-bold'
          >
            My Account
          </Heading>
          <Typography className='text-white text-lg leading-relaxed '>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
            gravida leo, nec iaculis diam. Nam bibendum mi sed sem finibus
            ullamcorper.
          </Typography>
        </div>
        <ProfileCardSkeleton />
        <div className='absolute bottom-0 left-0 w-full overflow-hidden leading-[0]'>
          <svg
            className='relative block w-full h-[145px]'
            data-name='Layer 1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
          >
            <path d='M0,120L1200,0L1200,120Z' className='fill-white' />
          </svg>
        </div>
      </section>
      <div className='col-span-2 mt-20'>
        <AccountScreenSkeleton />
      </div>
    </main>
  );
}
export default Loading;

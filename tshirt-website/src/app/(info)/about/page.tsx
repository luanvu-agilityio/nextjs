import Image from 'next/image';

// Components
import { Breadcrumbs, Heading, Typography } from '@/components';

// Constants
import { ROUTES } from '@/constants';

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className='relative bg-gradient-primary px-30 py-10 h-86 flex gap-52 items-start justify-between'
        style={{
          borderBottomLeftRadius: '5px',
          borderBottomRightRadius: '5px',
        }}
      >
        <div className='container mx-auto flex flex-col gap-9.5 items-start justify-start w-127'>
          <Breadcrumbs
            variant='dark'
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'About Us' },
            ]}
          />
          <Heading
            level={2}
            className='text-4xl text-white font-secondary font-bold'
          >
            About Us
          </Heading>
          <Typography className='text-white  text-lg leading-relaxed '>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
            gravida leo, nec iaculis diam. Nam bibendum mi sed sem finibus
            ullamcorper.
          </Typography>
        </div>
        {/* Right Content - Hero Image */}
        <div className='flex flex-col items-center w-[483px] h-auto gap-6 bg-white shadow-tertiary z-10'>
          <div className='relative w-[483px] h-[268px]  overflow-hidden '>
            <Image
              src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=face'
              alt='Professional men in suits'
              fill
              className='object-cover'
              priority
            />
          </div>
        </div>

        {/* Diagonal Cut - Bottom Left to Top Right */}
        <div className='absolute bottom-0 left-0 w-full overflow-hidden leading-[0]'>
          <svg
            className='relative block w-full h-[140px]'
            data-name='Layer 1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
          >
            <path d='M0,120L1200,0L1200,120Z' className='fill-white' />
          </svg>
        </div>
      </section>

      {/* Profile Section */}
      <section className='px-30 py-20 bg-white'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-25 items-center'>
            {/* Left Content */}
            <div className='flex flex-col gap-6'>
              <Heading level={3} className='text-4xl font-bold text-gray-900'>
                Profile
              </Heading>
              <Typography className='text-gray-600 text-lg leading-relaxed'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
                gravida leo, nec iaculis diam. Nam bibendum mi sed sem finibus
                ullamcorper.
              </Typography>
              <Typography className='text-gray-700 leading-relaxed'>
                Klara is an AI powered automated Solution Builder of Growth
                Strategy, Branding and Digital marketing planning for your
                business.
              </Typography>
            </div>
            {/* Right Content - Profile Image */}
            <div className='relative flex justify-end'>
              <div className='relative w-[590px] h-[349px]   overflow-hidden shadow-lg'>
                <Image
                  src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop'
                  alt='Black suits hanging on rack'
                  fill
                  className='object-cover'
                />
                {/* Store Label */}
                <div className='absolute w-full bottom-4 left-4 bg-white text-gradient-primary px-6 py-3 font-semibold shadow-lg'>
                  Mangcoding Store
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className='px-30 py-20 pt-0'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-25 items-center'>
            {/* Left Content - Mission Image */}
            <div className='relative flex justify-start order-2 lg:order-1'>
              <div className='relative w-[590px] h-[349px] overflow-hidden shadow-lg'>
                <Image
                  src='https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=400&fit=crop'
                  alt='Clothing store interior with organized clothes'
                  fill
                  className='object-cover'
                />
                {/* Store Label */}
                <div className='absolute w-full bottom-4 right-4 bg-white text-gradient-primary px-6 py-3  font-semibold shadow-lg'>
                  Mangcoding Store
                </div>
              </div>
            </div>
            {/* Right Content */}
            <div className='flex flex-col gap-6 order-1 lg:order-2'>
              <Heading level={2} className='text-4xl font-bold text-gray-900'>
                Our Mission
              </Heading>
              <Typography className='text-gray-600 text-lg leading-relaxed'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
                gravida leo, nec iaculis diam. Nam bibendum mi sed sem finibus
                ullamcorper.
              </Typography>
              <Typography className='text-gray-700 leading-relaxed'>
                Klara is an AI powered automated Solution Builder of Growth
                Strategy, Branding and Digital marketing planning for your
                business.
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

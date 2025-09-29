import Link from 'next/link';

// Icons
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import LogoIcon from '@/components/icons/BrandLogo';

// Components
import { Button, Heading, IconButton, Typography } from '@/components/common';

// Utils
import { cn } from '@/lib/utils';

// Constants
import { COMPANY_INFO, FOOTER_LINKS } from '@/constants';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={cn('bg-muted-background text-white', className)}
      role='contentinfo'
    >
      <div className='container mx-auto px-30 py-20'>
        <div className='flex gap-[128px]'>
          {/* Company Info Section */}
          <section className='max-w-[424px]' aria-labelledby='company-info'>
            <Link
              href='/'
              className='flex items-center gap-2 mb-4'
              aria-label='Go to homepage'
            >
              <LogoIcon />

              <span className='font-tertiary font-bold text-sm text-white'>
                {COMPANY_INFO.name}
              </span>
            </Link>

            <Typography className='text-secondary mb-6 max-w-md text-sm'>
              {COMPANY_INFO.description}
            </Typography>

            <Button variant='secondary' size='small'>
              Login Now
            </Button>
          </section>

          {/* Navigation Links Section */}
          <nav className='flex gap-20' aria-label='Footer navigation'>
            {/* Home Links */}
            <section aria-labelledby='home-links'>
              <Heading
                level={3}
                className='font-primary font-bold text-lg text-white mb-4'
              >
                Home
              </Heading>
              <ul className='space-y-3'>
                {FOOTER_LINKS.home.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-secondary hover:text-white transition-colors duration-200 text-sm'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Shop Links */}
            <section aria-labelledby='shop-links'>
              <Heading
                level={3}
                className='font-primary font-bold text-lg text-white mb-4'
              >
                Shop
              </Heading>
              <ul className='space-y-3'>
                {FOOTER_LINKS.shop.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-secondary hover:text-white transition-colors duration-200 text-sm'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Categories */}
            <section aria-labelledby='categories-links'>
              <Heading
                level={3}
                className='font-primary font-bold text-lg text-white mb-4'
              >
                Categories
              </Heading>
              <ul className='space-y-3 mb-6'>
                {FOOTER_LINKS.categories.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-secondary hover:text-white transition-colors duration-200 text-sm'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact & Social */}
            <section aria-labelledby='contact-info'>
              <Heading
                level={3}
                className='font-primary font-bold text-lg text-white mb-4'
              >
                Contact
              </Heading>
              <address className='not-italic'>
                <Link
                  href={`mailto:${COMPANY_INFO.email}`}
                  className='hover:text-white transition-colors duration-200'
                  aria-label={`Send email to ${COMPANY_INFO.email}`}
                >
                  <Typography className='text-secondary mb-4 text-sm'>
                    {COMPANY_INFO.email}
                  </Typography>
                </Link>
              </address>

              {/* Social Media Icons */}
              <div className='flex gap-4' aria-label='Social media links'>
                <IconButton
                  variant='outline'
                  size='sm'
                  aria-label='Visit our Facebook page'
                  className='border-white text-white hover:border-white hover:text-white'
                >
                  <Link
                    href='https://facebook.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Facebook className='size-4' />
                  </Link>
                </IconButton>

                <IconButton
                  variant='outline'
                  size='sm'
                  aria-label='Visit our Twitter page'
                  className='border-white text-white  hover:border-white hover:text-white'
                >
                  <Link
                    href='https://twitter.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Twitter className='size-4' />
                  </Link>
                </IconButton>

                <IconButton
                  variant='outline'
                  size='sm'
                  aria-label='Visit our LinkedIn page'
                  className='border-white text-white  hover:border-white hover:text-white'
                >
                  <Link
                    href='https://linkedin.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Linkedin className='size-4' />
                  </Link>
                </IconButton>

                <IconButton
                  variant='outline'
                  size='sm'
                  aria-label='Visit our Instagram page'
                  className='border-white text-white  hover:border-white hover:text-white'
                >
                  <Link
                    href='https://instagram.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Instagram className='size-4' />
                  </Link>
                </IconButton>
              </div>
            </section>
          </nav>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export { Footer };

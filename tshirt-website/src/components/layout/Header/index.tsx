'use client';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Icons
import {
  Menu,
  X,
  ShoppingBag,
  Heart,
  User,
  LogIn,
  UserPlus,
  LogOut,
  History,
} from 'lucide-react';

// Components
import { Input, IconButton, Badge, Navigation, showToast } from '@/components';

// Utils
import { cn } from '@/lib/utils';

// Constants
import NAV_ITEMS from '@/constants/nav-item';
import { ROUTES } from '@/constants';

// Stores
import { useCart, useWishlist } from '@/store';

// Hooks
import useClickAway from '@/hooks/useClickAway';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const modalRef = useRef<HTMLDivElement>(null);

  useClickAway(modalRef, () => {
    if (modalOpen) {
      setModalOpen(false);
    }
  });

  // auth via next-auth
  const { data: session } = useSession();

  const isLoggedIn = Boolean(session?.user);
  const currentUser = session?.user as
    | { id?: string; name?: string; email?: string }
    | undefined;

  const cartCount = useCart(s => s.items.reduce((sum, it) => sum + it.qty, 0));
  const wishlistCount = useWishlist(s => s.items.length);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    showToast({
      title: 'Logged out successfully',
      description: 'You have been signed out. See you next time!',
      variant: 'success',
    });

    setModalOpen(false);
    signOut({ callbackUrl: ROUTES.HOME });
  };

  const handleOpenCart = () => {
    router.push(ROUTES.CART);
  };

  const handleOpenWishlist = () => {
    router.push(ROUTES.WISHLIST);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white border-b border-gray-200 shadow-quaternary overflow-visible',
        className
      )}
    >
      <div
        className='
     container mx-auto px-30'
      >
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link href={ROUTES.HOME} className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-lg'>M</span>
            </div>
            <span className='font-tertiary font-bold text-lg text-primary'>
              mangcoding Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:block'>
            <Navigation items={NAV_ITEMS} />
          </div>

          {/* Desktop Actions */}
          <div className='hidden lg:flex items-center space-x-6'>
            {/* Action Icons */}
            <div className='flex items-center space-x-4'>
              <div className='relative'>
                <IconButton
                  variant='ghost'
                  size='md'
                  aria-label='Shopping cart'
                  className='text-primary hover:text-blue-background'
                  onClick={handleOpenCart}
                >
                  <ShoppingBag className='size-5' />
                </IconButton>
                <div className='absolute -top-2 right-0'>
                  <Badge count={cartCount} variant='destructive' size='small' />
                </div>
              </div>
              <div className='relative'>
                <IconButton
                  variant='ghost'
                  size='md'
                  aria-label='Wishlist'
                  className='text-primary hover:text-blue-background'
                  onClick={handleOpenWishlist}
                >
                  <Heart className='size-5' />
                  <div className='absolute -top-1 right-0'>
                    <Badge
                      count={wishlistCount}
                      variant='destructive'
                      size='small'
                    />
                  </div>
                </IconButton>
              </div>

              <IconButton
                variant='ghost'
                size='md'
                aria-label='User account'
                className='text-primary hover:text-blue-background'
                onClick={() => {
                  setModalOpen(s => !s);
                }}
              >
                <User className='size-5' />
              </IconButton>
            </div>
            {/* Search Input */}
            <div className='w-80'>
              <Input
                variant='default'
                size='small'
                showIcon
                iconType='search'
                placeholder='Search'
                className='border-gray-300 focus:border-blue-background'
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='lg:hidden p-2 text-primary hover:text-blue-background'
            onClick={toggleMenu}
            aria-label='Toggle menu'
          >
            {isMenuOpen ? (
              <X className='size-6' />
            ) : (
              <Menu className='size-6' />
            )}
          </button>
        </div>

        {/* Mobile Menu  */}
        {isClient && isMenuOpen && (
          <div className='lg:hidden border-t border-gray-200 mt-2 pt-6 pb-6'>
            {/* Mobile Search */}
            <div className='mb-6'>
              <Input
                variant='default'
                size='small'
                showIcon
                iconType='search'
                placeholder='Search'
                className='w-full'
              />
            </div>

            {/* Mobile Navigation */}
            <Navigation
              items={NAV_ITEMS}
              isMobile
              onItemClick={() => setIsMenuOpen(false)}
              className='mb-6'
            />

            {/* Mobile Actions */}
            <div className='flex items-center justify-between pt-6 border-t border-gray-200'>
              <div className='flex items-center space-x-6'>
                <div className='relative'>
                  <IconButton
                    variant='ghost'
                    size='md'
                    aria-label='Wishlist'
                    className='text-primary'
                    onClick={handleOpenWishlist}
                  >
                    <Heart className='size-5' />
                    <div className='absolute -top-2 -right-2'>
                      <Badge
                        count={wishlistCount}
                        variant='destructive'
                        size='small'
                      />
                    </div>
                  </IconButton>
                </div>

                <div className='relative'>
                  <IconButton
                    variant='ghost'
                    size='md'
                    aria-label='Shopping cart'
                    className='text-primary'
                  >
                    <ShoppingBag className='size-5' />
                  </IconButton>
                  <div className='absolute -top-2 -right-2'>
                    <Badge
                      count={cartCount}
                      variant='destructive'
                      size='small'
                    />
                  </div>
                </div>

                <IconButton
                  variant='ghost'
                  size='md'
                  aria-label='User account'
                  className='relative text-primary hover:text-blue-background'
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  <User className='size-5' />
                </IconButton>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal  */}
      {modalOpen && (
        <div
          ref={modalRef}
          className='absolute left-1/2 top-full mt-0 translate-x-1/2 z-150'
        >
          <div className='bg-white rounded-xl shadow-2xl min-w-[260px] py-4 px-4 flex flex-col gap-2 border border-gray-100'>
            <button
              className='absolute top-2 right-2 text-gray-400 hover:text-primary'
              onClick={() => setModalOpen(false)}
              aria-label='Close'
            >
              <X className='size-5' />
            </button>

            <div className='flex items-center gap-3 px-2 py-2'>
              <div className='w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold'>
                {currentUser?.name
                  ? currentUser.name.charAt(0).toUpperCase()
                  : 'U'}
              </div>
              <div className='flex-1'>
                <div className='font-semibold text-lg'>Account</div>
                {currentUser && (
                  <div className='text-xs text-gray-500 truncate'>
                    {currentUser.name ?? currentUser.email}
                  </div>
                )}
              </div>
            </div>

            <div className='h-px bg-gray-100 my-2' />

            {!isLoggedIn ? (
              <>
                <button
                  className='flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-50 transition cursor-pointer'
                  onClick={() => {
                    setModalOpen(false);
                    router.push(ROUTES.LOGIN);
                  }}
                >
                  <LogIn className='size-5 text-gray-700' />
                  <span className='text-base font-medium'>Login</span>
                </button>

                <button
                  className='flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-50 transition cursor-pointer'
                  onClick={() => {
                    setModalOpen(false);
                    router.push(ROUTES.SIGNUP);
                  }}
                >
                  <UserPlus className='size-5 text-gray-700' />
                  <span className='text-base font-medium'>Sign Up</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className='flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-50 transition cursor-pointer'
                  onClick={() => {
                    setModalOpen(false);
                    router.push('/account-details');
                  }}
                >
                  <User className='size-5 text-gray-700' />
                  <span className='text-base font-medium'>My Account</span>
                </button>

                <button
                  className='flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-50 transition cursor-pointer'
                  onClick={() => {
                    setModalOpen(false);
                    router.push('/order-history');
                  }}
                >
                  <History className='size-5 text-gray-700' />
                  <span className='text-base font-medium'>Order History</span>
                </button>

                <button
                  className='flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-50 transition text-red-600 cursor-pointer'
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <LogOut className='size-5' />
                  <span className='text-base font-medium'>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

Header.displayName = 'Header';

export { Header };

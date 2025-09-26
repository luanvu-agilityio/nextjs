'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

// Providers
import { ToastProvider, ReactQueryProvider } from '@/provider';

// Components
import { Footer, Header } from '@/components';

export default function ClientLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <div className='min-h-screen flex flex-col'>
          <Header />
          <main className='flex-1'>{children}</main>
          <Footer />
        </div>
        <ToastProvider />
      </ReactQueryProvider>
    </SessionProvider>
  );
}

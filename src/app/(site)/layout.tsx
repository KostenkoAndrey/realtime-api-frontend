import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LayoutProps } from '@/types/layout';
import Header from '@/components/header';
import Navigation from '@/components/navigation';

const Layout = async ({ children }: LayoutProps) => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId');
  if (!sessionId) redirect('/login');

  return (
    <>
      <Header />
      <div className='max-w-[1280px] m-auto h-screen'>
        <Navigation />
        {children}
      </div>
    </>
  );
};

export default Layout;

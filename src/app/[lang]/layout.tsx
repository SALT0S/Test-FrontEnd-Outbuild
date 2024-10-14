export const dynamic = 'force-dynamic';
import isAuthenticated from '@/auth/authenticated';
import { Providers } from '@/components/providers';
import { Lang } from '@/i18n.config';
import '@/styles/tailwind.css';
import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = {
  title: 'OutBuild Test Jose Sanchez',
  description: '',
};

export async function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Lang };
}>) {
  const authenticated = isAuthenticated();
  return (
    <html
      lang={params.locale}
      className='h-full bg-zinc-100 text-zinc-950 antialiased dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950'
      suppressHydrationWarning
    >
      <head>
        <link rel='preconnect' href='https://rsms.me/' />
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
      </head>
      <body className='h-full'>
        <Providers authenticated={authenticated}>{children}</Providers>
      </body>
    </html>
  );
}

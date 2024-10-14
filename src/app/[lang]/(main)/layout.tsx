import { MainLayout } from '@/components/layouts/main-layout';
import { Lang } from '@/i18n.config';
import logout from '@/lib/authenticate';
import { getDictionary } from '@/lib/dictionary';
import { getCurrentUser } from '@/lib/user';
import '@/styles/tailwind.css';
import { Metadata } from 'next';
import type React from 'react';

interface Props {
  params: {
    lang: Lang;
  };
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: '%s - Outbuild Test Jose Sanchez',
    default: 'Outbuild Test Jose Sanchez',
  },
};

export default async function RootLayout({ params, children }: Readonly<Props>) {
  const { Sidebar, DropdownMenu } = await getDictionary(params.lang);
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <MainLayout
      translations={{ ...Sidebar, ...DropdownMenu }}
      lang={params.lang}
      email={user.email}
      first_name={user.first_name}
      last_name={user.last_name}
      logout={logout}
    >
      {children}
    </MainLayout>
  );
}

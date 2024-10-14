'use client';

import { Avatar } from '@/components/avatar';
import { Dropdown, DropdownButton } from '@/components/dropdown';
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navigation/navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/navigation/sidebar';
import { SidebarLayout } from '@/components/navigation/sidebar-layout';
import { Lang } from '@/i18n.config';
import { AccountDropdownMenu } from '@/ui/AccountDropdownMenu';
import { Initials } from '@/utils/initials';
import { ChevronUpIcon } from '@heroicons/react/16/solid';
import { HomeIcon } from '@heroicons/react/20/solid';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  logout: () => Promise<void>;
  email: string;
  first_name: string;
  last_name: string;
  lang: Lang;
  translations: {
    home: string;
    global_config: string;
    toggle_theme: string;
    sign_out: string;
  };
}

export function MainLayout({ children, logout, email, first_name, last_name, lang, translations }: Props) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar
                  initials={first_name ? Initials(`${first_name} ${last_name}`) : Initials(email)}
                  className='bg-zinc-900 text-white dark:bg-white dark:text-black'
                  square
                />
              </DropdownButton>
              <AccountDropdownMenu translations={translations} anchor='bottom end' logout={logout} />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem href={`/${lang}`} current={pathname === `/${lang}`}>
                <HomeIcon />
                <SidebarLabel>{translations.home}</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarHeading>{translations.global_config}</SidebarHeading>
              <SidebarItem
                aria-label={mounted ? `Switch to ${otherTheme} theme` : translations.toggle_theme}
                onClick={() => setTheme(otherTheme)}
              >
                <SunIcon className='h-4 w-4 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-sky-50 [@media(prefers-color-scheme:dark)]:stroke-sky-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-sky-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-sky-600' />
                <MoonIcon className='hidden h-4 w-4 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-sky-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-sky-500' />
                <SidebarLabel>{translations.toggle_theme}</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className='max-lg:hidden'>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className='flex min-w-0 items-center gap-3'>
                  <Avatar
                    /*src='/users/erica.jpg'*/
                    initials={first_name ? Initials(`${first_name} ${last_name}`) : Initials(email)}
                    className='size-10 bg-zinc-900 text-white dark:bg-white dark:text-black'
                    square
                    alt=''
                  />
                  <span className='min-w-0'>
                    {first_name && last_name && (
                      <span className='block truncate text-sm/5 font-medium text-zinc-950 dark:text-white'>
                        {first_name} {last_name}
                      </span>
                    )}
                    <span className='block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400'>
                      {email}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu translations={translations} anchor='top start' logout={logout} />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}

function SunIcon(props: Readonly<React.ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      {...props}
    >
      <path d='M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z' />
      <path
        d='M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061'
        fill='none'
      />
    </svg>
  );
}

function MoonIcon(props: Readonly<React.ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' {...props}>
      <path
        d='M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

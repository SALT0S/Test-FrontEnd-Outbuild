'use client';

import * as Headless from '@headlessui/react';
import clsx from 'clsx';
import { LayoutGroup } from 'framer-motion';
import React, { forwardRef, useId } from 'react';
import { TouchTarget } from '../button';
import { Link } from '../link';

export function Navbar({ className, ...props }: React.ComponentPropsWithoutRef<'nav'>) {
  return <nav {...props} className={clsx(className, 'flex flex-1 items-center gap-4 py-2.5')} />;
}

export function NavbarSection({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const id = useId();

  return (
    <LayoutGroup id={id}>
      <div {...props} className={clsx(className, 'flex items-center gap-3')} />
    </LayoutGroup>
  );
}

export function NavbarSpacer({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div aria-hidden='true' {...props} className={clsx(className, '-ml-4 flex-1')} />;
}

export const NavbarItem = forwardRef(function NavbarItem(
  {
    current,
    className,
    children,
    isHeading = false,
    ...props
  }: {
    current?: boolean;
    className?: string;
    children: React.ReactNode;
    isHeading?: boolean;
  } & (Omit<Headless.ButtonProps, 'className'> | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>),
  ref: React.ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
) {
  const classes = clsx(
    // Base
    'relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-xl/8 font-medium text-zinc-500 sm:text-lg/8',
    // Heading style
    isHeading && 'text-2xl/8 font-semibold sm:text-xl/8',
    // Leading icon/icon-only
    'data-[slot=icon]:*:size-6 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:fill-zinc-500 sm:data-[slot=icon]:*:size-5',
    // Trailing icon (down chevron or similar)
    'data-[slot=icon]:last:[&:not(:nth-child(2))]:*:ml-auto data-[slot=icon]:last:[&:not(:nth-child(2))]:*:size-5 sm:data-[slot=icon]:last:[&:not(:nth-child(2))]:*:size-4',
    // Avatar
    'data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-7 data-[slot=avatar]:*:[--avatar-radius:theme(borderRadius.DEFAULT)] data-[slot=avatar]:*:[--ring-opacity:10%] sm:data-[slot=avatar]:*:size-6',
    // Hover
    'data-[hover]:bg-zinc-950/5 data-[slot=icon]:*:data-[hover]:fill-zinc-950',
    // Active
    current ? 'text-zinc-950 dark:text-white' : 'dark:text-zinc-400',
    'data-[slot=icon]:*:data-[active]:fill-zinc-950',
    // Dark mode
    'dark:data-[slot=icon]:*:fill-zinc-400',
    'dark:data-[hover]:bg-white/5 dark:data-[slot=icon]:*:data-[hover]:fill-white',
    'dark:data-[active]:bg-white/5 dark:data-[slot=icon]:*:data-[active]:fill-white'
  );

  return (
    <span className={clsx(className, 'relative')}>
      {'href' in props ? (
        <Link
          {...props}
          className={classes}
          data-current={current ? 'true' : undefined}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
          <TouchTarget>{children}</TouchTarget>
        </Link>
      ) : (
        <Headless.Button
          {...props}
          className={clsx('cursor-default', classes)}
          data-current={current ? 'true' : undefined}
          ref={ref}
        >
          <TouchTarget>{children}</TouchTarget>
        </Headless.Button>
      )}
    </span>
  );
});

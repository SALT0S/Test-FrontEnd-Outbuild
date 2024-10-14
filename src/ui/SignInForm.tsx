'use client';

import { Button } from '@/components/button';
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from '@/components/fieldset';
import { Input } from '@/components/input';
import { SidebarLabel } from '@/components/navigation/sidebar';
import { login } from '@/lib/authenticate';
import { useTheme } from 'next-themes';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { AiOutlineLoading } from 'react-icons/ai';

interface Props {
  translations: {
    email_address: string;
    password: string;
    sign_in: string;
    signing_in: string;
    invalid_login_credentials: string;
    couldnt_connect_to_the_server_please_try_again: string;
    toggle_theme: string;
  };
}

export default function SignInForm({ translations }: Readonly<Props>) {
  const [state, action] = useFormState(login, undefined);

  return (
    <form className='space-y-6' action={action}>
      <Fieldset>
        <FieldGroup>
          <Field>
            <Label>{translations.email_address}</Label>
            <Input name='email_address' type='email' required invalid={!!state?.errors?.email} />
            {state?.errors?.email && (
              <ErrorMessage>
                <ul>
                  {state.errors.email.map((error, index) => (
                    <li key={index}>- {error}</li>
                  ))}
                </ul>
              </ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>{translations.password}</Label>
            <Input name='password' type='password' required invalid={!!state?.errors?.password} />
            {state?.errors?.password && (
              <ErrorMessage>
                <ul>
                  {state.errors.password.map((error, index) => (
                    <li key={index}>- {error}</li>
                  ))}
                </ul>
              </ErrorMessage>
            )}
          </Field>
        </FieldGroup>
      </Fieldset>

      <div className='mt-8'>
        <LoginButton sign_in={translations.sign_in} signing_in={translations.signing_in} />

        {state?.message === 'invalid_login_credentials' && (
          <p className='mt-3 text-base/6 text-red-600 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-red-500'>
            {translations.invalid_login_credentials}
          </p>
        )}

        {state?.message === 'couldnt_connect_to_the_server_please_try_again' && (
          <p className='mt-3 text-base/6 text-red-600 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-red-500'>
            {translations.couldnt_connect_to_the_server_please_try_again}
          </p>
        )}
      </div>

      <ToggleTheme toggle_theme={translations.toggle_theme} />
    </form>
  );
}

export function LoginButton({ sign_in, signing_in }: { sign_in: string; signing_in: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' className='w-full' aria-disabled={pending} disabled={pending}>
      {pending ? signing_in : sign_in}
      <AiOutlineLoading className={pending ? 'h-4 w-4 animate-spin' : 'hidden'} aria-hidden='true' />
    </Button>
  );
}

export function ToggleTheme({ toggle_theme }: { toggle_theme: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

  return (
    <Button className='mt-8 w-full' outline onClick={() => setTheme(otherTheme)}>
      <SunIcon className='h-4 w-4 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-sky-50 [@media(prefers-color-scheme:dark)]:stroke-sky-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-sky-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-sky-600' />
      <MoonIcon className='hidden h-4 w-4 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-sky-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-sky-500' />
      <SidebarLabel>{toggle_theme}</SidebarLabel>
    </Button>
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

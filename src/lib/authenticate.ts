'use server';

import { AUTHENTICATION_COOKIE } from '@/auth/auth-cookie';
import { FormState, signInSchema } from '@/lib/zod';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = signInSchema.safeParse({
    email: formData.get('email_address'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${process.env.API_AUTH_URL}/api/admin/auth/token`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: formData.get('email_address'),
      password: formData.get('password'),
    }),
  });

  if (!response.ok) {
    return {
      message: 'invalid_login_credentials',
    };
  }

  await setAuthCookie(response);
  redirect('/dashboard');
}

const setAuthCookie = async (response: Response) => {
  const data = await response.json();

  if (data && data.access_token) {
    cookies().set({
      name: AUTHENTICATION_COOKIE,
      value: data.access_token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(data.access_token).exp! * 1000),
    });
  }
};

export default async function logout() {
  cookies().delete(AUTHENTICATION_COOKIE);
  redirect('/auth/sign-in');
}

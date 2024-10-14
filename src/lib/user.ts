'use server';

import { AUTHENTICATION_COOKIE } from '@/auth/auth-cookie';
import { UserInterface } from '@/interfaces/user.interface';
import { cookies } from 'next/headers';

export async function getCurrentUser(): Promise<UserInterface | null> {
  try {
    const response = await fetch(`${process.env.API_AUTH_URL}/api/admin/auth`, {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get(AUTHENTICATION_COOKIE)?.value}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const { user } = await response.json();

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

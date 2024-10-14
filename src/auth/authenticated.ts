import { AUTHENTICATION_COOKIE } from '@/auth/auth-cookie';
import { cookies } from 'next/headers';

export default function isAuthenticated() {
  return !!cookies().get(AUTHENTICATION_COOKIE)?.value;
}

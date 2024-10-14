export const dynamic = 'force-dynamic';
import { user } from '@/data/user';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SECRET_KEY = process.env.AUTH_SECRET || 'your-secret-key';

function base64urlEncode(buffer: Buffer) {
  return buffer.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (email === user.email && password === user.password) {
      const header = {
        alg: 'HS256',
        typ: 'JWT',
      };

      const payload = {
        id: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      };

      const base64Header = base64urlEncode(Buffer.from(JSON.stringify(header)));
      const base64Payload = base64urlEncode(Buffer.from(JSON.stringify(payload)));

      const data = `${base64Header}.${base64Payload}`;

      const crypto = await import('crypto');
      const signature = crypto.createHmac('sha256', SECRET_KEY).update(data).digest();
      const base64Signature = base64urlEncode(signature);

      const token = `${data}.${base64Signature}`;

      const response = NextResponse.json({ access_token: token });
      response.cookies.set({
        name: 'Authentication',
        value: token,
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60,
      });

      return response;
    } else {
      return NextResponse.json({ message: 'invalid_login_credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'couldnt_connect_to_the_server_please_try_again' }, { status: 500 });
  }
}

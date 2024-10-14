export const dynamic = 'force-dynamic';
import { user } from '@/data/user';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SECRET_KEY = process.env.AUTH_SECRET || 'your-secret-key';

function base64urlDecode(str: string) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');

  const pad = str.length % 4;
  if (pad) {
    str += '='.repeat(4 - pad);
  }

  return Buffer.from(str, 'base64');
}

function base64urlEncode(buffer: Buffer) {
  return buffer.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export async function GET() {
  try {
    const headersList = headers();
    const authHeader = headersList.get('Authorization');
    const cookieStore = cookies();

    let token: string | null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      token = cookieStore.get('Authentication')?.value || null;
    }

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const [headerEncoded, payloadEncoded, signatureEncoded] = token.split('.');

    if (!headerEncoded || !payloadEncoded || !signatureEncoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const data = `${headerEncoded}.${payloadEncoded}`;

    const crypto = await import('crypto');
    const expectedSignature = crypto.createHmac('sha256', SECRET_KEY).update(data).digest();
    const expectedSignatureEncoded = base64urlEncode(expectedSignature);

    if (expectedSignatureEncoded !== signatureEncoded) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    const payloadBuffer = base64urlDecode(payloadEncoded);
    const payloadJson = payloadBuffer.toString('utf-8');
    const payload = JSON.parse(payloadJson);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return NextResponse.json({ message: 'Token expired' }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userData } = user;

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

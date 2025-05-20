import { NextResponse } from 'next/server';
import { API_URL } from '../../../../utils/config';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const data = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const { session } = await data.json();

  if (!session || !session.access_token) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set('access_token', session.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 dia
  });

  return response;
}

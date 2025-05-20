import { NextResponse } from 'next/server';
import { API_URL } from '@/utils/config';

export async function POST() {
  await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  const response = NextResponse.json({ success: true });

  return response;
}

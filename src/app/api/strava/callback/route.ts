import { exchangeCodeForToken } from '@/lib/actions/strava.actions';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) return NextResponse.redirect('/sign-in?error=missing_code');

  const tokenData = await exchangeCodeForToken(code);
  // Store tokenData in session/cookie (implementation depends on your auth system)
  // For demo, redirect to dashboard with token in query (not secure for production)
  return NextResponse.redirect(
    `/dashboard?access_token=${tokenData.access_token}`
  );
}

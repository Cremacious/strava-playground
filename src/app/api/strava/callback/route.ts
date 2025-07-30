import { exchangeCodeForToken } from '@/lib/actions/strava.actions';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return NextResponse.redirect(
      new URL('/sign-in?error=missing_code', url.origin)
    );
  }

  try {
    const tokenData = await exchangeCodeForToken(code);
    if (!tokenData || !tokenData.access_token) {
      return NextResponse.redirect(
        new URL('/sign-in?error=token_failed', url.origin)
      );
    }
    return NextResponse.redirect(
      new URL(`/dashboard/sync?access_token=${tokenData.access_token}`, url.origin)
    );
  } catch (error) {
    console.error('Strava token exchange failed:', error);
    return NextResponse.redirect(
      new URL('/sign-in?error=server_error', url.origin)
    );
  }
}

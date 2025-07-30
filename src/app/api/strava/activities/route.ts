import { getStravaActivities } from '@/lib/actions/strava.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.nextUrl.searchParams.get('access_token');
  if (!accessToken)
    return NextResponse.json({ error: 'No access token' }, { status: 401 });

  const activities = await getStravaActivities(accessToken);
  return NextResponse.json(activities);
}

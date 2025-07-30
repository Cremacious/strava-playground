import { getStravaActivities } from '@/lib/actions/strava.actions';
import prisma from '@/lib/prisma'; 
import { NextRequest, NextResponse } from 'next/server';
import { Activity } from '@/lib/types/activity.type';

export async function POST(request: NextRequest) {
  const { accessToken, userId } = await request.json();

  const activities: Activity[] = await getStravaActivities(accessToken);

  const latest = await prisma.activity.findFirst({
    where: { userId },
    orderBy: { startDate: 'desc' },
  });

  const newActivities = latest
    ? activities.filter((a) => new Date(a.startDate) > latest.startDate)
    : activities;

  for (const act of newActivities) {
    await prisma.activity.upsert({
      where: { id_userId: { id: act.id.toString(), userId } },
      update: {
        name: act.name,
        distance: act.distance,
      },
      create: {
        id: act.id.toString(),
        userId,
        name: act.name,
        distance: act.distance,
        movingTime: act.movingTime,
        elapsedTime: act.elapsedTime,
        type: act.type,
        sportType: act.sportType,
        startDate: new Date(act.startDate),
        startDateLocal: new Date(act.startDateLocal),
        timezone: act.timezone,
        utcOffset: act.utcOffset,
        averageSpeed: act.averageSpeed,
        maxSpeed: act.maxSpeed,
        totalElevationGain: act.totalElevationGain,
        mapId: act.map?.id,
        summaryPolyline: act.map?.summary_polyline,
        resourceState: act.resourceState ?? 2,
        achievementCount: act.achievementCount ?? 0,
        kudosCount: act.kudosCount ?? 0,
        commentCount: act.commentCount ?? 0,
        athleteCount: act.athleteCount ?? 1,
        externalId: act.externalId ?? '',
        uploadId:
          act.uploadId != null
            ? typeof act.uploadId === 'string'
              ? Number(act.uploadId)
              : act.uploadId
            : null,
        startLat: act.startLat,
        endLat: act.endLat,
        locationCity: act.locationCity ?? '',
        locationState: act.locationState ?? '',
        locationCountry: act.locationCountry ?? '',
        photoCount: act.photoCount ?? 0,
        trainer: act.trainer ?? false,
        commute: act.commute ?? false,
        manual: act.manual ?? false,
        private: act.private ?? false,
        flagged: act.flagged ?? false,
        workoutType: act.workoutType ?? null,
        hasHeartrate: act.hasHeartrate ?? false,
        averageHeartrate: act.averageHeartrate ?? null,
        maxHeartrate: act.maxHeartrate ?? null,
        heartrateOptOut: act.heartrateOptOut ?? false,
        displayHideHeartrateOption: act.displayHideHeartrateOption ?? false,
        fromAcceptedTag: act.fromAcceptedTag ?? false,
        prCount: act.prCount ?? 0,
        totalPhotoCount: act.totalPhotoCount ?? 0,
        hasKudoed: act.hasKudoed ?? false,
      },
    });
  }

  return NextResponse.json({ synced: newActivities.length });
}

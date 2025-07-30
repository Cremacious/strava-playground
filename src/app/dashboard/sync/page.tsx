import { getStravaActivities } from '@/lib/actions/strava.actions';
import SyncStravaButton from '@/components/ui/sync-strava';
import { Activity } from '@/lib/types/activity.type';

export default async function SyncPage({ searchParams }: { searchParams: Record<string, string> }) {
  const accessToken = searchParams.access_token;
  const activities = await getStravaActivities(accessToken);

  return (
    <main>
      <h1>Sync Strava</h1>
      <SyncStravaButton />
      {accessToken && (
        <div>
          <h2>Your Strava Activities</h2>
          <ul>
            {activities.map((activity: Activity) => (
              <li key={activity.id}>
                {activity.name} - {new Date(activity.startDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
    
  );
}

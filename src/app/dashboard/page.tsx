import SyncStravaButton from '@/components/ui/sync-strava';

import {getCurrentUser} from '@/lib/auth-server';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  console.log('user', user);
  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-black">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <h1>Your Strava Activities</h1>
      <SyncStravaButton />
      <ul></ul>
    </main>
  );
}

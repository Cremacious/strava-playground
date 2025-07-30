import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/auth-server';
import Link from 'next/link';
export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <main>
      <h1>Dashboard</h1>
      <h2>Your Strava Activities</h2>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <Link href="/dashboard/sync">
            <Button className="bg-blue-500 text-white p-2 rounded">Sync Strava</Button>
          </Link>
        </>
      ) : (
        <p>
          Please <a href="/sign-in">sign in</a> to view your activities.
        </p>
      )}
    </main>
  );
}

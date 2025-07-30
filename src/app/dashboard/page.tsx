'use client';

import { useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { useEffect, useState } from 'react';

export default function DashboardPage({ searchParams }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [activities, setActivities] = useState([]);
  const accessToken = searchParams.access_token;

  useEffect(() => {
    if (accessToken) {
      fetch(`/api/strava/activities?access_token=${accessToken}`)
        .then((res) => res.json())
        .then(setActivities);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/sign-in');
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user.name || 'User'}!</p>
      <p>Email: {user.email}</p>
      {/* add-start: sign out button */}
      <button
        onClick={() => signOut()}
        className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
      >
        Sign Out
      </button>
      <h1>Your Strava Activities</h1>
      <ul>
        {activities.map((act: any) => (
          <li key={act.id}>
            {act.name} - {act.distance}m
          </li>
        ))}
      </ul>
    </main>
  );
}

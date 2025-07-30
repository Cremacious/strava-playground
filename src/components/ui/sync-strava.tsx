'use client';
import { Button } from './button';

export default function SyncStravaButton() {


    
  return (
    <div className="bg-orange-400 p-4 rounded-md text-center">
      <Button asChild>
        <a href="/api/strava/auth">Sync Strava</a>
      </Button>
    </div>
  );
}

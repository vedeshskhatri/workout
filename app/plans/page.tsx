import { WorkoutPlansManager } from '@/components/WorkoutPlansManager';
import { Settings } from 'lucide-react';

export default async function PlansPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Workout Plans</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your Plan A and Plan B exercises
        </p>
      </div>

      <WorkoutPlansManager />
    </div>
  );
}

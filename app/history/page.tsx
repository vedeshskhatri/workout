import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { WorkoutSessionModel } from '@/models/WorkoutSession';
import { WorkoutHistoryList } from '@/components/WorkoutHistoryList';
import { Calendar as CalendarIcon } from 'lucide-react';

export default async function HistoryPage() {
  await connectDB();

  // Get or create user
  let user = await UserModel.findOne({});
  if (!user) {
    user = await UserModel.create({
      email: 'vedesh@workout.app',
      name: 'Vedesh',
      experienceLevel: 'intermediate',
    });
  }

  const workouts = await WorkoutSessionModel.find({ userId: user._id })
    .sort({ date: -1 })
    .limit(50)
    .lean();

  const serializedWorkouts = workouts.map((w) => ({
    ...w,
    _id: w._id.toString(),
    userId: w.userId.toString(),
    date: w.date.toISOString(),
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  }));

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <CalendarIcon className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Workout History</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Review your past training sessions
        </p>
      </div>

      <WorkoutHistoryList workouts={serializedWorkouts} />
    </div>
  );
}

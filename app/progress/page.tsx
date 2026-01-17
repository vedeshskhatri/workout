import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { WorkoutSessionModel } from '@/models/WorkoutSession';
import { ProgressCharts } from '@/components/ProgressCharts';
import { TrendingUp } from 'lucide-react';

export default async function ProgressPage() {
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
    .sort({ date: 1 })
    .lean();

  // Process workout data for charts
  const exerciseProgressMap = new Map<string, any[]>();

  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      const key = exercise.exerciseName.toLowerCase();
      if (!exerciseProgressMap.has(key)) {
        exerciseProgressMap.set(key, []);
      }

      const maxWeight = Math.max(...exercise.sets.map((s) => s.weight));
      const totalVolume = exercise.sets.reduce(
        (sum, set) => sum + set.reps * set.weight,
        0
      );
      const avgRpe = exercise.sets.filter(s => s.rpe).length > 0
        ? exercise.sets.filter(s => s.rpe).reduce((sum, s) => sum + (s.rpe || 0), 0) /
          exercise.sets.filter(s => s.rpe).length
        : undefined;

      exerciseProgressMap.get(key)!.push({
        date: workout.date.toISOString(),
        maxWeight,
        totalVolume,
        averageRpe: avgRpe,
        exerciseName: exercise.exerciseName,
        muscleGroup: exercise.muscleGroup,
      });
    });
  });

  const progressData = Array.from(exerciseProgressMap.entries()).map(
    ([key, history]) => ({
      exerciseName: history[0].exerciseName,
      muscleGroup: history[0].muscleGroup,
      history,
    })
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Progress Tracking</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Visualize your strength gains over time
        </p>
      </div>

      <ProgressCharts progressData={progressData} />
    </div>
  );
}

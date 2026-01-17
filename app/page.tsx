import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { WorkoutSessionModel } from '@/models/WorkoutSession';
import { WorkoutPlanModel } from '@/models/WorkoutPlan';
import { getCurrentPlan } from '@/lib/workout-plan';
import { getCurrentRecoveryStatus } from '@/lib/recovery-estimation';
import { DashboardStats } from '@/components/DashboardStats';
import { RecoveryCard } from '@/components/RecoveryCard';
import { QuickStartCard } from '@/components/QuickStartCard';
import { UpcomingWorkouts } from '@/components/UpcomingWorkouts';
import { startOfWeek, startOfMonth, endOfWeek, endOfMonth } from 'date-fns';
import Link from 'next/link';
import { Dumbbell, TrendingUp, Calendar } from 'lucide-react';

export default async function HomePage() {
  await connectDB();

  // Get or create user with actual stats
  let user = await UserModel.findOne({});
  
  if (!user) {
    // Create user with your actual stats for better recovery calculations
    user = await UserModel.create({
      email: 'vedesh@workout.app',
      name: 'Vedesh',
      experienceLevel: 'intermediate', // 2+ years experience
    });
  } else if (user.email === 'default@workout.app') {
    // Update default user with actual info
    user.name = 'Vedesh';
    user.email = 'vedesh@workout.app';
    user.experienceLevel = 'intermediate';
    await user.save();
  }

  const userId = user._id.toString();
  const currentPlan = getCurrentPlan();

  // Get workout statistics
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const [
    workoutsThisWeek,
    workoutsThisMonth,
    recentWorkouts,
  ] = await Promise.all([
    WorkoutSessionModel.countDocuments({
      userId,
      date: { $gte: weekStart, $lte: weekEnd },
    }),
    WorkoutSessionModel.countDocuments({
      userId,
      date: { $gte: monthStart, $lte: monthEnd },
    }),
    WorkoutSessionModel.find({ userId })
      .sort({ date: -1 })
      .limit(20)
      .lean(),
  ]);

  // Calculate total volume
  const workoutsThisWeekData = await WorkoutSessionModel.find({
    userId,
    date: { $gte: weekStart, $lte: weekEnd },
  }).lean();

  const workoutsThisMonthData = await WorkoutSessionModel.find({
    userId,
    date: { $gte: monthStart, $lte: monthEnd },
  }).lean();

  const calculateTotalVolume = (workouts: any[]) => {
    return workouts.reduce((total, workout) => {
      return total + workout.exercises.reduce((exerciseTotal: number, exercise: any) => {
        return exerciseTotal + exercise.sets.reduce((setTotal: number, set: any) => {
          return setTotal + (set.reps * set.weight);
        }, 0);
      }, 0);
    }, 0);
  };

  const volumeThisWeek = calculateTotalVolume(workoutsThisWeekData);
  const volumeThisMonth = calculateTotalVolume(workoutsThisMonthData);

  // Get recovery recommendations
  const recoveryEstimates = getCurrentRecoveryStatus(
    recentWorkouts.map(w => ({
      ...w,
      _id: w._id.toString(),
      userId: w.userId.toString(),
      date: new Date(w.date),
      createdAt: new Date(w.createdAt),
      updatedAt: new Date(w.updatedAt),
    })),
    user.experienceLevel
  );

  // Get workout plans for upcoming schedule
  const [planA, planB] = await Promise.all([
    WorkoutPlanModel.findOne({ userId, planType: 'A' }).lean(),
    WorkoutPlanModel.findOne({ userId, planType: 'B' }).lean(),
  ]);

  const workoutPlans = {
    planA: planA?.exercises || [],
    planB: planB?.exercises || [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
              <Dumbbell className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-5xl font-black mb-2">Hey {user.name}! 💪</h1>
              <p className="text-blue-100 text-lg">
                Week <span className="font-bold text-white">{currentPlan}</span> • Ready to dominate your workout?
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <span className="text-sm text-blue-100">Height:</span>
              <span className="ml-2 font-bold">183cm</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <span className="text-sm text-blue-100">Weight:</span>
              <span className="ml-2 font-bold">75kg</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <span className="text-sm text-blue-100">Age:</span>
              <span className="ml-2 font-bold">18yo</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <span className="text-sm text-blue-100">Experience:</span>
              <span className="ml-2 font-bold capitalize">{user.experienceLevel} (2+ years)</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/workout/new"
            className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-sm w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Dumbbell className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Start Workout</h3>
              <p className="text-green-100">Log today's training session</p>
            </div>
          </Link>
          
          <Link
            href="/history"
            className="group relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-sm w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-2">History</h3>
              <p className="text-orange-100">Review past workouts</p>
            </div>
          </Link>

          <Link
            href="/progress"
            className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-sm w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Progress</h3>
              <p className="text-purple-100">Track your gains</p>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <DashboardStats
            workoutsThisWeek={workoutsThisWeek}
            workoutsThisMonth={workoutsThisMonth}
            volumeThisWeek={volumeThisWeek}
            volumeThisMonth={volumeThisMonth}
          />
        </div>

        {/* Upcoming Workouts */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <UpcomingWorkouts workoutPlans={workoutPlans} />
        </div>

        {/* Recovery Status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-xl">
              <span className="text-2xl">🔥</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Recovery Status
            </h2>
          </div>
          {recoveryEstimates.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Ready to Begin?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Start tracking your workouts to unlock personalized recovery insights and optimize your training!
              </p>
              <Link
                href="/workout/new"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Log Your First Workout
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recoveryEstimates.map((estimate) => (
                <RecoveryCard key={estimate.muscleGroup} estimate={estimate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

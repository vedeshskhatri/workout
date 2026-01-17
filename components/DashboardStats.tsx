'use client';

import { Activity, Calendar, TrendingUp, Zap } from 'lucide-react';

interface DashboardStatsProps {
  workoutsThisWeek: number;
  workoutsThisMonth: number;
  volumeThisWeek: number;
  volumeThisMonth: number;
}

export function DashboardStats({
  workoutsThisWeek,
  workoutsThisMonth,
  volumeThisWeek,
  volumeThisMonth,
}: DashboardStatsProps) {
  const formatVolume = (volume: number) => {
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}k`;
    }
    return volume.toFixed(0);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">This Week</p>
        </div>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {workoutsThisWeek}
        </p>
        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">workouts</p>
      </div>

      <div className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-sm font-medium text-green-900 dark:text-green-100">This Month</p>
        </div>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
          {workoutsThisMonth}
        </p>
        <p className="text-xs text-green-700 dark:text-green-300 mt-1">workouts</p>
      </div>

      <div className="p-6 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <p className="text-sm font-medium text-purple-900 dark:text-purple-100">Volume (Week)</p>
        </div>
        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
          {formatVolume(volumeThisWeek)}
        </p>
        <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">kg total</p>
      </div>

      <div className="p-6 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Volume (Month)</p>
        </div>
        <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
          {formatVolume(volumeThisMonth)}
        </p>
        <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">kg total</p>
      </div>
    </div>
  );
}

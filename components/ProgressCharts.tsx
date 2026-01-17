'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface ProgressChartsProps {
  progressData: {
    exerciseName: string;
    muscleGroup: string;
    history: {
      date: string;
      maxWeight: number;
      totalVolume: number;
      averageRpe?: number;
    }[];
  }[];
}

export function ProgressCharts({ progressData }: ProgressChartsProps) {
  const [selectedExercise, setSelectedExercise] = useState<string>(
    progressData[0]?.exerciseName || ''
  );
  const [chartType, setChartType] = useState<'weight' | 'volume'>('weight');

  const selectedData = progressData.find(
    (p) => p.exerciseName === selectedExercise
  );

  if (progressData.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <p className="text-gray-500">
          No workout data available yet. Start logging workouts to see your progress!
        </p>
      </div>
    );
  }

  const chartData = selectedData?.history.map((h) => ({
    date: format(new Date(h.date), 'MMM dd'),
    weight: h.maxWeight,
    volume: h.totalVolume,
    rpe: h.averageRpe,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Exercise</label>
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="w-full md:w-96 px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            >
              {progressData.map((p) => (
                <option key={p.exerciseName} value={p.exerciseName}>
                  {p.exerciseName} ({p.history.length} sessions)
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setChartType('weight')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                chartType === 'weight'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Max Weight
            </button>
            <button
              onClick={() => setChartType('volume')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                chartType === 'volume'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Total Volume
            </button>
          </div>
        </div>

        {chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              {chartType === 'weight' ? (
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Max Weight (kg)"
                  dot={{ r: 4 }}
                />
              ) : (
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  name="Total Volume (kg)"
                  dot={{ r: 4 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No data available for this exercise
          </div>
        )}
      </div>

      {selectedData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Total Sessions
            </h3>
            <p className="text-3xl font-bold text-primary">{selectedData.history.length}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Current Max Weight
            </h3>
            <p className="text-3xl font-bold text-primary">
              {selectedData.history[selectedData.history.length - 1]?.maxWeight || 0} kg
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Weight Progression
            </h3>
            <p className="text-3xl font-bold text-green-600">
              +
              {(
                (selectedData.history[selectedData.history.length - 1]?.maxWeight || 0) -
                (selectedData.history[0]?.maxWeight || 0)
              ).toFixed(1)}{' '}
              kg
            </p>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">All Exercises Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {progressData.map((exercise) => {
            const firstSession = exercise.history[0];
            const lastSession = exercise.history[exercise.history.length - 1];
            const improvement = lastSession.maxWeight - firstSession.maxWeight;

            return (
              <div
                key={exercise.exerciseName}
                className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer"
                onClick={() => setSelectedExercise(exercise.exerciseName)}
              >
                <h4 className="font-semibold mb-1">{exercise.exerciseName}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {exercise.history.length} sessions
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span>{firstSession.maxWeight} kg</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-semibold">{lastSession.maxWeight} kg</span>
                </div>
                {improvement > 0 && (
                  <p className="text-xs text-green-600 mt-1">+{improvement.toFixed(1)} kg</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

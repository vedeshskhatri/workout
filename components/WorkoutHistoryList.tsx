'use client';

import { useState } from 'react';
import { WorkoutSession } from '@/types';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MUSCLE_GROUP_LABELS } from '@/lib/constants';

interface WorkoutHistoryListProps {
  workouts: any[];
}

export function WorkoutHistoryList({ workouts }: WorkoutHistoryListProps) {
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);
  const [filterPlan, setFilterPlan] = useState<'all' | 'A' | 'B'>('all');

  const filteredWorkouts = workouts.filter((w) => {
    if (filterPlan === 'all') return true;
    return w.planType === filterPlan;
  });

  const toggleWorkout = (id: string) => {
    setExpandedWorkout(expandedWorkout === id ? null : id);
  };

  const calculateTotalVolume = (exercises: any[]) => {
    return exercises.reduce((total, exercise) => {
      return total + exercise.sets.reduce((setTotal: number, set: any) => {
        return setTotal + (set.reps * set.weight);
      }, 0);
    }, 0);
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <label className="font-medium">Filter by Plan:</label>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterPlan('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterPlan === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterPlan('A')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterPlan === 'A'
                ? 'bg-planA text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Plan A
          </button>
          <button
            onClick={() => setFilterPlan('B')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterPlan === 'B'
                ? 'bg-planB text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Plan B
          </button>
        </div>
      </div>

      {filteredWorkouts.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-gray-500">No workouts found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredWorkouts.map((workout) => {
            const isExpanded = expandedWorkout === workout._id;
            const totalVolume = calculateTotalVolume(workout.exercises);

            return (
              <div
                key={workout._id}
                className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800"
              >
                <button
                  onClick={() => toggleWorkout(workout._id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${
                        workout.planType === 'A' ? 'bg-planA' : 'bg-planB'
                      }`}
                    >
                      {workout.planType}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">
                        {format(new Date(workout.date), 'EEEE, MMMM d, yyyy')}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {workout.exercises.length} exercises • {totalVolume.toFixed(0)} kg total volume
                        {workout.duration && ` • ${workout.duration} min`}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t">
                    {workout.overallIntensity && (
                      <div className="mb-4 flex items-center gap-2">
                        <span className="text-sm font-medium">Intensity:</span>
                        <span className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 capitalize">
                          {workout.overallIntensity}
                        </span>
                        {workout.sleepQuality && (
                          <>
                            <span className="text-sm font-medium ml-4">Sleep:</span>
                            <span className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 capitalize">
                              {workout.sleepQuality}
                            </span>
                          </>
                        )}
                      </div>
                    )}

                    <div className="space-y-4">
                      {workout.exercises.map((exercise: any, idx: number) => {
                        const exerciseVolume = exercise.sets.reduce(
                          (sum: number, set: any) => sum + set.reps * set.weight,
                          0
                        );

                        return (
                          <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">{exercise.exerciseName}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {MUSCLE_GROUP_LABELS[exercise.muscleGroup] || exercise.muscleGroup}
                                </p>
                              </div>
                              <p className="text-sm font-medium">
                                {exerciseVolume.toFixed(0)} kg
                              </p>
                            </div>

                            <div className="space-y-1">
                              {exercise.sets.map((set: any, setIdx: number) => (
                                <div
                                  key={setIdx}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Set {set.setNumber}
                                  </span>
                                  <span>
                                    {set.reps} reps × {set.weight} kg
                                    {set.rpe && ` @ RPE ${set.rpe}`}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {exercise.notes && (
                              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                                {exercise.notes}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {workout.notes && (
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm font-medium mb-1">Workout Notes:</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {workout.notes}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

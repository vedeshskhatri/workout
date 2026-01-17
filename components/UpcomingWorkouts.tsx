'use client';

import { format, addDays, getISOWeek } from 'date-fns';
import { Calendar, Dumbbell } from 'lucide-react';

interface Exercise {
  exerciseName: string;
  muscleGroup: string;
  targetSets: number;
  targetReps: string;
}

interface WorkoutDay {
  date: Date;
  dayName: string;
  isRestDay: boolean;
  exercises: Exercise[];
  planType: 'A' | 'B';
}

interface UpcomingWorkoutsProps {
  workoutPlans: {
    planA: Exercise[];
    planB: Exercise[];
  };
}

export function UpcomingWorkouts({ workoutPlans }: UpcomingWorkoutsProps) {
  const getUpcomingDays = (): WorkoutDay[] => {
    const days: WorkoutDay[] = [];
    const today = new Date();
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    
    // Show next 7 days
    for (let i = 0; i < 7; i++) {
      const date = addDays(today, i);
      const dayIndex = date.getDay(); // 0 = Sunday, 6 = Saturday
      const dayName = dayNames[dayIndex];
      
      // Determine which plan (A or B) based on ISO week number
      const weekNumber = getISOWeek(date);
      const planType: 'A' | 'B' = weekNumber % 2 === 1 ? 'A' : 'B';
      
      // Sunday is rest day
      const isRestDay = dayIndex === 0;
      
      // Get exercises for this day
      let exercises: Exercise[] = [];
      if (!isRestDay) {
        const plan = planType === 'A' ? workoutPlans.planA : workoutPlans.planB;
        // Filter exercises for this specific day
        exercises = plan.filter((ex: any) => 
          ex.dayOfWeek && ex.dayOfWeek.toUpperCase() === dayName
        );
      }
      
      days.push({
        date,
        dayName: dayName.charAt(0) + dayName.slice(1).toLowerCase(),
        isRestDay,
        exercises,
        planType,
      });
    }
    
    return days;
  };

  const upcomingDays = getUpcomingDays();

  // Group exercises by muscle group
  const getMuscleGroups = (exercises: Exercise[]): string[] => {
    const groups = new Set<string>();
    exercises.forEach(ex => {
      if (ex.muscleGroup) {
        groups.add(ex.muscleGroup.charAt(0).toUpperCase() + ex.muscleGroup.slice(1));
      }
    });
    return Array.from(groups);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Upcoming Workouts</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Your next 7 days schedule</p>
        </div>
      </div>

      <div className="grid gap-4">
        {upcomingDays.map((day, index) => {
          const isToday = index === 0;
          const muscleGroups = getMuscleGroups(day.exercises);
          
          return (
            <div
              key={day.date.toISOString()}
              className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                isToday
                  ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 shadow-lg'
                  : day.isRestDay
                  ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
              }`}
            >
              {isToday && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  TODAY
                </div>
              )}
              
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">{day.dayName}</h3>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                        Week {day.planType}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {format(day.date, 'MMM d, yyyy')}
                    </p>
                  </div>
                  
                  {!day.isRestDay && (
                    <div className="flex items-center gap-2 text-sm">
                      <Dumbbell className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {day.exercises.length} exercises
                      </span>
                    </div>
                  )}
                </div>

                {day.isRestDay ? (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <span className="text-2xl">🏖️</span>
                    <span className="font-medium">Rest Day - Recovery & Regeneration</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {muscleGroups.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {muscleGroups.map(group => (
                          <span
                            key={group}
                            className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300"
                          >
                            {group}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {day.exercises.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <details className="group">
                          <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            View all exercises ({day.exercises.length})
                          </summary>
                          <div className="mt-3 space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                            {day.exercises.map((ex, idx) => (
                              <div
                                key={idx}
                                className="text-sm px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                              >
                                <span className="font-medium">{ex.exerciseName}</span>
                                <span className="text-gray-500 dark:text-gray-400 ml-2">
                                  {ex.targetSets} × {ex.targetReps}
                                </span>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

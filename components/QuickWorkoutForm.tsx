'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format, getISOWeek } from 'date-fns';
import { Check, X, Save, Loader2 } from 'lucide-react';
import { PlanType } from '@/types';

interface Exercise {
  exerciseName: string;
  muscleGroup: string;
  targetSets: number;
  targetReps: string;
}

interface CompletedSet {
  reps: number;
  weight: number;
  rpe: number;
}

interface ExerciseProgress {
  exercise: Exercise;
  completed: boolean;
  sets: CompletedSet[];
  notes: string;
}

interface QuickWorkoutFormProps {
  suggestedPlan: PlanType;
}

export function QuickWorkoutForm({ suggestedPlan }: QuickWorkoutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todaysPlan, setTodaysPlan] = useState<Exercise[]>([]);
  const [progress, setProgress] = useState<ExerciseProgress[]>([]);
  const [sleepQuality, setSleepQuality] = useState<'poor' | 'fair' | 'good' | 'excellent'>('good');
  const [overallIntensity, setOverallIntensity] = useState<'easy' | 'moderate' | 'hard' | 'maximum'>('moderate');

  // Load today's workout plan
  useEffect(() => {
    const loadTodaysPlan = async () => {
      try {
        // Determine which week (A or B) based on ISO week number
        const weekNumber = getISOWeek(new Date());
        const planType = weekNumber % 2 === 1 ? 'A' : 'B';
        
        // Get current day
        const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        const today = dayNames[new Date().getDay()];

        // Fetch the workout plan
        const response = await fetch(`/api/plans?planType=${planType}`);
        const plans = await response.json();
        
        if (plans.length > 0) {
          const plan = plans[0];
          // Filter exercises for today
          const todaysExercises = plan.exercises.filter(
            (ex: any) => ex.dayOfWeek.toUpperCase() === today
          );
          
          setTodaysPlan(todaysExercises);
          setProgress(
            todaysExercises.map((ex: Exercise) => ({
              exercise: ex,
              completed: false,
              sets: [],
              notes: '',
            }))
          );
        }
      } catch (error) {
        console.error('Error loading workout plan:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodaysPlan();
  }, []);

  const toggleExerciseComplete = (index: number) => {
    const updated = [...progress];
    updated[index].completed = !updated[index].completed;
    
    // If marking as complete, auto-fill sets if empty
    if (updated[index].completed && updated[index].sets.length === 0) {
      const targetSets = updated[index].exercise.targetSets;
      updated[index].sets = Array(targetSets).fill(null).map(() => ({
        reps: 10,
        weight: 0,
        rpe: 7,
      }));
    }
    
    setProgress(updated);
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: keyof CompletedSet, value: number) => {
    const updated = [...progress];
    if (!updated[exerciseIndex].sets[setIndex]) {
      updated[exerciseIndex].sets[setIndex] = { reps: 10, weight: 0, rpe: 7 };
    }
    updated[exerciseIndex].sets[setIndex][field] = value;
    setProgress(updated);
  };

  const addSet = (exerciseIndex: number) => {
    const updated = [...progress];
    updated[exerciseIndex].sets.push({ reps: 10, weight: 0, rpe: 7 });
    setProgress(updated);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updated = [...progress];
    updated[exerciseIndex].sets.splice(setIndex, 1);
    setProgress(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Only submit completed exercises
      const completedExercises = progress
        .filter(p => p.completed && p.sets.length > 0)
        .map(p => ({
          exerciseName: p.exercise.exerciseName,
          muscleGroup: p.exercise.muscleGroup,
          sets: p.sets,
          notes: p.notes,
        }));

      if (completedExercises.length === 0) {
        alert('Please complete at least one exercise');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: suggestedPlan,
          date: new Date(),
          exercises: completedExercises,
          overallIntensity,
          sleepQuality,
        }),
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        throw new Error('Failed to save workout');
      }
    } catch (error) {
      console.error('Error saving workout:', error);
      alert('Failed to save workout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const completedCount = progress.filter(p => p.completed).length;
  const totalCount = progress.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (todaysPlan.length === 0) {
    return (
      <div className="text-center p-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-yellow-800 dark:text-yellow-200">
          No workout scheduled for today. Enjoy your rest day! 🏖️
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header with Progress */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Today's Workout</h2>
        <p className="text-blue-100 mb-4">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-semibold">{completedCount} / {totalCount} exercises</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Exercise Checklist */}
      <div className="space-y-4">
        {progress.map((item, exerciseIndex) => (
          <div
            key={exerciseIndex}
            className={`border-2 rounded-xl p-5 transition-all duration-200 ${
              item.completed
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
            }`}
          >
            {/* Exercise Header */}
            <div className="flex items-start gap-4 mb-4">
              <button
                type="button"
                onClick={() => toggleExerciseComplete(exerciseIndex)}
                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  item.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 hover:bg-gray-300'
                }`}
              >
                {item.completed && <Check className="w-5 h-5" />}
              </button>
              
              <div className="flex-grow">
                <h3 className={`font-semibold text-lg ${item.completed ? 'line-through text-gray-500' : ''}`}>
                  {item.exercise.exerciseName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Target: {item.exercise.targetSets} sets × {item.exercise.targetReps} reps • {item.exercise.muscleGroup}
                </p>
              </div>
            </div>

            {/* Set Details (only shown if completed) */}
            {item.completed && (
              <div className="ml-12 space-y-3">
                {item.sets.map((set, setIndex) => (
                  <div key={setIndex} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <span className="font-semibold text-sm text-gray-600 dark:text-gray-400 w-16">
                      Set {setIndex + 1}
                    </span>
                    
                    <input
                      type="number"
                      placeholder="Reps"
                      value={set.reps || ''}
                      onChange={(e) => updateSet(exerciseIndex, setIndex, 'reps', parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 border rounded-lg text-center"
                      min="1"
                    />
                    <span className="text-sm text-gray-500">reps</span>
                    
                    <input
                      type="number"
                      placeholder="Weight"
                      value={set.weight || ''}
                      onChange={(e) => updateSet(exerciseIndex, setIndex, 'weight', parseFloat(e.target.value) || 0)}
                      className="w-24 px-3 py-2 border rounded-lg text-center"
                      min="0"
                      step="0.5"
                    />
                    <span className="text-sm text-gray-500">kg</span>
                    
                    <input
                      type="number"
                      placeholder="RPE"
                      value={set.rpe || ''}
                      onChange={(e) => updateSet(exerciseIndex, setIndex, 'rpe', parseInt(e.target.value) || 7)}
                      className="w-20 px-3 py-2 border rounded-lg text-center"
                      min="1"
                      max="10"
                    />
                    <span className="text-sm text-gray-500">RPE</span>
                    
                    <button
                      type="button"
                      onClick={() => removeSet(exerciseIndex, setIndex)}
                      className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => addSet(exerciseIndex)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Add Set
                </button>

                <textarea
                  placeholder="Notes (optional)"
                  value={item.notes}
                  onChange={(e) => {
                    const updated = [...progress];
                    updated[exerciseIndex].notes = e.target.value;
                    setProgress(updated);
                  }}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  rows={2}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Workout Metadata */}
      <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
        <div>
          <label className="block text-sm font-medium mb-2">Sleep Quality</label>
          <select
            value={sleepQuality}
            onChange={(e) => setSleepQuality(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="poor">😫 Poor</option>
            <option value="fair">😐 Fair</option>
            <option value="good">😊 Good</option>
            <option value="excellent">🌟 Excellent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Overall Intensity</label>
          <select
            value={overallIntensity}
            onChange={(e) => setOverallIntensity(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="hard">Hard</option>
            <option value="maximum">Maximum</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || completedCount === 0}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Saving Workout...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Complete Workout ({completedCount} exercises)
          </>
        )}
      </button>
    </form>
  );
}

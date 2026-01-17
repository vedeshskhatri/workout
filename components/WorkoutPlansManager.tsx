'use client';

import { useState, useEffect } from 'react';
import { PlanType } from '@/types';
import { PRESET_EXERCISES, MUSCLE_GROUPS } from '@/lib/constants';
import { Plus, X, Save } from 'lucide-react';

export function WorkoutPlansManager() {
  const [activePlan, setActivePlan] = useState<PlanType>('A');
  const [planAExercises, setPlanAExercises] = useState<any[]>([]);
  const [planBExercises, setPlanBExercises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const [planARes, planBRes] = await Promise.all([
        fetch('/api/plans?planType=A'),
        fetch('/api/plans?planType=B'),
      ]);

      const planAData = await planARes.json();
      const planBData = await planBRes.json();

      setPlanAExercises(planAData.plan?.exercises || []);
      setPlanBExercises(planBData.plan?.exercises || []);
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentExercises = activePlan === 'A' ? planAExercises : planBExercises;
  const setCurrentExercises = activePlan === 'A' ? setPlanAExercises : setPlanBExercises;

  const addExercise = () => {
    setCurrentExercises([
      ...currentExercises,
      {
        id: Date.now().toString(),
        name: '',
        muscleGroup: 'chest',
        targetSets: 3,
        targetReps: '8-12',
        notes: '',
      },
    ]);
  };

  const removeExercise = (id: string) => {
    setCurrentExercises(currentExercises.filter((ex) => ex.id !== id));
  };

  const updateExercise = (id: string, field: string, value: any) => {
    setCurrentExercises(
      currentExercises.map((ex) =>
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    );
  };

  const savePlan = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: activePlan,
          exercises: currentExercises,
        }),
      });
      alert('Plan saved successfully!');
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Failed to save plan');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading plans...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActivePlan('A')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activePlan === 'A'
              ? 'bg-planA text-white'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Plan A
        </button>
        <button
          onClick={() => setActivePlan('B')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activePlan === 'B'
              ? 'bg-planB text-white'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Plan B
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Plan {activePlan} Exercises</h2>
          <button
            onClick={addExercise}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Exercise
          </button>
        </div>

        {currentExercises.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-gray-500 mb-4">No exercises in this plan yet</p>
            <button
              onClick={addExercise}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Add Your First Exercise
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {currentExercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold">Exercise {index + 1}</h3>
                  <button
                    onClick={() => removeExercise(exercise.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Exercise Name
                    </label>
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) =>
                        updateExercise(exercise.id, 'name', e.target.value)
                      }
                      list="preset-exercises"
                      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                      placeholder="e.g., Bench Press"
                    />
                    <datalist id="preset-exercises">
                      {PRESET_EXERCISES.map((preset) => (
                        <option key={preset.name} value={preset.name} />
                      ))}
                    </datalist>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Muscle Group
                    </label>
                    <select
                      value={exercise.muscleGroup}
                      onChange={(e) =>
                        updateExercise(exercise.id, 'muscleGroup', e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                    >
                      {MUSCLE_GROUPS.map((group) => (
                        <option key={group} value={group}>
                          {group.charAt(0).toUpperCase() + group.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Target Sets
                    </label>
                    <input
                      type="number"
                      value={exercise.targetSets}
                      onChange={(e) =>
                        updateExercise(
                          exercise.id,
                          'targetSets',
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Target Reps
                    </label>
                    <input
                      type="text"
                      value={exercise.targetReps}
                      onChange={(e) =>
                        updateExercise(exercise.id, 'targetReps', e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                      placeholder="e.g., 8-12"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Notes (optional)
                    </label>
                    <input
                      type="text"
                      value={exercise.notes || ''}
                      onChange={(e) =>
                        updateExercise(exercise.id, 'notes', e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Any special instructions?"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={savePlan}
          disabled={isSaving}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {isSaving ? 'Saving...' : `Save Plan ${activePlan}`}
        </button>
      </div>
    </div>
  );
}

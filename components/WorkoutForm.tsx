'use client';

import { useState } from 'react';
import { PlanType, WorkoutFormData } from '@/types';
import { PRESET_EXERCISES, MUSCLE_GROUPS } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { Plus, X, Save } from 'lucide-react';
import { format } from 'date-fns';

interface WorkoutFormProps {
  suggestedPlan: PlanType;
}

export function WorkoutForm({ suggestedPlan }: WorkoutFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<WorkoutFormData>({
    planType: suggestedPlan,
    date: new Date(),
    exercises: [],
    overallIntensity: 'moderate',
    sleepQuality: 'good',
  });

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [
        ...formData.exercises,
        {
          exerciseName: '',
          muscleGroup: 'chest',
          sets: [{ reps: 10, weight: 0, rpe: 7 }],
        },
      ],
    });
  };

  const removeExercise = (index: number) => {
    setFormData({
      ...formData,
      exercises: formData.exercises.filter((_, i) => i !== index),
    });
  };

  const updateExercise = (index: number, field: string, value: any) => {
    const updated = [...formData.exercises];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, exercises: updated });
  };

  const addSet = (exerciseIndex: number) => {
    const updated = [...formData.exercises];
    const lastSet = updated[exerciseIndex].sets[updated[exerciseIndex].sets.length - 1];
    updated[exerciseIndex].sets.push({ ...lastSet });
    setFormData({ ...formData, exercises: updated });
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updated = [...formData.exercises];
    updated[exerciseIndex].sets = updated[exerciseIndex].sets.filter((_, i) => i !== setIndex);
    setFormData({ ...formData, exercises: updated });
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: string, value: any) => {
    const updated = [...formData.exercises];
    updated[exerciseIndex].sets[setIndex] = {
      ...updated[exerciseIndex].sets[setIndex],
      [field]: value,
    };
    setFormData({ ...formData, exercises: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save workout');

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error saving workout:', error);
      alert('Failed to save workout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Workout Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={format(formData.date, 'yyyy-MM-dd')}
              onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Plan Type</label>
            <select
              value={formData.planType}
              onChange={(e) => setFormData({ ...formData, planType: e.target.value as PlanType })}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="A">Plan A</option>
              <option value="B">Plan B</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Overall Intensity</label>
            <select
              value={formData.overallIntensity}
              onChange={(e) => setFormData({ ...formData, overallIntensity: e.target.value as any })}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="hard">Hard</option>
              <option value="very-hard">Very Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sleep Quality (Last Night)</label>
            <select
              value={formData.sleepQuality}
              onChange={(e) => setFormData({ ...formData, sleepQuality: e.target.value as any })}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="poor">Poor</option>
              <option value="good">Good</option>
              <option value="excellent">Excellent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
            <input
              type="number"
              value={formData.duration || ''}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || undefined })}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              placeholder="60"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Notes (optional)</label>
          <textarea
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            rows={3}
            placeholder="How did you feel? Any observations?"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Exercises</h2>
          <button
            type="button"
            onClick={addExercise}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Exercise
          </button>
        </div>

        {formData.exercises.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">Exercise {exerciseIndex + 1}</h3>
              <button
                type="button"
                onClick={() => removeExercise(exerciseIndex)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Exercise Name</label>
                <input
                  type="text"
                  value={exercise.exerciseName}
                  onChange={(e) => updateExercise(exerciseIndex, 'exerciseName', e.target.value)}
                  list={`exercises-${exerciseIndex}`}
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  placeholder="e.g., Bench Press"
                  required
                />
                <datalist id={`exercises-${exerciseIndex}`}>
                  {PRESET_EXERCISES.map((preset) => (
                    <option key={preset.name} value={preset.name} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Muscle Group</label>
                <select
                  value={exercise.muscleGroup}
                  onChange={(e) => updateExercise(exerciseIndex, 'muscleGroup', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  {MUSCLE_GROUPS.map((group) => (
                    <option key={group} value={group}>
                      {group.charAt(0).toUpperCase() + group.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Sets</label>
                <button
                  type="button"
                  onClick={() => addSet(exerciseIndex)}
                  className="text-sm text-primary hover:underline"
                >
                  + Add Set
                </button>
              </div>

              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="flex items-center gap-2">
                  <span className="text-sm font-medium w-12">Set {setIndex + 1}</span>
                  <input
                    type="number"
                    value={set.reps}
                    onChange={(e) => updateSet(exerciseIndex, setIndex, 'reps', parseInt(e.target.value))}
                    className="w-20 px-2 py-1 rounded border dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Reps"
                    min="1"
                    required
                  />
                  <span className="text-sm">reps ×</span>
                  <input
                    type="number"
                    value={set.weight}
                    onChange={(e) => updateSet(exerciseIndex, setIndex, 'weight', parseFloat(e.target.value))}
                    className="w-24 px-2 py-1 rounded border dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Weight"
                    step="0.5"
                    min="0"
                    required
                  />
                  <span className="text-sm">kg</span>
                  <input
                    type="number"
                    value={set.rpe || ''}
                    onChange={(e) => updateSet(exerciseIndex, setIndex, 'rpe', parseInt(e.target.value) || undefined)}
                    className="w-20 px-2 py-1 rounded border dark:bg-gray-700 dark:border-gray-600"
                    placeholder="RPE"
                    min="1"
                    max="10"
                  />
                  {exercise.sets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSet(exerciseIndex, setIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Exercise Notes (optional)</label>
              <input
                type="text"
                value={exercise.notes || ''}
                onChange={(e) => updateExercise(exerciseIndex, 'notes', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                placeholder="Any notes about this exercise?"
              />
            </div>
          </div>
        ))}

        {formData.exercises.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-gray-500 mb-4">No exercises added yet</p>
            <button
              type="button"
              onClick={addExercise}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Add Your First Exercise
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting || formData.exercises.length === 0}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          {isSubmitting ? 'Saving...' : 'Save Workout'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

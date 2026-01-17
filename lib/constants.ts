import { PresetExercise } from '@/types';

export const PRESET_EXERCISES: PresetExercise[] = [
  // Chest
  { name: 'Bench Press', muscleGroup: 'chest', category: 'compound', description: 'Barbell or dumbbell' },
  { name: 'Incline Bench Press', muscleGroup: 'chest', category: 'compound' },
  { name: 'Dumbbell Flyes', muscleGroup: 'chest', category: 'isolation' },
  { name: 'Cable Crossovers', muscleGroup: 'chest', category: 'isolation' },
  { name: 'Push-ups', muscleGroup: 'chest', category: 'compound' },
  { name: 'Dips', muscleGroup: 'chest', category: 'compound' },

  // Back
  { name: 'Deadlift', muscleGroup: 'back', category: 'compound' },
  { name: 'Pull-ups', muscleGroup: 'back', category: 'compound' },
  { name: 'Barbell Rows', muscleGroup: 'back', category: 'compound' },
  { name: 'Lat Pulldowns', muscleGroup: 'back', category: 'compound' },
  { name: 'Seated Cable Rows', muscleGroup: 'back', category: 'compound' },
  { name: 'T-Bar Rows', muscleGroup: 'back', category: 'compound' },
  { name: 'Face Pulls', muscleGroup: 'back', category: 'isolation' },

  // Shoulders
  { name: 'Overhead Press', muscleGroup: 'shoulders', category: 'compound' },
  { name: 'Dumbbell Shoulder Press', muscleGroup: 'shoulders', category: 'compound' },
  { name: 'Lateral Raises', muscleGroup: 'shoulders', category: 'isolation' },
  { name: 'Front Raises', muscleGroup: 'shoulders', category: 'isolation' },
  { name: 'Rear Delt Flyes', muscleGroup: 'shoulders', category: 'isolation' },
  { name: 'Arnold Press', muscleGroup: 'shoulders', category: 'compound' },

  // Arms
  { name: 'Barbell Curls', muscleGroup: 'biceps', category: 'isolation' },
  { name: 'Dumbbell Curls', muscleGroup: 'biceps', category: 'isolation' },
  { name: 'Hammer Curls', muscleGroup: 'biceps', category: 'isolation' },
  { name: 'Preacher Curls', muscleGroup: 'biceps', category: 'isolation' },
  { name: 'Tricep Dips', muscleGroup: 'triceps', category: 'compound' },
  { name: 'Tricep Pushdowns', muscleGroup: 'triceps', category: 'isolation' },
  { name: 'Overhead Tricep Extension', muscleGroup: 'triceps', category: 'isolation' },
  { name: 'Skull Crushers', muscleGroup: 'triceps', category: 'isolation' },

  // Legs
  { name: 'Squats', muscleGroup: 'legs', category: 'compound' },
  { name: 'Front Squats', muscleGroup: 'quads', category: 'compound' },
  { name: 'Leg Press', muscleGroup: 'legs', category: 'compound' },
  { name: 'Romanian Deadlifts', muscleGroup: 'hamstrings', category: 'compound' },
  { name: 'Leg Curls', muscleGroup: 'hamstrings', category: 'isolation' },
  { name: 'Leg Extensions', muscleGroup: 'quads', category: 'isolation' },
  { name: 'Lunges', muscleGroup: 'legs', category: 'compound' },
  { name: 'Bulgarian Split Squats', muscleGroup: 'legs', category: 'compound' },
  { name: 'Hip Thrusts', muscleGroup: 'glutes', category: 'compound' },
  { name: 'Calf Raises', muscleGroup: 'calves', category: 'isolation' },

  // Core
  { name: 'Planks', muscleGroup: 'core', category: 'compound' },
  { name: 'Crunches', muscleGroup: 'abs', category: 'isolation' },
  { name: 'Hanging Leg Raises', muscleGroup: 'abs', category: 'compound' },
  { name: 'Russian Twists', muscleGroup: 'abs', category: 'isolation' },
  { name: 'Cable Crunches', muscleGroup: 'abs', category: 'isolation' },
];

export const MUSCLE_GROUPS = [
  'chest',
  'back',
  'shoulders',
  'biceps',
  'triceps',
  'legs',
  'quads',
  'hamstrings',
  'glutes',
  'calves',
  'abs',
  'core',
  'full-body',
] as const;

export const MUSCLE_GROUP_LABELS: Record<string, string> = {
  chest: 'Chest',
  back: 'Back',
  shoulders: 'Shoulders',
  biceps: 'Biceps',
  triceps: 'Triceps',
  legs: 'Legs',
  quads: 'Quadriceps',
  hamstrings: 'Hamstrings',
  glutes: 'Glutes',
  calves: 'Calves',
  abs: 'Abs',
  core: 'Core',
  'full-body': 'Full Body',
};

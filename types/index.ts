// User types
export interface User {
  _id: string;
  email: string;
  name?: string;
  password?: string;
  image?: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
  updatedAt: Date;
}

// Workout Plan types
export type PlanType = 'A' | 'B';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  targetSets?: number;
  targetReps?: string; // e.g., "8-12" or "10"
  notes?: string;
}

export interface WorkoutPlan {
  _id: string;
  userId: string;
  planType: PlanType;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
}

// Workout Session types
export interface ExerciseSet {
  setNumber: number;
  reps: number;
  weight: number; // in kg
  rpe?: number; // Rate of Perceived Exertion (1-10)
}

export interface CompletedExercise {
  exerciseId: string;
  exerciseName: string;
  muscleGroup: MuscleGroup;
  sets: ExerciseSet[];
  notes?: string;
}

export interface WorkoutSession {
  _id: string;
  userId: string;
  planType: PlanType;
  date: Date;
  exercises: CompletedExercise[];
  overallIntensity?: 'light' | 'moderate' | 'hard' | 'very-hard';
  sleepQuality?: 'poor' | 'good' | 'excellent';
  duration?: number; // in minutes
  notes?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Muscle groups
export type MuscleGroup = 
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'legs'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'abs'
  | 'core'
  | 'full-body';

// Recovery estimation types
export interface RecoveryEstimate {
  muscleGroup: MuscleGroup;
  lastTrainedDate: Date;
  recommendedNextTraining: Date;
  recoveryHours: number;
  factors: {
    rpe: number;
    totalSets: number;
    intensity: string;
    sleepQuality?: string;
    daysSinceLastTraining: number;
  };
}

// Body measurements
export interface BodyMeasurement {
  _id: string;
  userId: string;
  date: Date;
  weight?: number; // kg
  bodyFat?: number; // percentage
  chest?: number; // cm
  waist?: number; // cm
  hips?: number; // cm
  biceps?: number; // cm
  thighs?: number; // cm
  notes?: string;
  createdAt: Date;
}

// Dashboard stats
export interface DashboardStats {
  workoutsThisWeek: number;
  workoutsThisMonth: number;
  totalVolumeThisWeek: number; // sets × reps × weight
  totalVolumeThisMonth: number;
  currentStreak: number; // consecutive days with workouts
  nextRecommendedWorkouts: RecoveryEstimate[];
  currentWeekPlan: PlanType;
}

// Progress tracking
export interface ExerciseProgress {
  exerciseName: string;
  muscleGroup: MuscleGroup;
  history: {
    date: Date;
    maxWeight: number;
    totalVolume: number;
    averageRpe?: number;
  }[];
}

// Form types
export interface WorkoutFormData {
  planType: PlanType;
  date: Date;
  exercises: {
    exerciseName: string;
    muscleGroup: MuscleGroup;
    sets: {
      reps: number;
      weight: number;
      rpe?: number;
    }[];
    notes?: string;
  }[];
  overallIntensity?: 'light' | 'moderate' | 'hard' | 'very-hard';
  sleepQuality?: 'poor' | 'good' | 'excellent';
  duration?: number;
  notes?: string;
}

// Preset exercises
export interface PresetExercise {
  name: string;
  muscleGroup: MuscleGroup;
  category: 'compound' | 'isolation';
  description?: string;
}

// Theme
export type Theme = 'light' | 'dark' | 'system';

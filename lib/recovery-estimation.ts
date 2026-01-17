import { 
  RecoveryEstimate, 
  WorkoutSession, 
  MuscleGroup,
  CompletedExercise 
} from '@/types';
import { addHours, differenceInHours, differenceInDays } from 'date-fns';

interface RecoveryFactors {
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  averageRpe: number;
  totalSets: number;
  overallIntensity?: 'light' | 'moderate' | 'hard' | 'very-hard';
  sleepQuality?: 'poor' | 'good' | 'excellent';
  daysSinceLastTraining: number;
}

/**
 * Core recovery time estimation algorithm
 * Returns recommended recovery hours based on multiple factors
 */
export function calculateRecoveryHours(factors: RecoveryFactors): number {
  let baseRecovery = 0;

  // 1. Base recovery by experience level
  switch (factors.experienceLevel) {
    case 'beginner':
      baseRecovery = 72; // 3 days
      break;
    case 'intermediate':
      baseRecovery = 48; // 2 days
      break;
    case 'advanced':
      baseRecovery = 36; // 1.5 days
      break;
  }

  // 2. Adjust for RPE (Rate of Perceived Exertion)
  // High RPE = needs more recovery
  if (factors.averageRpe >= 9) {
    baseRecovery += 24; // +1 day
  } else if (factors.averageRpe >= 8) {
    baseRecovery += 12; // +0.5 day
  } else if (factors.averageRpe <= 5) {
    baseRecovery -= 12; // -0.5 day (easy workout)
  }

  // 3. Adjust for volume (total sets)
  // More volume = more recovery needed
  if (factors.totalSets >= 20) {
    baseRecovery += 12;
  } else if (factors.totalSets >= 15) {
    baseRecovery += 6;
  } else if (factors.totalSets <= 5) {
    baseRecovery -= 6;
  }

  // 4. Adjust for overall intensity
  switch (factors.overallIntensity) {
    case 'very-hard':
      baseRecovery += 24;
      break;
    case 'hard':
      baseRecovery += 12;
      break;
    case 'light':
      baseRecovery -= 12;
      break;
  }

  // 5. Adjust for sleep quality
  switch (factors.sleepQuality) {
    case 'poor':
      baseRecovery += 24; // Poor sleep = slower recovery
      break;
    case 'excellent':
      baseRecovery -= 12; // Great sleep = faster recovery
      break;
  }

  // 6. Adjust for time since last training
  // If it's been a while, muscles may need less recovery (already rested)
  if (factors.daysSinceLastTraining >= 7) {
    baseRecovery -= 24; // Already well-rested
  } else if (factors.daysSinceLastTraining <= 2) {
    baseRecovery += 12; // Training frequently, may need more rest
  }

  // Ensure minimum 24 hours and maximum 7 days
  return Math.max(24, Math.min(168, baseRecovery));
}

/**
 * Analyzes a workout session and generates recovery estimates for each muscle group
 */
export function estimateRecoveryFromWorkout(
  workout: WorkoutSession,
  previousWorkouts: WorkoutSession[],
  experienceLevel: 'beginner' | 'intermediate' | 'advanced'
): RecoveryEstimate[] {
  // Group exercises by muscle group
  const muscleGroupMap = new Map<MuscleGroup, CompletedExercise[]>();
  
  workout.exercises.forEach(exercise => {
    const existing = muscleGroupMap.get(exercise.muscleGroup) || [];
    existing.push(exercise);
    muscleGroupMap.set(exercise.muscleGroup, existing);
  });

  const estimates: RecoveryEstimate[] = [];

  // Calculate recovery for each muscle group
  muscleGroupMap.forEach((exercises, muscleGroup) => {
    // Calculate total sets and average RPE for this muscle group
    const totalSets = exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
    const allRpes = exercises.flatMap(ex => 
      ex.sets.filter(s => s.rpe !== undefined).map(s => s.rpe!)
    );
    const averageRpe = allRpes.length > 0 
      ? allRpes.reduce((sum, rpe) => sum + rpe, 0) / allRpes.length 
      : 7; // default moderate RPE

    // Find last time this muscle group was trained
    const lastTraining = findLastTrainingForMuscleGroup(
      muscleGroup,
      previousWorkouts,
      workout.date
    );
    const daysSinceLastTraining = lastTraining 
      ? differenceInDays(workout.date, lastTraining)
      : 7; // default to 7 if first time

    // Calculate recovery hours
    const recoveryHours = calculateRecoveryHours({
      experienceLevel,
      averageRpe,
      totalSets,
      overallIntensity: workout.overallIntensity,
      sleepQuality: workout.sleepQuality,
      daysSinceLastTraining,
    });

    // Calculate recommended next training date
    const recommendedNextTraining = addHours(workout.date, recoveryHours);

    estimates.push({
      muscleGroup,
      lastTrainedDate: workout.date,
      recommendedNextTraining,
      recoveryHours,
      factors: {
        rpe: Math.round(averageRpe * 10) / 10,
        totalSets,
        intensity: workout.overallIntensity || 'moderate',
        sleepQuality: workout.sleepQuality,
        daysSinceLastTraining,
      },
    });
  });

  return estimates;
}

/**
 * Finds the last workout session where a specific muscle group was trained
 */
function findLastTrainingForMuscleGroup(
  muscleGroup: MuscleGroup,
  workouts: WorkoutSession[],
  beforeDate: Date
): Date | null {
  // Sort workouts by date descending
  const sortedWorkouts = [...workouts]
    .filter(w => new Date(w.date) < beforeDate)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  for (const workout of sortedWorkouts) {
    const hasMuscleGroup = workout.exercises.some(
      ex => ex.muscleGroup === muscleGroup
    );
    if (hasMuscleGroup) {
      return new Date(workout.date);
    }
  }

  return null;
}

/**
 * Gets current recovery status for all recently trained muscle groups
 */
export function getCurrentRecoveryStatus(
  recentWorkouts: WorkoutSession[],
  experienceLevel: 'beginner' | 'intermediate' | 'advanced'
): RecoveryEstimate[] {
  if (recentWorkouts.length === 0) return [];

  // Get the most recent workout for each muscle group
  const muscleGroupLastWorkout = new Map<MuscleGroup, WorkoutSession>();

  // Sort workouts by date descending
  const sortedWorkouts = [...recentWorkouts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Find most recent workout for each muscle group
  sortedWorkouts.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (!muscleGroupLastWorkout.has(exercise.muscleGroup)) {
        muscleGroupLastWorkout.set(exercise.muscleGroup, workout);
      }
    });
  });

  // Calculate recovery estimates
  const estimates: RecoveryEstimate[] = [];

  muscleGroupLastWorkout.forEach((workout, muscleGroup) => {
    const muscleGroupExercises = workout.exercises.filter(
      ex => ex.muscleGroup === muscleGroup
    );

    const totalSets = muscleGroupExercises.reduce(
      (sum, ex) => sum + ex.sets.length, 
      0
    );
    
    const allRpes = muscleGroupExercises.flatMap(ex => 
      ex.sets.filter(s => s.rpe !== undefined).map(s => s.rpe!)
    );
    const averageRpe = allRpes.length > 0 
      ? allRpes.reduce((sum, rpe) => sum + rpe, 0) / allRpes.length 
      : 7;

    const previousWorkouts = sortedWorkouts.filter(
      w => new Date(w.date) < new Date(workout.date)
    );
    const lastTraining = findLastTrainingForMuscleGroup(
      muscleGroup,
      previousWorkouts,
      workout.date
    );
    const daysSinceLastTraining = lastTraining 
      ? differenceInDays(workout.date, lastTraining)
      : 7;

    const recoveryHours = calculateRecoveryHours({
      experienceLevel,
      averageRpe,
      totalSets,
      overallIntensity: workout.overallIntensity,
      sleepQuality: workout.sleepQuality,
      daysSinceLastTraining,
    });

    const recommendedNextTraining = addHours(workout.date, recoveryHours);

    estimates.push({
      muscleGroup,
      lastTrainedDate: workout.date,
      recommendedNextTraining,
      recoveryHours,
      factors: {
        rpe: Math.round(averageRpe * 10) / 10,
        totalSets,
        intensity: workout.overallIntensity || 'moderate',
        sleepQuality: workout.sleepQuality,
        daysSinceLastTraining,
      },
    });
  });

  // Sort by recommended next training date
  return estimates.sort(
    (a, b) => a.recommendedNextTraining.getTime() - b.recommendedNextTraining.getTime()
  );
}

/**
 * Checks if a muscle group is ready to train based on recovery estimate
 */
export function isReadyToTrain(estimate: RecoveryEstimate, currentDate: Date = new Date()): boolean {
  return currentDate >= estimate.recommendedNextTraining;
}

/**
 * Gets hours remaining until muscle group is ready to train
 */
export function getHoursUntilReady(estimate: RecoveryEstimate, currentDate: Date = new Date()): number {
  const hours = differenceInHours(estimate.recommendedNextTraining, currentDate);
  return Math.max(0, hours);
}

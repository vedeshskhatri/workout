/**
 * Preset Workout Plans - 6-Day Split
 * Week A and Week B alternating program
 */

export const PRESET_PLANS = {
  MONDAY_A: {
    day: 'Monday',
    focus: 'Chest + Triceps',
    planType: 'A' as const,
    exercises: [
      // Chest (6)
      { name: 'Flat DB Press', muscleGroup: 'chest', targetSets: 4, targetReps: '8-12' },
      { name: 'Incline DB Press', muscleGroup: 'chest', targetSets: 4, targetReps: '8-12' },
      { name: 'Plate-Loaded Chest Press', muscleGroup: 'chest', targetSets: 3, targetReps: '10-12' },
      { name: 'Incline Machine Press', muscleGroup: 'chest', targetSets: 3, targetReps: '10-12' },
      { name: 'Cable Chest Fly (mid)', muscleGroup: 'chest', targetSets: 3, targetReps: '12-15' },
      { name: 'Pec Deck', muscleGroup: 'chest', targetSets: 3, targetReps: '12-15' },
      // Triceps (6)
      { name: 'Rope Pushdown', muscleGroup: 'triceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Straight Bar Pushdown', muscleGroup: 'triceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Skull Crushers', muscleGroup: 'triceps', targetSets: 3, targetReps: '10-12' },
      { name: 'Overhead Cable Extension', muscleGroup: 'triceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Assisted Dips', muscleGroup: 'triceps', targetSets: 3, targetReps: '8-12' },
      { name: 'Close-Grip Chest Press', muscleGroup: 'triceps', targetSets: 3, targetReps: '10-12' },
    ],
  },
  MONDAY_B: {
    day: 'Monday',
    focus: 'Chest + Triceps',
    planType: 'B' as const,
    exercises: [
      // Chest (6)
      { name: 'Machine Chest Press (neutral grip)', muscleGroup: 'chest', targetSets: 4, targetReps: '8-12' },
      { name: 'Incline Smith / Machine Press', muscleGroup: 'chest', targetSets: 4, targetReps: '8-12' },
      { name: 'Decline DB Press', muscleGroup: 'chest', targetSets: 3, targetReps: '10-12' },
      { name: 'Low-to-High Cable Fly', muscleGroup: 'chest', targetSets: 3, targetReps: '12-15' },
      { name: 'High-to-Low Cable Fly', muscleGroup: 'chest', targetSets: 3, targetReps: '12-15' },
      { name: 'Deep Push-Ups', muscleGroup: 'chest', targetSets: 3, targetReps: '12-20' },
      // Triceps (6)
      { name: 'V-Bar Pushdown', muscleGroup: 'triceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Single-Arm Cable Pushdown', muscleGroup: 'triceps', targetSets: 3, targetReps: '12-15' },
      { name: 'DB Overhead Extension', muscleGroup: 'triceps', targetSets: 3, targetReps: '10-12' },
      { name: 'Cable Kickbacks', muscleGroup: 'triceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Bench Dips', muscleGroup: 'triceps', targetSets: 3, targetReps: '10-15' },
      { name: 'Machine Triceps Press', muscleGroup: 'triceps', targetSets: 3, targetReps: '10-12' },
    ],
  },
  TUESDAY_A: {
    day: 'Tuesday',
    focus: 'Back + Biceps',
    planType: 'A' as const,
    exercises: [
      // Back (6)
      { name: 'Wide-Grip Lat Pulldown', muscleGroup: 'back', targetSets: 4, targetReps: '8-12' },
      { name: 'Plate-Loaded Row', muscleGroup: 'back', targetSets: 4, targetReps: '8-12' },
      { name: 'Seated Cable Row', muscleGroup: 'back', targetSets: 3, targetReps: '10-12' },
      { name: 'One-Arm DB Row', muscleGroup: 'back', targetSets: 3, targetReps: '10-12' },
      { name: 'Straight-Arm Pulldown', muscleGroup: 'back', targetSets: 3, targetReps: '12-15' },
      { name: 'Dead Hang', muscleGroup: 'back', targetSets: 3, targetReps: '30-60s' },
      // Biceps (6)
      { name: 'EZ-Bar Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '10-12' },
      { name: 'Incline DB Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '10-12' },
      { name: 'Hammer Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Cable Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Preacher Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '10-12' },
      { name: 'Concentration Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '10-12' },
    ],
  },
  TUESDAY_B: {
    day: 'Tuesday',
    focus: 'Back + Biceps',
    planType: 'B' as const,
    exercises: [
      // Back (6)
      { name: 'Neutral-Grip Lat Pulldown', muscleGroup: 'back', targetSets: 4, targetReps: '8-12' },
      { name: 'Chest-Supported Row', muscleGroup: 'back', targetSets: 4, targetReps: '8-12' },
      { name: 'Close-Grip Cable Row', muscleGroup: 'back', targetSets: 3, targetReps: '10-12' },
      { name: 'Machine Row', muscleGroup: 'back', targetSets: 3, targetReps: '10-12' },
      { name: 'Cable Pullover', muscleGroup: 'back', targetSets: 3, targetReps: '12-15' },
      { name: 'Back Extension', muscleGroup: 'back', targetSets: 3, targetReps: '12-15' },
      // Biceps (6)
      { name: 'Straight Bar Cable Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '10-12' },
      { name: 'Spider Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '10-12' },
      { name: 'Cross-Body Hammer Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Bayesian Cable Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Machine Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '10-12' },
      { name: 'Isometric Curl Hold', muscleGroup: 'biceps', targetSets: 3, targetReps: '20-30s' },
    ],
  },
  WEDNESDAY_A: {
    day: 'Wednesday',
    focus: 'Legs + Abs',
    planType: 'A' as const,
    exercises: [
      // Legs (6)
      { name: 'Squats / Leg Press', muscleGroup: 'legs', targetSets: 4, targetReps: '8-12' },
      { name: 'Leg Extension', muscleGroup: 'quads', targetSets: 3, targetReps: '12-15' },
      { name: 'Romanian Deadlift', muscleGroup: 'hamstrings', targetSets: 4, targetReps: '8-12' },
      { name: 'Seated Leg Curl', muscleGroup: 'hamstrings', targetSets: 3, targetReps: '12-15' },
      { name: 'Walking Lunges', muscleGroup: 'legs', targetSets: 3, targetReps: '12-15' },
      { name: 'Standing Calf Raise', muscleGroup: 'calves', targetSets: 4, targetReps: '15-20' },
      // Abs (6)
      { name: 'Hanging Leg Raises', muscleGroup: 'abs', targetSets: 3, targetReps: '10-15' },
      { name: 'Hanging Knee Raises', muscleGroup: 'abs', targetSets: 3, targetReps: '12-15' },
      { name: 'Cable Crunch', muscleGroup: 'abs', targetSets: 3, targetReps: '15-20' },
      { name: 'Decline Crunch', muscleGroup: 'abs', targetSets: 3, targetReps: '15-20' },
      { name: 'Russian Twists', muscleGroup: 'abs', targetSets: 3, targetReps: '20-30' },
      { name: 'Plank', muscleGroup: 'core', targetSets: 3, targetReps: '60s' },
    ],
  },
  WEDNESDAY_B: {
    day: 'Wednesday',
    focus: 'Legs + Abs',
    planType: 'B' as const,
    exercises: [
      // Legs (6)
      { name: 'Hack Squat / Narrow Leg Press', muscleGroup: 'legs', targetSets: 4, targetReps: '8-12' },
      { name: 'Sissy Squat / Heels-Elevated Squat', muscleGroup: 'quads', targetSets: 3, targetReps: '10-15' },
      { name: 'Stiff-Leg Deadlift', muscleGroup: 'hamstrings', targetSets: 4, targetReps: '8-12' },
      { name: 'Lying Leg Curl', muscleGroup: 'hamstrings', targetSets: 3, targetReps: '12-15' },
      { name: 'Reverse Lunges', muscleGroup: 'legs', targetSets: 3, targetReps: '12-15' },
      { name: 'Seated Calf Raise', muscleGroup: 'calves', targetSets: 4, targetReps: '15-20' },
      // Abs (6)
      { name: 'Weighted Crunch', muscleGroup: 'abs', targetSets: 3, targetReps: '12-15' },
      { name: 'Toes-to-Bar / High Leg Raise', muscleGroup: 'abs', targetSets: 3, targetReps: '8-12' },
      { name: 'Reverse Crunch', muscleGroup: 'abs', targetSets: 3, targetReps: '15-20' },
      { name: 'Bicycle Crunch', muscleGroup: 'abs', targetSets: 3, targetReps: '20-30' },
      { name: 'Cable Woodchopper', muscleGroup: 'abs', targetSets: 3, targetReps: '12-15' },
      { name: 'Long Plank Hold', muscleGroup: 'core', targetSets: 3, targetReps: '60-90s' },
    ],
  },
  THURSDAY_A: {
    day: 'Thursday',
    focus: 'Shoulders + Triceps',
    planType: 'A' as const,
    exercises: [
      // Shoulders (6)
      { name: 'Shoulder Press Machine', muscleGroup: 'shoulders', targetSets: 4, targetReps: '8-12' },
      { name: 'DB Shoulder Press', muscleGroup: 'shoulders', targetSets: 4, targetReps: '8-12' },
      { name: 'DB Lateral Raise', muscleGroup: 'shoulders', targetSets: 3, targetReps: '12-15' },
      { name: 'Cable Lateral Raise', muscleGroup: 'shoulders', targetSets: 3, targetReps: '12-15' },
      { name: 'Rear Delt Fly', muscleGroup: 'shoulders', targetSets: 3, targetReps: '12-15' },
      { name: 'Upright Cable Row (light)', muscleGroup: 'shoulders', targetSets: 3, targetReps: '12-15' },
      // Triceps (6)
      { name: 'Rope Pushdown', muscleGroup: 'triceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Straight Bar Pushdown', muscleGroup: 'triceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Skull Crushers', muscleGroup: 'triceps', targetSets: 3, targetReps: '10-12' },
      { name: 'Assisted Dips', muscleGroup: 'triceps', targetSets: 3, targetReps: '8-12' },
      { name: 'Overhead Cable Extension', muscleGroup: 'triceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Close-Grip Press', muscleGroup: 'triceps', targetSets: 3, targetReps: '10-12' },
    ],
  },
  THURSDAY_B: {
    day: 'Thursday',
    focus: 'Shoulders + Triceps',
    planType: 'B' as const,
    exercises: [
      // Shoulders (6)
      { name: 'Arnold Press', muscleGroup: 'shoulders', targetSets: 4, targetReps: '8-12' },
      { name: 'Machine Shoulder Press (different grip)', muscleGroup: 'shoulders', targetSets: 4, targetReps: '8-12' },
      { name: 'Lean-Away Lateral Raise', muscleGroup: 'shoulders', targetSets: 3, targetReps: '12-15' },
      { name: 'Single-Arm Cable Lateral', muscleGroup: 'shoulders', targetSets: 3, targetReps: '12-15' },
      { name: 'Reverse Pec Deck', muscleGroup: 'shoulders', targetSets: 3, targetReps: '12-15' },
      { name: 'Face Pulls', muscleGroup: 'shoulders', targetSets: 3, targetReps: '15-20' },
      // Triceps (6)
      { name: 'Reverse-Grip Pushdown', muscleGroup: 'triceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Single-Arm Overhead Extension', muscleGroup: 'triceps', targetSets: 3, targetReps: '10-12' },
      { name: 'DB Kickbacks', muscleGroup: 'triceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Cable Kickbacks', muscleGroup: 'triceps', targetSets: 3, targetReps: '12-15' },
      { name: 'Bench Dips', muscleGroup: 'triceps', targetSets: 3, targetReps: '10-15' },
      { name: 'Machine Press', muscleGroup: 'triceps', targetSets: 3, targetReps: '10-12' },
    ],
  },
  FRIDAY_A: {
    day: 'Friday',
    focus: 'Back + Forearms',
    planType: 'A' as const,
    exercises: [
      // Back (6)
      { name: 'Wide-Grip Pulldown', muscleGroup: 'back', targetSets: 4, targetReps: '8-12' },
      { name: 'Plate-Loaded Row', muscleGroup: 'back', targetSets: 4, targetReps: '8-12' },
      { name: 'Seated Cable Row', muscleGroup: 'back', targetSets: 3, targetReps: '10-12' },
      { name: 'Straight-Arm Pulldown', muscleGroup: 'back', targetSets: 3, targetReps: '12-15' },
      { name: 'One-Arm DB Row', muscleGroup: 'back', targetSets: 3, targetReps: '10-12' },
      { name: 'Dead Hang', muscleGroup: 'back', targetSets: 3, targetReps: '30-60s' },
      // Forearms (6)
      { name: 'Wrist Curls', muscleGroup: 'biceps', targetSets: 3, targetReps: '15-20' },
      { name: 'Reverse Wrist Curls', muscleGroup: 'biceps', targetSets: 3, targetReps: '15-20' },
      { name: 'Reverse EZ-Bar Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '12-15' },
      { name: "Farmer's Walk", muscleGroup: 'full-body', targetSets: 3, targetReps: '30-60s' },
      { name: 'Plate Pinch Hold', muscleGroup: 'full-body', targetSets: 3, targetReps: '30-60s' },
      { name: 'Bar Hang Hold', muscleGroup: 'back', targetSets: 3, targetReps: '30-60s' },
    ],
  },
  FRIDAY_B: {
    day: 'Friday',
    focus: 'Back + Forearms',
    planType: 'B' as const,
    exercises: [
      // Back (6)
      { name: 'Close-Grip Pulldown', muscleGroup: 'back', targetSets: 4, targetReps: '8-12' },
      { name: 'Chest-Supported Row', muscleGroup: 'back', targetSets: 4, targetReps: '8-12' },
      { name: 'Machine Row', muscleGroup: 'back', targetSets: 3, targetReps: '10-12' },
      { name: 'Cable Pullover', muscleGroup: 'back', targetSets: 3, targetReps: '12-15' },
      { name: 'Back Extension', muscleGroup: 'back', targetSets: 3, targetReps: '12-15' },
      { name: 'Isometric Hold Row', muscleGroup: 'back', targetSets: 3, targetReps: '20-30s' },
      // Forearms (6)
      { name: 'Wrist Roller', muscleGroup: 'biceps', targetSets: 3, targetReps: '3-5 rolls' },
      { name: 'Cable Wrist Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '15-20' },
      { name: 'Behind-Back Wrist Curl', muscleGroup: 'biceps', targetSets: 3, targetReps: '15-20' },
      { name: 'Fat-Grip Holds', muscleGroup: 'full-body', targetSets: 3, targetReps: '30-60s' },
      { name: 'Towel Pull-Ups / Holds', muscleGroup: 'back', targetSets: 3, targetReps: '5-10' },
      { name: 'Timed Farmer Walk', muscleGroup: 'full-body', targetSets: 3, targetReps: '45-60s' },
    ],
  },
  SATURDAY_A: {
    day: 'Saturday',
    focus: 'Chest + Abs',
    planType: 'A' as const,
    exercises: [
      // Chest (6)
      { name: 'Flat DB Press', muscleGroup: 'chest', targetSets: 4, targetReps: '8-12' },
      { name: 'Incline Machine Press', muscleGroup: 'chest', targetSets: 3, targetReps: '10-12' },
      { name: 'Plate-Loaded Chest Press', muscleGroup: 'chest', targetSets: 3, targetReps: '10-12' },
      { name: 'Cable Fly', muscleGroup: 'chest', targetSets: 3, targetReps: '12-15' },
      { name: 'Pec Deck', muscleGroup: 'chest', targetSets: 3, targetReps: '12-15' },
      { name: 'Push-Ups', muscleGroup: 'chest', targetSets: 3, targetReps: '15-25' },
      // Abs (6)
      { name: 'Hanging Leg Raise', muscleGroup: 'abs', targetSets: 3, targetReps: '10-15' },
      { name: 'Cable Crunch', muscleGroup: 'abs', targetSets: 3, targetReps: '15-20' },
      { name: 'Decline Sit-Ups', muscleGroup: 'abs', targetSets: 3, targetReps: '15-20' },
      { name: 'Bicycle Crunch', muscleGroup: 'abs', targetSets: 3, targetReps: '20-30' },
      { name: 'Russian Twists', muscleGroup: 'abs', targetSets: 3, targetReps: '20-30' },
      { name: 'Plank', muscleGroup: 'core', targetSets: 3, targetReps: '60s' },
    ],
  },
  SATURDAY_B: {
    day: 'Saturday',
    focus: 'Chest + Abs',
    planType: 'B' as const,
    exercises: [
      // Chest (6)
      { name: 'Machine Press (slow tempo)', muscleGroup: 'chest', targetSets: 4, targetReps: '8-12' },
      { name: 'Incline DB Press', muscleGroup: 'chest', targetSets: 4, targetReps: '8-12' },
      { name: 'Decline Press', muscleGroup: 'chest', targetSets: 3, targetReps: '10-12' },
      { name: 'Low Cable Fly', muscleGroup: 'chest', targetSets: 3, targetReps: '12-15' },
      { name: 'Single-Arm Cable Fly', muscleGroup: 'chest', targetSets: 3, targetReps: '12-15' },
      { name: 'Isometric Push-Up Hold', muscleGroup: 'chest', targetSets: 3, targetReps: '20-30s' },
      // Abs (6)
      { name: 'Weighted Crunch', muscleGroup: 'abs', targetSets: 3, targetReps: '12-15' },
      { name: 'Reverse Crunch', muscleGroup: 'abs', targetSets: 3, targetReps: '15-20' },
      { name: 'V-Ups', muscleGroup: 'abs', targetSets: 3, targetReps: '10-15' },
      { name: 'Cable Oblique Crunch', muscleGroup: 'abs', targetSets: 3, targetReps: '12-15' },
      { name: 'Side Plank', muscleGroup: 'core', targetSets: 3, targetReps: '30-45s' },
      { name: 'Hollow Body Hold', muscleGroup: 'core', targetSets: 3, targetReps: '30-45s' },
    ],
  },
};

/**
 * Get all exercises for a specific plan type
 */
export function getPlanExercises(planType: 'A' | 'B'): any[] {
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const allExercises: any[] = [];

  days.forEach((day) => {
    const planKey = `${day}_${planType}` as keyof typeof PRESET_PLANS;
    const dayPlan = PRESET_PLANS[planKey];
    if (dayPlan) {
      dayPlan.exercises.forEach((exercise, index) => {
        allExercises.push({
          id: `${day.toLowerCase()}-${index}`,
          ...exercise,
        });
      });
    }
  });

  return allExercises;
}

/**
 * Get exercises for a specific day and plan
 */
export function getDayPlanExercises(
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY',
  planType: 'A' | 'B'
) {
  const planKey = `${day}_${planType}` as keyof typeof PRESET_PLANS;
  return PRESET_PLANS[planKey];
}

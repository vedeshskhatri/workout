/**
 * Sample data seeder for development
 * 
 * Run with: node scripts/seed.js
 * 
 * This will create sample workout data for testing
 */

// Note: This is a reference script. To use it:
// 1. Uncomment the code below
// 2. Install ts-node: npm install -D ts-node
// 3. Run: npx ts-node scripts/seed.ts

/*
import { connectDB } from '../lib/db';
import { WorkoutSessionModel } from '../models/WorkoutSession';
import { UserModel } from '../models/User';
import { subDays } from 'date-fns';

async function seed() {
  await connectDB();
  
  // Find a user (or create one)
  const user = await UserModel.findOne();
  
  if (!user) {
    console.log('No user found. Please register a user first.');
    return;
  }
  
  console.log(`Seeding data for user: ${user.email}`);
  
  // Create sample workouts for the past 30 days
  const sampleWorkouts = [
    {
      userId: user._id,
      planType: 'A',
      date: subDays(new Date(), 28),
      exercises: [
        {
          exerciseId: '1',
          exerciseName: 'Bench Press',
          muscleGroup: 'chest',
          sets: [
            { setNumber: 1, reps: 10, weight: 60, rpe: 7 },
            { setNumber: 2, reps: 10, weight: 65, rpe: 8 },
            { setNumber: 3, reps: 8, weight: 70, rpe: 9 },
          ],
        },
        {
          exerciseId: '2',
          exerciseName: 'Squats',
          muscleGroup: 'legs',
          sets: [
            { setNumber: 1, reps: 10, weight: 80, rpe: 7 },
            { setNumber: 2, reps: 10, weight: 85, rpe: 8 },
            { setNumber: 3, reps: 8, weight: 90, rpe: 9 },
          ],
        },
      ],
      overallIntensity: 'hard',
      sleepQuality: 'good',
      duration: 60,
    },
    {
      userId: user._id,
      planType: 'B',
      date: subDays(new Date(), 21),
      exercises: [
        {
          exerciseId: '3',
          exerciseName: 'Deadlift',
          muscleGroup: 'back',
          sets: [
            { setNumber: 1, reps: 8, weight: 100, rpe: 8 },
            { setNumber: 2, reps: 8, weight: 105, rpe: 9 },
            { setNumber: 3, reps: 6, weight: 110, rpe: 9 },
          ],
        },
        {
          exerciseId: '4',
          exerciseName: 'Overhead Press',
          muscleGroup: 'shoulders',
          sets: [
            { setNumber: 1, reps: 10, weight: 40, rpe: 7 },
            { setNumber: 2, reps: 8, weight: 45, rpe: 8 },
            { setNumber: 3, reps: 8, weight: 45, rpe: 8 },
          ],
        },
      ],
      overallIntensity: 'very-hard',
      sleepQuality: 'excellent',
      duration: 75,
    },
    {
      userId: user._id,
      planType: 'A',
      date: subDays(new Date(), 14),
      exercises: [
        {
          exerciseId: '5',
          exerciseName: 'Bench Press',
          muscleGroup: 'chest',
          sets: [
            { setNumber: 1, reps: 10, weight: 65, rpe: 7 },
            { setNumber: 2, reps: 10, weight: 70, rpe: 8 },
            { setNumber: 3, reps: 8, weight: 75, rpe: 9 },
          ],
        },
        {
          exerciseId: '6',
          exerciseName: 'Squats',
          muscleGroup: 'legs',
          sets: [
            { setNumber: 1, reps: 10, weight: 85, rpe: 7 },
            { setNumber: 2, reps: 10, weight: 90, rpe: 8 },
            { setNumber: 3, reps: 8, weight: 95, rpe: 9 },
          ],
        },
      ],
      overallIntensity: 'hard',
      sleepQuality: 'good',
      duration: 65,
    },
    {
      userId: user._id,
      planType: 'B',
      date: subDays(new Date(), 7),
      exercises: [
        {
          exerciseId: '7',
          exerciseName: 'Deadlift',
          muscleGroup: 'back',
          sets: [
            { setNumber: 1, reps: 8, weight: 105, rpe: 8 },
            { setNumber: 2, reps: 8, weight: 110, rpe: 9 },
            { setNumber: 3, reps: 6, weight: 115, rpe: 10 },
          ],
        },
        {
          exerciseId: '8',
          exerciseName: 'Overhead Press',
          muscleGroup: 'shoulders',
          sets: [
            { setNumber: 1, reps: 10, weight: 45, rpe: 7 },
            { setNumber: 2, reps: 8, weight: 50, rpe: 8 },
            { setNumber: 3, reps: 8, weight: 50, rpe: 9 },
          ],
        },
      ],
      overallIntensity: 'very-hard',
      sleepQuality: 'good',
      duration: 70,
    },
    {
      userId: user._id,
      planType: 'A',
      date: subDays(new Date(), 2),
      exercises: [
        {
          exerciseId: '9',
          exerciseName: 'Bench Press',
          muscleGroup: 'chest',
          sets: [
            { setNumber: 1, reps: 10, weight: 70, rpe: 7 },
            { setNumber: 2, reps: 10, weight: 75, rpe: 8 },
            { setNumber: 3, reps: 8, weight: 80, rpe: 9 },
            { setNumber: 4, reps: 6, weight: 82.5, rpe: 10 },
          ],
        },
        {
          exerciseId: '10',
          exerciseName: 'Squats',
          muscleGroup: 'legs',
          sets: [
            { setNumber: 1, reps: 10, weight: 90, rpe: 7 },
            { setNumber: 2, reps: 10, weight: 95, rpe: 8 },
            { setNumber: 3, reps: 8, weight: 100, rpe: 9 },
          ],
        },
      ],
      overallIntensity: 'hard',
      sleepQuality: 'excellent',
      duration: 68,
      notes: 'New PR on bench press!',
    },
  ];
  
  // Insert sample workouts
  await WorkoutSessionModel.insertMany(sampleWorkouts);
  
  console.log(`✅ Successfully seeded ${sampleWorkouts.length} workouts`);
  console.log('You can now view progress charts and history!');
  
  process.exit(0);
}

seed().catch((error) => {
  console.error('Error seeding data:', error);
  process.exit(1);
});
*/

export {};

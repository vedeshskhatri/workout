/**
 * Script to seed workout plans for a user
 * Usage: npx tsx scripts/seed-workout-plans.ts <userEmail>
 */

import * as dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';
import { WorkoutPlanModel } from '../models/WorkoutPlan';
import { UserModel } from '../models/User';
import { PRESET_PLANS } from '../lib/preset-workout-plans';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB');
  }
}

async function seedWorkoutPlans(userEmail: string) {
  try {
    await connectDB();

    // Find the user
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      console.error(`❌ User with email ${userEmail} not found`);
      process.exit(1);
    }

    console.log(`✅ Found user: ${user.name || user.email}`);

    // Create Plan A
    const planAExercises = [
      ...PRESET_PLANS.MONDAY_A.exercises.map((ex, i) => ({ ...ex, id: `mon-a-${i}` })),
      ...PRESET_PLANS.TUESDAY_A.exercises.map((ex, i) => ({ ...ex, id: `tue-a-${i}` })),
      ...PRESET_PLANS.WEDNESDAY_A.exercises.map((ex, i) => ({ ...ex, id: `wed-a-${i}` })),
      ...PRESET_PLANS.THURSDAY_A.exercises.map((ex, i) => ({ ...ex, id: `thu-a-${i}` })),
      ...PRESET_PLANS.FRIDAY_A.exercises.map((ex, i) => ({ ...ex, id: `fri-a-${i}` })),
      ...PRESET_PLANS.SATURDAY_A.exercises.map((ex, i) => ({ ...ex, id: `sat-a-${i}` })),
    ];

    const planA = await WorkoutPlanModel.findOneAndUpdate(
      { userId: user._id, planType: 'A' },
      {
        userId: user._id,
        name: 'Workout Plan A - 6 Day Split',
        planType: 'A',
        exercises: planAExercises,
      },
      { upsert: true, new: true }
    );

    console.log(`✅ Created/Updated Plan A with ${planAExercises.length} exercises`);
    console.log('   Monday: Chest + Triceps (12 exercises)');
    console.log('   Tuesday: Back + Biceps (12 exercises)');
    console.log('   Wednesday: Legs + Abs (12 exercises)');
    console.log('   Thursday: Shoulders + Triceps (12 exercises)');
    console.log('   Friday: Back + Forearms (12 exercises)');
    console.log('   Saturday: Chest + Abs (12 exercises)');

    // Create Plan B
    const planBExercises = [
      ...PRESET_PLANS.MONDAY_B.exercises.map((ex, i) => ({ ...ex, id: `mon-b-${i}` })),
      ...PRESET_PLANS.TUESDAY_B.exercises.map((ex, i) => ({ ...ex, id: `tue-b-${i}` })),
      ...PRESET_PLANS.WEDNESDAY_B.exercises.map((ex, i) => ({ ...ex, id: `wed-b-${i}` })),
      ...PRESET_PLANS.THURSDAY_B.exercises.map((ex, i) => ({ ...ex, id: `thu-b-${i}` })),
      ...PRESET_PLANS.FRIDAY_B.exercises.map((ex, i) => ({ ...ex, id: `fri-b-${i}` })),
      ...PRESET_PLANS.SATURDAY_B.exercises.map((ex, i) => ({ ...ex, id: `sat-b-${i}` })),
    ];

    const planB = await WorkoutPlanModel.findOneAndUpdate(
      { userId: user._id, planType: 'B' },
      {
        userId: user._id,
        name: 'Workout Plan B - 6 Day Split',
        planType: 'B',
        exercises: planBExercises,
      },
      { upsert: true, new: true }
    );

    console.log(`✅ Created/Updated Plan B with ${planBExercises.length} exercises`);
    console.log('   Monday: Chest + Triceps (12 exercises)');
    console.log('   Tuesday: Back + Biceps (12 exercises)');
    console.log('   Wednesday: Legs + Abs (12 exercises)');
    console.log('   Thursday: Shoulders + Triceps (12 exercises)');
    console.log('   Friday: Back + Forearms (12 exercises)');
    console.log('   Saturday: Chest + Abs (12 exercises)');

    console.log('\n✅ Workout plans seeded successfully!');
    console.log(`   The plans alternate by week - odd weeks use Plan A, even weeks use Plan B`);
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding workout plans:', error);
    process.exit(1);
  }
}

// Get user email from command line
const userEmail = process.argv[2];
if (!userEmail) {
  console.error('❌ Please provide a user email');
  console.log('Usage: npx tsx scripts/seed-workout-plans.ts <userEmail>');
  process.exit(1);
}

seedWorkoutPlans(userEmail);

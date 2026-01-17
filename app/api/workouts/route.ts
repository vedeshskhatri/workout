import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { WorkoutSessionModel } from '@/models/WorkoutSession';
import { UserModel } from '@/models/User';
import { estimateRecoveryFromWorkout } from '@/lib/recovery-estimation';
import { z } from 'zod';

const exerciseSetSchema = z.object({
  reps: z.number().min(1),
  weight: z.number().min(0),
  rpe: z.number().min(1).max(10).optional(),
});

const exerciseSchema = z.object({
  exerciseName: z.string().min(1),
  muscleGroup: z.string().min(1),
  sets: z.array(exerciseSetSchema).min(1),
  notes: z.string().optional(),
});

const workoutSchema = z.object({
  planType: z.enum(['A', 'B']),
  date: z.string().transform((str) => new Date(str)),
  exercises: z.array(exerciseSchema).min(1),
  overallIntensity: z.enum(['light', 'moderate', 'hard', 'very-hard']).optional(),
  sleepQuality: z.enum(['poor', 'good', 'excellent']).optional(),
  duration: z.number().optional(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Get or create user
    let user = await UserModel.findOne({});
    if (!user) {
      user = await UserModel.create({
        email: 'vedesh@workout.app',
        name: 'Vedesh',
        experienceLevel: 'intermediate',
      });
    }

    const body = await req.json();
    const validatedData = workoutSchema.parse(body);

    // Transform exercises to include IDs
    const exercises = validatedData.exercises.map((exercise, index) => ({
      exerciseId: `${Date.now()}-${index}`,
      exerciseName: exercise.exerciseName,
      muscleGroup: exercise.muscleGroup,
      sets: exercise.sets.map((set, setIndex) => ({
        setNumber: setIndex + 1,
        reps: set.reps,
        weight: set.weight,
        rpe: set.rpe,
      })),
      notes: exercise.notes,
    }));

    // Create workout session
    const workout = await WorkoutSessionModel.create({
      userId: user._id,
      planType: validatedData.planType,
      date: validatedData.date,
      exercises,
      overallIntensity: validatedData.overallIntensity,
      sleepQuality: validatedData.sleepQuality,
      duration: validatedData.duration,
      notes: validatedData.notes,
    });

    // Get previous workouts for recovery estimation
    const previousWorkouts = await WorkoutSessionModel.find({
      userId: user._id,
      date: { $lt: validatedData.date },
    })
      .sort({ date: -1 })
      .limit(20)
      .lean();

    // Calculate recovery estimates
    const workoutData = {
      _id: workout._id.toString(),
      userId: user._id.toString(),
      planType: workout.planType,
      date: new Date(workout.date),
      exercises: workout.exercises,
      overallIntensity: workout.overallIntensity,
      sleepQuality: workout.sleepQuality,
      duration: workout.duration,
      notes: workout.notes,
      createdAt: workout.createdAt,
      updatedAt: workout.updatedAt,
    };

    const recoveryEstimates = estimateRecoveryFromWorkout(
      workoutData as any,
      previousWorkouts.map((w: any) => ({
        ...w,
        _id: w._id.toString(),
        userId: w.userId.toString(),
        date: new Date(w.date),
        createdAt: new Date(w.createdAt),
        updatedAt: new Date(w.updatedAt),
      })) as any,
      user.experienceLevel
    );

    return NextResponse.json({
      success: true,
      workout: workoutData,
      recoveryEstimates,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating workout:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Get or create user
    let user = await UserModel.findOne({});
    if (!user) {
      user = await UserModel.create({
        email: 'vedesh@workout.app',
        name: 'Vedesh',
        experienceLevel: 'intermediate',
      });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const planType = searchParams.get('planType');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const query: any = { userId: user._id };

    if (planType) {
      query.planType = planType;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const workouts = await WorkoutSessionModel.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({
      workouts: workouts.map((w) => ({
        ...w,
        _id: w._id.toString(),
        userId: w.userId.toString(),
      })),
    });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

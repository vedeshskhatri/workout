import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { WorkoutPlanModel } from '@/models/WorkoutPlan';
import { UserModel } from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Get or create default user
    let user = await UserModel.findOne({});
    if (!user) {
      user = await UserModel.create({
        email: 'default@workout.app',
        name: 'Athlete',
        experienceLevel: 'intermediate',
      });
    }

    const { searchParams } = new URL(req.url);
    const planType = searchParams.get('planType');

    if (!planType) {
      return NextResponse.json({ error: 'Plan type required' }, { status: 400 });
    }

    const plan = await WorkoutPlanModel.findOne({
      userId: user._id,
      planType,
    }).lean();

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Error fetching plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
    const { planType, exercises } = body;

    const plan = await WorkoutPlanModel.findOneAndUpdate(
      { userId: user._id, planType },
      { userId: user._id, planType, exercises },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    console.error('Error saving plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

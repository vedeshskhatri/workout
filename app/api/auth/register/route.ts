import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    const existingUser = await UserModel.findOne({
      email: validatedData.email.toLowerCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    await UserModel.create({
      name: validatedData.name,
      email: validatedData.email.toLowerCase(),
      password: hashedPassword,
      experienceLevel: validatedData.experienceLevel,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

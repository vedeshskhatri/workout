import mongoose, { Model } from 'mongoose';

interface IUser {
  email: string;
  name?: string;
  password?: string;
  image?: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
}

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: String,
  password: String,
  image: String,
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
}, {
  timestamps: true,
});

export const UserModel = (mongoose.models?.User || mongoose.model<IUser>('User', UserSchema)) as Model<IUser>;

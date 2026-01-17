import mongoose from 'mongoose';

const ExerciseSetSchema = new mongoose.Schema({
  setNumber: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  rpe: Number,
}, { _id: false });

const CompletedExerciseSchema = new mongoose.Schema({
  exerciseId: String,
  exerciseName: {
    type: String,
    required: true,
  },
  muscleGroup: {
    type: String,
    required: true,
  },
  sets: [ExerciseSetSchema],
  notes: String,
}, { _id: false });

const WorkoutSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  planType: {
    type: String,
    enum: ['A', 'B'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
    index: true,
  },
  exercises: [CompletedExerciseSchema],
  overallIntensity: {
    type: String,
    enum: ['light', 'moderate', 'hard', 'very-hard'],
  },
  sleepQuality: {
    type: String,
    enum: ['poor', 'good', 'excellent'],
  },
  duration: Number,
  notes: String,
  photoUrl: String,
}, {
  timestamps: true,
});

// Compound indexes for efficient querying
WorkoutSessionSchema.index({ userId: 1, date: -1 });
WorkoutSessionSchema.index({ userId: 1, planType: 1 });

export const WorkoutSessionModel = mongoose.models?.WorkoutSession || mongoose.model('WorkoutSession', WorkoutSessionSchema);

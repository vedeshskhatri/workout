import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: true,
  },
  muscleGroup: {
    type: String,
    required: true,
  },
  targetSets: Number,
  targetReps: String,
  notes: String,
});

const WorkoutPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  planType: {
    type: String,
    enum: ['A', 'B'],
    required: true,
  },
  exercises: [ExerciseSchema],
}, {
  timestamps: true,
});

// Compound index for efficient querying
WorkoutPlanSchema.index({ userId: 1, planType: 1 });

export const WorkoutPlanModel = mongoose.models?.WorkoutPlan || mongoose.model('WorkoutPlan', WorkoutPlanSchema);

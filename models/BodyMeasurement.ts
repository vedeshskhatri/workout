import mongoose from 'mongoose';

const BodyMeasurementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
    index: true,
  },
  weight: Number,
  bodyFat: Number,
  chest: Number,
  waist: Number,
  hips: Number,
  biceps: Number,
  thighs: Number,
  notes: String,
}, {
  timestamps: true,
});

BodyMeasurementSchema.index({ userId: 1, date: -1 });

export const BodyMeasurementModel = mongoose.models?.BodyMeasurement || mongoose.model('BodyMeasurement', BodyMeasurementSchema);

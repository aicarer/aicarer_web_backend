import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const healthDataSchema = new Schema({
  userId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  heartRate: { type: Number, required: true },
  hrv: { type: Number, required: true },
  respiratoryRate: { type: Number, required: true },
  syncStatus: { type: Boolean, default: false },
  syncTime: { type: Date },
});

export const HealthData = model('HealthData', healthDataSchema);

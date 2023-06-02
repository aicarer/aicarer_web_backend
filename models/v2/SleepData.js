import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sleepDataSchema = new Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  totalSleepTime: { type: Number, required: true }, // in minutes
  remSleep: { type: Number, required: true }, // in minutes
  deepSleep: { type: Number, required: true }, // in minutes
  lightSleep: { type: Number, required: true }, // in minutes
  awakeTime: { type: Number, required: true }, // in minutes
  sleepEfficiency: { type: Number }, // in percentage
  sleepStart: { type: Date },
  sleepEnd: { type: Date },
  syncStatus: { type: Boolean, default: false },
  syncTime: { type: Date },
});

export const SleepData = model('SleepData', sleepDataSchema);

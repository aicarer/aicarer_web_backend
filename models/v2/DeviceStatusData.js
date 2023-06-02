import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const deviceStatusDataSchema = new Schema({
  userId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  isOnline: { type: Boolean, required: true },
  isOnWrist: { type: Boolean, required: true },
  isCharging: { type: Boolean, required: true },
  isLowBattery: { type: Boolean, required: true },
  gpsLocation: { type: String, required: true },
  syncStatus: { type: Boolean, default: false },
  syncTime: { type: Date },
});

export const DeviceStatus = model('DeviceStatus', deviceStatusDataSchema);

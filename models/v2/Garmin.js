import mongoose from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import dotenv from 'dotenv';

dotenv.config();

const pubsub = new PubSub();
const { Schema, model, Types } = mongoose;

const garminSchema = new Schema({
    getSleepData: { type: String },
    getHeartRateData: { type: String },
    getHRVData: { type: String },
    getRespiratoryRateData: { type: String },
    getStepsData: { type: String },
    getAccelerometerData: { type: String },
    isDeviceOnline: { type: Boolean, default: false },
    isDeviceOnWrist: { type: Boolean, default: false },
    isDeviceCharging: { type: Boolean, default: false },
    getLocationData: { type: String },
});

export const Garmin = model('Garmin', garminSchema);
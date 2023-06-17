import mongoose from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import dotenv from 'dotenv';

dotenv.config();

const pubsub = new PubSub();
const { Schema, model, Types } = mongoose;

const userSchema = new Schema({
  address: { type: String, required: true },
  anyMedication: String,
  birthDate: { type: String, required: true },
  culturalBackground: String,
  email: { type: String, required: true },
  exercise: String,
  firstName: { type: String, required: true },
  gender: { type: String, required: true },
  height: String,
  lastName: { type: String, required: true },
  medicalConditions: [String],
  middleName: String,
  mobileNumber: { type: String, required: true },
  occupation: String,
  otherMedicalCondition: String,
  otherPhone: String,
  otherPrefixNumber: String,
  password: String,
  prefixNumber: String,
  socialEngagements: String,
  weight: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  referenceId: {type: String},
  deletedAt: { type: Date },
});

export const User = model('User', userSchema);
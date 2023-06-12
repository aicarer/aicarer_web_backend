import mongoose from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import dotenv from 'dotenv';

dotenv.config();

const pubsub = new PubSub();
const { Schema, model, Types } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  otherPhone: { type: String },
  email: { type: String, required: true },
  address: { type: String, required: true },
  birthDate: { type: String, required: true },
  gender: { type: String, required: true },
  occupation: { type: String },
  height: { type: String },
  weight: { type: String },
  medicalCondition: { type: String },
  password: { type: String, required: true },
  medication: { type: String },
  culturalBackground: { type: String },
  socialEngagements: { type: String },
  exercise: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  referenceId: {type: String},
  deletedAt: { type: Date },
});

export const User = model('User', userSchema);
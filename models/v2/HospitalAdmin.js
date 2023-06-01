import mongoose from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import dotenv from 'dotenv';

dotenv.config();

const pubsub = new PubSub();
const { Schema, model, Types } = mongoose;

const hospitalAdminSchema = new Schema({
  abnDuns: { type: String },
  phoneNumber: { type: String },
  referenceId: { type: Number },
  adminFirstName: { type: String, required: true },
  adminLastName: { type: String, required: true },
  adminEmailAddress: { type: String, required: true },
  adminMobileNumber: { type: String, required: true },
  adminPassword: { type: String, required: true },
  billingContactName: { type: String },
  billingEmailAddress: { type: String },
  billingAddress: { type: String },
  billingPhoneNumber: { type: String },
  adminId: { type: Schema.Types.ObjectId, ref: 'Organization' },
  isDisabled: { type: Boolean, default: false },
});

export const HospitalAdmin = model('HospitalAdmin', hospitalAdminSchema);
import mongoose from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import dotenv from 'dotenv';

dotenv.config();

const pubsub = new PubSub();
const { Schema, model, Types } = mongoose;

const adminSchema = new Schema({
  organizationName: { type: String, required: true },
  organizationType: { type: String, required: true },
  organizationAddress: { type: String },
  organizationCountry: { type: String, required: true },
  abnDuns: { type: String },
  phoneNumber: { type: String },
  referenceId: { type: String },
  adminFirstName: { type: String, required: true },
  adminLastName: { type: String, required: true },
  adminEmailAddress: { type: String, required: true },
  adminMobileNumber: { type: String, required: true },
  adminPassword: { type: String, required: true },
  billingContactName: { type: String },
  billingEmailAddress: { type: String },
  billingAddress: { type: String },
  billingPhoneNumber: { type: String },
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },
  isDisabled: { type: Boolean, default: false },
  mfaEnabled: { type: Boolean, default: true },
  mfaCode: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
  mfaExpiry: { type: Date, default: null }
});

export const Admin = model('Admin', adminSchema);
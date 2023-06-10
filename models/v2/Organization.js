import mongoose from 'mongoose';
import {PubSub} from 'graphql-subscriptions'
import dotenv from 'dotenv';
dotenv.config();
const pubsub = new PubSub();
const { Schema, model, Types } = mongoose;

const organizationSchema = new mongoose.Schema({
  abnDuns: { type: Number },
  phoneNumber: { type: Number },
  organizationName: { type: String, required: true },
  organizationType: { type: String, required: true },
  organizationAddress: { type: String },
  organizationCountry: { type: String, required: true },
  referenceId: { type: String, required: true, maxlength: 100 },
  adminFirstName: { type: String, required: true },
  adminLastName: { type: String, required: true },
  adminEmailAddress: { type: String, required: true },
  adminMobileNumber: { type: Number, required: true },
  adminPassword: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
});

export const Organization = mongoose.model('Organization', organizationSchema);

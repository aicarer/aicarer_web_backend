import mongoose from 'mongoose';
import {PubSub} from 'graphql-subscriptions'
import dotenv from 'dotenv';
dotenv.config();
const pubsub = new PubSub();
const { Schema, model, Types } = mongoose;

const organizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  abnDuns: { type: Number },
  organizationType: { type: String, required: true },
  phoneNumber: { type: Number },
  organizationAddress: { type: String },
  organizationCountry: { type: String, required: true },
  referenceId: { type: String, required: true, maxlength: 100 },
  adminFirstName: { type: String, required: true },
  adminLastName: { type: String, required: true },
  adminEmailAddress: { type: String, required: true },
  adminMobileNumber: { type: Number, required: true },
  adminPassword: { type: String, required: true },
  billingContactName: { type: String },
  billingEmailAddress: { type: String },
  billingAddress: { type: String },
  billingPhoneNumber: { type: String }
});

export const Organization = mongoose.model('Organization', organizationSchema);

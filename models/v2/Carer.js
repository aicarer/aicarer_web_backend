import mongoose from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import dotenv from 'dotenv';

dotenv.config();

const pubsub = new PubSub();
const { Schema, model, Types } = mongoose;

const carerSchema = new Schema({
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    prefixNumber: String,
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    birthDate: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    referenceId: {type: String},
    deletedAt: { type: Date },
});

export const Carer = model('Carer', carerSchema);
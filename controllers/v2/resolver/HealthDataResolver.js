import { PubSub } from 'apollo-server';
import { HealthData } from '../../../models/v2/HealthData.js';

const pubsub = new PubSub();
const HEALTH_DATA_UPDATED = 'HEALTH_DATA_UPDATED';

const resolvers = {
  Query: {
    getHealthData: async (_, { id }) => {
      return HealthData.findById(id);
    },
  },
  Mutation: {
    updateHealthData: async (_, { id, heartRate, hrv, respiratoryRate, timestamp }) => {
      const healthData = await HealthData.findByIdAndUpdate(id, { heartRate, hrv, respiratoryRate, timestamp }, { new: true });
      pubsub.publish(HEALTH_DATA_UPDATED, { healthDataUpdated: healthData });
      return healthData;
    },
  },
  Subscription: {
    healthDataUpdated: {
      subscribe: () => pubsub.asyncIterator([HEALTH_DATA_UPDATED]),
    },
  },
};

export default resolvers;

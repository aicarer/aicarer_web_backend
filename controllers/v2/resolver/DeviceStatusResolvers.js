import { DeviceStatusData } from '../../../models/v2/DeviceStatusData.js';

const resolvers = {
  Query: {
    getDeviceStatus: async (_, { id }) => {
      return DeviceStatusData.findById(id);
    },
  },
  Mutation: {
    updateDeviceStatus: async (_, { id, isOnline, isOnWrist, isCharging, isLowBattery, gpsLocation, timestamp }) => {
      const deviceStatusData = await DeviceStatusData.findByIdAndUpdate(id, { isOnline, isOnWrist, isCharging, isLowBattery, gpsLocation, timestamp }, { new: true });
      return deviceStatusData;
    },
  },
};

export default resolvers;

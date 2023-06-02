import { SleepData } from '../../../models/v2/SleepData.js';
import dotenv from "dotenv";

dotenv.config();

const resolvers = {
    Query: {
      getSleepData: async (_, { id }) => {
        try {
          const sleepData = await SleepData.findById(id);
          return sleepData;
        } catch (error) {
          throw error;
        }
      },
    },
    Mutation: {
      updateSleepData: async (_, { id, remSleep, deepSleep, lightSleep, awakeTime, sleepEfficiency, sleepStart, sleepEnd }) => {
        try {
          const response = await axios.get(`https://aicarer-be.azurewebsites.net/sleepdata${id}`, {
            headers: {
              'Authorization': `Bearer ${process.env.GARMIN_CLIENT_ID}:${process.env.GARMIN_CLIENT_SECRET}`
            }
          });
  
          if(response.status === 200) {
            const sleepData = await SleepData.findByIdAndUpdate(id, { remSleep, deepSleep, lightSleep, awakeTime, sleepEfficiency, sleepStart, sleepEnd }, { new: true });
            return sleepData;
          } else {
            throw new Error('Data sync failed');
          }
        } catch (error) {
          throw error;
        }
      },
    },
  };
  export default resolvers;
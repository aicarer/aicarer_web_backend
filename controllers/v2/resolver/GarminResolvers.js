// import { Garmin } from '../../../models/v2/Garmin';

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

const resolvers = {
    Query: {
        getSleepData: async () => {
          console.log("RUNNING CODE");
            try {
            // Implement logic to fetch sleep data from Garmin Venue 2 Plus API
            const sleepData = await fetchSleepData();
            console.log("RUNNING CODE");
            console.log(sleepData);
            if(sleepData){
              console.log(sleepData);
            }
          
            // Transform the fetched data if needed
            const transformedData = sleepData.map(item => ({
                timeOfDay: item.time,
                // Add other fields specific to sleep data
            }));

            return transformedData;
            } catch (error) {
            console.error('Error fetching sleep data:');
            console.log(JSON.stringify(error));
            throw new Error('Failed to fetch sleep data');
            }
        },
      getHeartRateData: () => {
        // Implement logic to fetch heart rate data from Garmin Venue 2 Plus API
        // Return an array of HeartRateData objects
        // Example implementation (replace with actual API call):
        return fetchHeartRateData();
      },
      getHRVData: () => {
        // Implement logic to fetch HRV data from Garmin Venue 2 Plus API
        // Return an array of HRVData objects
        // Example implementation (replace with actual API call):
        return fetchHRVData();
      },
      getRespiratoryRateData: () => {
        // Implement logic to fetch respiratory rate data from Garmin Venue 2 Plus API
        // Return an array of RespiratoryRateData objects
        // Example implementation (replace with actual API call):
        return fetchRespiratoryRateData();
      },
      getStepsData: () => {
        // Implement logic to fetch steps data from Garmin Venue 2 Plus API
        // Return an array of StepsData objects
        // Example implementation (replace with actual API call):
        return fetchStepsData();
      },
      getAccelerometerData: () => {
        // Implement logic to fetch accelerometer data from Garmin Venue 2 Plus API
        // Return an array of AccelerometerData objects
        // Example implementation (replace with actual API call):
        return fetchAccelerometerData();
      },
      isDeviceOnline: () => {
        // Implement logic to determine if the device is online and connected
        // Return a boolean value
        // Example implementation (replace with actual logic):
        return isDeviceOnline();
      },
      isDeviceOnWrist: () => {
        // Implement logic to determine if the device is on the wrist
        // Return a boolean value
        // Example implementation (replace with actual logic):
        return isDeviceOnWrist();
      },
      isDeviceCharging: () => {
        // Implement logic to determine if the device is charging
        // Return a boolean value
        // Example implementation (replace with actual logic):
        return isDeviceCharging();
      },
      getLocationData: () => {
        // Implement logic to fetch location data from the phone
        // Return a LocationData object
        // Example implementation (replace with actual API call):
        return fetchLocationData();
      },
    },
    Mutation: {
      sendPushNotification: (_, { message }) => {
        // Implement logic to send push notification to the phone and Garmin mobile device
        // Return a PushNotificationResponse object with success status and message
        // Example implementation (replace with actual logic):
        return sendPushNotification(message);
      },

      // syncDataToPhone: () => {
      //   // Implement logic to sync sleep data to the phone every 10 minutes
      //   // Return a SyncResponse object with success status and message
      //   // Example implementation (replace with actual logic):
      //   const syncSuccess = syncSleepDataToPhone();
      //   if (syncSuccess) {
      //     return { success: true, message: 'Sleep data synced to phone.' };
      //   } else {
      //     return { success: false, message: 'Failed to sync sleep data to phone.' };
      //   }
      // },
      syncDataToServer: () => {
        // Implement logic to sync sleep data to the server every 1 hour
        // Return a SyncResponse object with success status and message
        // Example implementation (replace with actual logic):
        const syncSuccess = syncSleepDataToServer();
        if (syncSuccess) {
          return { success: true, message: 'Sleep data synced to the server.' };
        } else {
          return { success: false, message: 'Failed to sync sleep data to the server.' };
        }
      },
    },
  };


  async function fetchSleepData() {
    try {
      // Make a request to the Garmin Venue 2 Plus API sleep data endpoint
      const response = await fetch('https://aicarer-be.azurewebsites.net/aicarer-sleepdata', {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
        },
      });
      console.log(response);
  
      if (!response.ok) {
        throw new Error('Failed to fetch sleep data from Garmin Venue 2 Plus API');
      }
  
      const sleepData = await response.json();
  
      // Return the fetched sleep data
      return sleepData;
    } catch (error) {
      console.error('Error fetching sleep data:', error);
      throw new Error('Failed to fetch sleep data');
    }
  }

  export default resolvers;
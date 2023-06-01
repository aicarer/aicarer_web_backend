import { HospitalAdmin } from '../../../models/v2/HospitalAdmin.js';

const resolvers = {
  Query: {
    hospitalAdmin: async () => {
      try {
        const result = await HospitalAdmin.find({});
        return result;
      } catch (err) {
        throw new Error('Error getting admins', err);
      }
    },
    hospitalAdmins: async (_, { id }) => {
      try {
        const result = await HospitalAdminHospitalAdmin.findById(id);
        if (!result) {
          throw new Error('Admin not found');
        }
        return result;
      } catch (err) {
        throw new Error('Error getting admin', err);
      }
    },
  },
  Mutation: {
    createHospitalAdmin: async (_, args) => {
      try {
        console.log(args.input);
        const result = await HospitalAdmin.create(args.input);
        return result;
      } catch (err) {
        console.log(err);
        throw new Error('Error creating admin', err);
      }
    },
    readAllHospitalAdmin: async () => {
      try {
        const result = await HospitalAdmin.find({});
        return result;
      } catch (err) {
        throw new Error('Error getting admins', err);
      }
    },
    hospitalAdminLogin: async (_, { email, password }) => {
      try {
        const result = await HospitalAdmin.findOne({ adminEmailAddress: email });
        if (!result) {
          throw new Error('Invalid email or password');
        }
        
        // Here, you can implement your own logic to validate the password.
        // For example, you can use a password hashing library like bcrypt to compare the hashed password with the provided one.
        // Ensure that the password validation logic is secure and appropriate for your application.
        const isValidPassword = (admin.adminPassword === password);
        
        if (!isValidPassword) {
          throw new Error('Invalid email or password');
        }
        
        return admin;
      } catch (err) {
        throw new Error('Error during admin login', err);
      }
    },
    updateHospitalAdmin: async (_, { id, ...args }) => {
      try {
        console.log(args);
        const result = await HospitalAdmin.findByIdAndUpdate(id, args.input, { new: true });
        if (!result) {
          throw new Error('Admin not found');
        }
        return result;
      } catch (err) {
        throw new Error('Error updating admin', err);
      }
    },
    deleteHospitalAdmin: async (_, { id }) => {
      try {
        const result = await HospitalAdmin.findByIdAndDelete(id);
        if (!result) {
          throw new Error('Admin not found');
        }
        return result;
      } catch (err) {
        throw new Error('Error deleting admin', err);
      }
    },
    toggleHospitalAdminDisabled: async (_, { id }) => {
        try {
          const result = await HospitalAdmin.findById(id);
          if (!result) {
            throw new Error('Admin not found');
          }
  
          result.isDisabled = !result.isDisabled;
          await result.save();
  
          return result;
        } catch (err) {
          throw new Error('Error toggling admin disabled', err);
        }
      },
  },
};

export default resolvers;
import { Admin } from '../../../models/v2/Admin.js';

const resolvers = {
  Query: {
    admins: async () => {
      try {
        const admins = await Admin.find({});
        return admins;
      } catch (err) {
        throw new Error('Error getting admins', err);
      }
    },
    admin: async (_, { id }) => {
      try {
        const admin = await Admin.findById(id);
        if (!admin) {
          throw new Error('Admin not found');
        }
        return admin;
      } catch (err) {
        throw new Error('Error getting admin', err);
      }
    },
  },
  Mutation: {
    createAdmin: async (_, args) => {
      try {
        console.log(args.input);
        const admin = await Admin.create(args.input);
        return admin;
      } catch (err) {
        console.log(err);
        throw new Error('Error creating admin', err);
      }
    },
    adminLogin: async (_, { email, password }) => {
      try {
        const admin = await Admin.findOne({ adminEmailAddress: email });
        if (!admin) {
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
    updateAdmin: async (_, { id, ...args }) => {
      try {
        const admin = await Admin.findByIdAndUpdate(id, args, { new: true });
        if (!admin) {
          throw new Error('Admin not found');
        }
        return admin;
      } catch (err) {
        throw new Error('Error updating admin', err);
      }
    },
    deleteAdmin: async (_, { id }) => {
      try {
        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
          throw new Error('Admin not found');
        }
        return admin;
      } catch (err) {
        throw new Error('Error deleting admin', err);
      }
    },
    toggleAdminDisabled: async (_, { id }) => {
        try {
          const admin = await Admin.findById(id);
          if (!admin) {
            throw new Error('Admin not found');
          }
  
          admin.isDisabled = !admin.isDisabled;
          await admin.save();
  
          return admin;
        } catch (err) {
          throw new Error('Error toggling admin disabled', err);
        }
      },
  },
};

export default resolvers;
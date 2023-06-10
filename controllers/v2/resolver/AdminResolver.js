import { Admin } from '../../../models/v2/Admin.js';
import { Organization } from '../../../models/v2/Organization.js';
import { validateMFA,generateMFA, sendMFAEmail, updateUser } from '../../../public/service/mfaService.js';
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
    readAllAdmin: async () => {
      try {
        const admins = await Admin.find({});
        return admins;
      } catch (err) {
        throw new Error('Error getting admins', err);
      }
    },
    adminLogin: async (_, { email, password, mfaCode }) => {
      try {
        const admin = await Admin.findOne({ adminEmailAddress: email });

        if (!admin || admin.password !== password) {
          throw new Error('Invalid email or password');
        }
  
        if (admin.mfaEnabled) {
          if (!mfaCode) {
            throw new Error('MFA code is required');
          }
  
          const isValidCode = validateMFA(admin, mfaCode);
          if (!isValidCode) {
            throw new Error('Invalid MFA code or code has expired');
          }
        }
      } catch (err) {
        throw new Error('Error during admin login', err);
      }
    },
    enableMFA: async (_, { email }) => {
      const user = await Admin.findOne({ adminEmailAddress: email });

      if (!user) {
        throw new Error('User not found');
      }

      const mfaCode = generateMFA(user);
      sendMFAEmail(user.adminEmailAddress, mfaCode);

      user.mfaEnabled = true;
      await updateUser(user);

      return true;
    },
    updateAdmin: async (_, { id, ...args }) => {
      try {
        console.log(args);
        const admin = await Admin.findByIdAndUpdate(id, args.input, { new: true });
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
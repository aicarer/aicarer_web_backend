
import { Organization }  from '../../../models/v2/Organization.js';
import { Admin }  from '../../../models/v2/Admin.js';
import { validateMFA,generateMFA, sendMFAEmail, updateUser } from '../../../public/service/mfaService.js';
const resolvers = {
  Query: {
    organizations: async () => {
      try {
        const organizations = await Organization.find({});
        return organizations;
      } catch (err) {
        throw new Error('Error getting organizations', err);
      }
    },
    organization: async (_, { id }) => {
      try {
        const organization = await Organization.findById(id);
        if (!organization) {
          throw new Error('Organization not found');
        }
        return organization;
      } catch (err) {
        throw new Error('Error getting organization', err);
      }
    },
  },
  Mutation: {
    createOrganization: async (_, args) => {
      try {
        console.log(args.input)
        const organization = await Organization.create(args.input);
        return organization;
      } catch (err) {
        console.log(err)
        throw new Error('Error creating organization', err);
      }
    },
    organizationLogin: async (_, { email, password, mfaCode }) => {
      console.log("MFACODE", mfaCode);
      try {
        const admin = await Admin.findOne({ adminEmailAddress: email });
        console.log(admin.password !== password);
        console.log(admin.adminPassword);
        console.log(password);
        if (!admin || admin.adminPassword !== password) {
          throw new Error('Invalid email or password');
        }
  
        if (admin.mfaEnabled) {
          if (!mfaCode) {
            return new Error('MFAREQUIRED');
          }
  
          const isValidCode = validateMFA(admin, mfaCode);
          console.log(isValidCode);
          if (!isValidCode) {
            return new Error('Invalid MFA code or code has expired');
          }

          const typename = {
            ...admin.toObject(),
            __typename: 'Admin',
            userType: 'Admin'
          };
          console.log(admin);
          return typename;
        }
      } catch (error) {
        console.log(error.message)
      }

      try {
        const admin = await Organization.findOne({adminEmailAddress: email});
        console.log("FOUND")
        const typename = {
          ...admin.toObject(),
          __typename: 'Organization',
          userType: 'Organization'
        };
        if (!admin) {
          // return {data: {__typename: 'Organization', data: null}};
        }

        const isPasswordMatch = (admin.adminPassword === password);
        if (!isPasswordMatch) {
          // return {data: {__typename: 'Organization', data: null}};
        }
        return typename;
      } catch (error) {
        console.log(error.message)
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
    updateOrganization: async (_, { id, ...args }) => {
      try {
        const organization = await Organization.findByIdAndUpdate(id, args, { new: true });
        if (!organization) {
          throw new Error('Organization not found');
        }
        return organization;
      } catch (err) {
        throw new Error('Error updating organization', err);
      }
    },
    deleteOrganization: async (_, { id }) => {
      try {
        const organization = await Organization.findByIdAndDelete(id);
        if (!organization) {
          throw new Error('Organization not found');
        }
        return organization;
      } catch (err) {
        throw new Error('Error deleting organization', err);
      }
    },
  },
};

export default resolvers;
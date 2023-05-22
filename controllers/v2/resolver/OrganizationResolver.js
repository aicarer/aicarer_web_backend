
import { Organization }  from '../../../models/v2/Organization.js';

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
    organizationLogin: async (_, { email, password }) => {
      try {
        const organization = await Organization.findOne({ adminEmailAddress: email });
        if (!organization) {
          throw new Error('Invalid email or password');
        }
        
        // Here, you can implement your own logic to validate the password.
        // For example, you can use a password hashing library like bcrypt to compare the hashed password with the provided one.
        // Ensure that the password validation logic is secure and appropriate for your application.
        const isValidPassword = (organization.adminPassword === password);
        
        if (!isValidPassword) {
          throw new Error('Invalid email or password');
        }
        
        return organization;
      } catch (err) {
        throw new Error('Error during organization login', err);
      }
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
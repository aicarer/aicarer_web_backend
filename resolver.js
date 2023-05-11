const Organization = require('./models/organization.js');

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
        const organization = await Organization.create(args);
        return organization;
      } catch (err) {
        throw new Error('Error creating organization', err);
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

module.exports = resolvers;

import { Organization }  from '../../../models/v2/Organization.js';
import { Admin }  from '../../../models/v2/Admin.js';
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
        const admin = await Admin.findOne({adminEmailAddress: email});
        console.log(admin);
        const typename = {
          ...admin.toObject(),
          __typename: 'Admin',
          userType: 'Admin'
        };
        if (!admin) {
          // return {data: {__typename: 'Admin', data: null}};
        }

        const isPasswordMatch = (admin.adminPassword === password);
        if (!isPasswordMatch) {
          // return {data: {__typename: 'Admin', data: null}};
        }

        return typename;
      } catch (doctorError) {
        console.log(doctorError);
      }

      try {
        const admin = await Organization.findOne({adminEmailAddress: email});
        console.log(admin);
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
      } catch (doctorError) {
        console.log(doctorError);
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
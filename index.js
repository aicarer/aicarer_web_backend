const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const db = require('./db');
const Organization = require('./models/organization.js');


const typeDefs = gql`
  type Organization {
    id: ID!
    organisationName: String!
    abnDuns: Int
    organisationType: String!
    phoneNumber: Int
    organisationAddress: String
    organisationCountry: String!
    referenceId: String!
    adminFirstName: String!
    adminLastName: String!
    adminEmailAddress: String!
    adminMobileNumber: Int!
    adminPassword: String!
    billingContactName: String
    billingEmailAddress: String
    billingAddress: String
    billingPhoneNumber: String
  }

  input OrganizationInput {
    organisationName: String!
    abnDuns: Int
    organisationType: String!
    phoneNumber: Int
    organisationAddress: String
    organisationCountry: String!
    referenceId: String!
    adminFirstName: String!
    adminLastName: String!
    adminEmailAddress: String!
    adminMobileNumber: Int!
    adminPassword: String!
    billingContactName: String
    billingEmailAddress: String
    billingAddress: String
    billingPhoneNumber: String
  }

  type Query {
    organizations: [Organization]!
    organization(id: ID!): Organization
  }

  type Mutation {
    createOrganization(input: OrganizationInput!): Organization!
    updateOrganization(id: ID!, input: OrganizationInput!): Organization!
    deleteOrganization(id: ID!): Organization!
  }
`;



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


const server = new ApolloServer({
  typeDefs,
  resolvers
});
const app = express();

async function startApolloServer() {
  await server.start();

  server.applyMiddleware({ app });
  
  // your other middleware and routes here

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

startApolloServer();

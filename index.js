import express from "express";
import dotenv from "dotenv";
import { ApolloServer, gql } from 'apollo-server-express';
import http from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import mongoose from "mongoose";
import cors from 'cors'
import {loadFilesSync} from '@graphql-tools/load-files'
import path from 'path'
import { fileURLToPath } from 'url';
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
import url from 'url';
import {mergeTypeDefs, mergeResolvers} from '@graphql-tools/merge'
import { makeExecutableSchema }from '@graphql-tools/schema';

//resolvers to be refactor later

// import Advertisement from './controllers/v2/resolver/AdvertisementResolver.js'
import Organization from './controllers/v2/resolver/OrganizationResolver.js'
import Admin from './controllers/v2/resolver/AdminResolver.js'
dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolverArray = [Organization, Admin];

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, './TypeDefs/*.gql'))
);

const resolvers = mergeResolvers(resolverArray);

const mongo_url = process.env.MONGO_URL;
// const dbase = process.env.MONGODB_DB;
// const user_db = process.env.MONGODB_USER;
// const pass_db = process.env.MONGODB_PASS;

// const server = http.createServer(app);


const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginInlineTrace()],
  cache: {
    type: "bounded",
    maxSize: 100 * 1024 * 1024 // 100 MB
  }
});

  (async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  
  SubscriptionServer.create(
    {
      schema: schema,
      execute,
      subscribe,
      onConnect: (connectionParams, webSocket) => {
        console.log('Client connected to  WebSocket');
      },
      onDisconnect: (connectionParams, webSocket) => {
        console.log('Client disconnected to WebSocket');
      },
    },
    {
      server: server,
      path: apolloServer.graphqlPath,
    },
  );
   await mongoose.connect(`${mongo_url}`,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(mongoose.connection.readyState)
    console.log('Connected to MongoDB');


  server.listen({ port: process.env.PORT }, () =>
    console.log(`Server running on http://localhost:${process.env.PORT }${apolloServer.graphqlPath}`)
  );
})();


// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect("mongodb://28c09e55-0ee0-4-231-b9ee:CHctnR7jP0XGbjYJepAC0dB42HBtFOH59Du0kMJ4N2IECfX2McMrf7AtyfrMOFYt62URT4Xzp8h7ACDbJ1V1UA%3D%3D@28c09e55-0ee0-4-231-b9ee.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@28c09e55-0ee0-4-231-b9ee@", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB Connected'))
// .catch((err) => console.log(err));

// module.exports = mongoose;
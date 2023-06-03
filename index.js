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
import OAuth from 'oauth-1.0a';
import axios from 'axios';
import crypto from 'crypto';
import session from 'express-session';


//resolvers to be refactor later

// import Advertisement from './controllers/v2/resolver/AdvertisementResolver.js'
import Organization from './controllers/v2/resolver/OrganizationResolver.js'
import Admin from './controllers/v2/resolver/AdminResolver.js'
import HospitalAdmin from './controllers/v2/resolver/HospitalAdminResolver.js'
import SleepData from './controllers/v2/resolver/SleepDataResolver.js'

dotenv.config();

const app = express();

const port = process.env.PORT;
const consumerKey = process.env.GARMIN_CLIENT_ID;
const consumerSecret = process.env.GARMIN_CLIENT_SECRET;

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(session({
  secret: 'ai-carer-garmin',
  resave: false,
  saveUninitialized: true
}));

//garmin login authorization 
app.get('/login', async (req, res) => {
  // Step 1: Request temporary token
  const oauth = new OAuth({
    consumer: {
      key: consumerKey,
      secret: consumerSecret
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString, key) =>
      crypto.createHmac('sha1', key).update(baseString).digest('base64')
  });

  const requestData = {
    url: 'https://connectapi.garmin.com/oauth-service/oauth/request_token',
    method: 'POST'
  };

  const token = await axios.post(requestData.url, null, {
    headers: oauth.toHeader(oauth.authorize(requestData))
  });

  const temporaryToken = token.data.split('&')[0].split('=')[1];
  const temporaryTokenSecret = token.data.split('&')[1].split('=')[1];

  console.log(temporaryToken)
  console.log(temporaryTokenSecret)

  req.session.temporaryTokenSecret = temporaryTokenSecret;
  req.session.temporaryToken = temporaryToken;
  // Step 2: Authorize application
  const authorizeUrl = `https://connect.garmin.com/oauthConfirm?oauth_token=${temporaryToken}`;
  
  // Redirect user to the authorization URL
  res.redirect(authorizeUrl);
});

// end

const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolverArray = [Organization, Admin, HospitalAdmin, SleepData];

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

// Callback URL
app.get('/callback', async (req, res) => {
  const temporaryToken = req.session.temporaryToken;
  const temporaryTokenSecret = req.session.temporaryTokenSecret;
  const oauth = new OAuth({
    consumer: {
      key: consumerKey,
      secret: consumerSecret
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString, key) =>
      crypto.createHmac('sha1', key).update(baseString).digest('base64')
  });

  const oauthVerifier = req.query.oauth_verifier;

  const accessRequestData = {
    url: 'https://connectapi.garmin.com/oauth-service/oauth/access_token',
    method: 'POST',
    data: {
      oauth_verifier: oauthVerifier
    }
  };

  const whineToken = {
    key: temporaryToken,
    secret: temporaryTokenSecret
  };

  const headers = oauth.toHeader(oauth.authorize(accessRequestData, whineToken));

  try {
    const response = await axios.post(accessRequestData.url, null, { headers });

    const responseData = response.data;
    const accessToken = getValueFromResponse(responseData, 'oauth_token');
    const accessTokenSecret = getValueFromResponse(responseData, 'oauth_token_secret');

    if (accessToken && accessTokenSecret) {
      const result = {
        accessToken,
        accessTokenSecret
      };

      res.status(200).json({
        status: 200,
        body: result
      });
    } else {
      res.status(500).json({
        status: 500,
        message: 'Access token retrieval failed'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error'
    });
  }
});

// Helper function to extract value from response string
function getValueFromResponse(responseData, key) {
  const parts = responseData.split('&');
  for (const part of parts) {
    const [responseKey, value] = part.split('=');
    if (responseKey === key) {
      return value;
    }
  }
  return null;
}

  server.listen({ port: process.env.PORT }, () =>
    console.log(`Server running on http://localhost:${process.env.PORT }${apolloServer.graphqlPath}`)
  );
})();
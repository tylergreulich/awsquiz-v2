import 'reflect-metadata';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import * as session from 'express-session';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

export const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ res, req }: any) => ({ res, req })
  });

  await createConnection();

  const app = express();

  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false
    })
  );

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: 'http://localhost:4000'
    }
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

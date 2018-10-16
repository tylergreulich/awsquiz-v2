import * as passport from 'passport';
import * as express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';

import { GoogleStrategy } from './googleStrategy';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

export const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await createConnection();

  const app = express();

  passport.use(GoogleStrategy);

  app.use(passport.initialize());

  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req: express.Request, res: express.Response) => {
      console.log('Auth good');
      res.send('Auth was good');
    }
  );

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: 'http://localhost:3000'
    }
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

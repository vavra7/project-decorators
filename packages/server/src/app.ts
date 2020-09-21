import { buildRest } from '@project-decorators/express-decorators';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { gqlAuthChecker, restAuthChecker } from './auth';
import { baseUrl, port } from './config';
import { ListingController, UserController } from './controllers';
import { expressErrorsHandler } from './errors/expressErrorsHandler';
import { UserResolver } from './resolvers';

const app = express();

async function startServer(): Promise<void> {
  const gqlSchema = await buildSchema({
    resolvers: [UserResolver],
    authChecker: gqlAuthChecker
  });

  buildRest({
    app,
    controllers: [UserController, ListingController],
    authChecker: restAuthChecker
  });

  const apolloServer = new ApolloServer({
    schema: gqlSchema
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.use(expressErrorsHandler);

  return new Promise(resolve => {
    app.listen(port, resolve);
  });
}

startServer().then(() => console.log(`ready - started server on ${baseUrl}`));

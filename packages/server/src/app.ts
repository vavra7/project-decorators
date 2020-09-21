import { buildRest } from '@project-decorators/express-decorators';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { gqlAuthChecker } from './auth';
import { baseUrl, port } from './config';
import { ListingController, UserController } from './controllers';
import { UserResolver } from './resolvers';

const app = express();

async function startServer(): Promise<void> {
  const gqlSchema = await buildSchema({
    resolvers: [UserResolver],
    authChecker: gqlAuthChecker
  });

  buildRest({
    app,
    controllers: [UserController, ListingController]
  });

  const apolloServer = new ApolloServer({
    schema: gqlSchema
  });

  apolloServer.applyMiddleware({ app, cors: false });

  return new Promise(resolve => {
    app.listen(port, resolve);
  });
}

startServer().then(() => console.log(`ready - started server on ${baseUrl}`));

import { buildRest } from '@project-decorators/express-decorators';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { expressAuthChecker, gqlAuthChecker } from './auth';
import { baseUrl, port } from './config';
import { ListingController, UserController } from './controllers';
import { UserEntity } from './entities';
import { expressErrorsHandler } from './errors/expressErrorsHandler';
import { UserResolver } from './resolvers';

const app = express();

async function startServer(): Promise<void> {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'project-decorators',
    username: 'user',
    password: 'pass',
    dropSchema: false,
    synchronize: true,
    logging: false,
    entities: [UserEntity]
  }).catch(err => {
    console.error(err);
  });
  const gqlSchema = await buildSchema({
    resolvers: [UserResolver],
    authChecker: gqlAuthChecker
  });
  buildRest({
    app,
    controllers: [UserController, ListingController],
    authChecker: expressAuthChecker
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

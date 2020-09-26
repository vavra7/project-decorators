import { buildRoutes } from '@project-decorators/type-express';
import { ApolloServer } from 'apollo-server-express';
import express, { Application, Router } from 'express';
import { GraphQLSchema } from 'graphql';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Connection, createConnection } from 'typeorm';
import { gqlAuthChecker } from './auth';
import { baseUrl, port } from './config';
import { ListingController, UserController } from './controllers';
import { UserEntity } from './entities';
import { expressErrorsHandler } from './errors/expressErrorsHandler';
import { UserResolver } from './resolvers';

// const app = express();

// async function startServer(): Promise<void> {
// await createConnection({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   database: 'project-decorators',
//   username: 'user',
//   password: 'pass',
//   dropSchema: false,
//   synchronize: true,
//   logging: false,
//   entities: [UserEntity]
// }).catch(err => {
//   console.error(err);
// });
// const gqlSchema = await buildSchema({
//   resolvers: [UserResolver],
//   authChecker: gqlAuthChecker
// });
// buildRest({
//   app,
//   controllers: [UserController],
//   authChecker: expressAuthChecker
// });
// const apolloServer = new ApolloServer({
//   schema: gqlSchema
// });
// apolloServer.applyMiddleware({ app, cors: false });
// app.use(expressErrorsHandler);
// return new Promise(resolve => {
//   app.listen(port, resolve);
// });
// }

class App {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public async start(): Promise<void> {
    // this.createDbConnection();
    const [schema, routes] = await Promise.all([this.buildGqlSchema(), this.buildRestRoutes()]);
    const apolloServer = new ApolloServer({
      schema
    });
    apolloServer.applyMiddleware({ app: this.app, cors: false });
    this.app.use(routes);
    this.afterRoutesInit();
    this.app.listen(port, () => console.log(`ready - started server on ${baseUrl}`));
  }

  private afterRoutesInit(): void {
    this.app.use(expressErrorsHandler);
  }

  private createDbConnection(): Promise<void | Connection> {
    return createConnection({
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
  }

  private buildGqlSchema(): Promise<GraphQLSchema> {
    return buildSchema({
      resolvers: [UserResolver],
      authChecker: gqlAuthChecker
    });
  }

  private buildRestRoutes(): Promise<Router> {
    return buildRoutes({
      controllers: [ListingController, UserController],
      router: express.Router()
    });
  }
}

new App().start();

// console.log((globalThis as any).typeExpressMetadataStorage);
// console.log((globalThis as any).TypeGraphQLMetadataStorage);

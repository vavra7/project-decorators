import { buildRoutes } from '@project-decorators/type-express';
import { ApolloServer } from 'apollo-server-express';
import express, { Application, Router } from 'express';
import { GraphQLSchema } from 'graphql';
import 'reflect-metadata';
import { buildSchema } from '@project-decorators/type-graphql';
import { Connection, createConnection } from 'typeorm';
import { gqlAuthChecker } from './auth';
import { baseUrl, port } from './config';
import { ListingController, UserController } from './controllers';
import { User } from './entities';
import { expressErrorsHandler } from './errors/expressErrorsHandler';
import { UserResolver } from './resolvers';
import { bodyJson } from './middlewares/expressMiddlewares';
import Container from 'typedi';

class App {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public async start(): Promise<void> {
    this.createDbConnection();
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
      dropSchema: true,
      synchronize: true,
      logging: false,
      entities: [User]
    }).catch(err => {
      console.error(err);
    });
  }

  private buildGqlSchema(): Promise<GraphQLSchema> {
    return buildSchema({
      resolvers: [UserResolver],
      authChecker: gqlAuthChecker,
      container: Container
    });
  }

  private buildRestRoutes(): Promise<Router> {
    return buildRoutes({
      controllers: [ListingController, UserController],
      router: express.Router(),
      bodyParser: bodyJson,
      container: Container
    });
  }
}

new App().start();

import { buildRoutes } from '@project-decorators/type-express';
import { ApolloServer } from 'apollo-server-express';
import { useContainer as classValidatorUseContainer } from 'class-validator';
import express, { Application, Router } from 'express';
import { GraphQLSchema } from 'graphql';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { Connection, createConnection, useContainer as typeormUseContainer } from 'typeorm';
import { baseUrl, port } from './config';
import { ListingController, UserController } from './controllers';
import { User } from './entities';
import {
  apolloAuthChecker,
  bodyJsonParser,
  cookieParser,
  cors,
  createReqContext,
  expressAuthChecker
} from './middlewares';
import { AuthResolver, UserResolver } from './resolvers';
import { apolloErrorHandler, expressErrorHandler } from './utils';

class App {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public async start(): Promise<void> {
    classValidatorUseContainer(Container);
    await this.createDbConnection();
    this.beforeRoutesInit();
    const [schema, routes] = await Promise.all([this.buildGqlSchema(), this.buildRestRoutes()]);
    const apolloServer = new ApolloServer({
      schema,
      formatError: apolloErrorHandler,
      context: expressContext => expressContext
    });
    this.app.use(routes);
    apolloServer.applyMiddleware({ app: this.app, cors: false });
    this.afterRoutesInit();
    this.app.listen(port, () => console.log(`ready - started api server on ${baseUrl}`));
  }

  private beforeRoutesInit(): void {
    this.app.use(cors);
    this.app.use(cookieParser);
    this.app.use(createReqContext);
  }

  private afterRoutesInit(): void {
    this.app.use(expressErrorHandler);
  }

  private createDbConnection(): Promise<void | Connection> {
    typeormUseContainer(Container);
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
      entities: [User]
    }).catch(err => {
      console.error(err);
    });
  }

  private buildGqlSchema(): Promise<GraphQLSchema> {
    return buildSchema({
      resolvers: [AuthResolver, UserResolver],
      authChecker: apolloAuthChecker,
      container: Container
    });
  }

  private buildRestRoutes(): Promise<Router> {
    return buildRoutes({
      controllers: [ListingController, UserController],
      router: express.Router(),
      bodyParser: bodyJsonParser,
      container: Container,
      authChecker: expressAuthChecker
    });
  }
}

new App().start();

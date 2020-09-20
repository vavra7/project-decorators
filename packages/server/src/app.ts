import { ApolloServer } from 'apollo-server-express';
import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { baseUrl, port } from './config';
import { UserController } from './controllers';
import { MetadataKey, RouteDefinition } from './decorators/types';
import { UserResolver } from './resolvers';

const app = express();

[UserController].forEach(Controller => {
  const instance = new Controller();
  const routerPath = Reflect.getMetadata(MetadataKey.RoutePath, Controller);
  const routes: RouteDefinition[] = Reflect.getMetadata(MetadataKey.Routes, Controller);

  routes.forEach(route => {
    const { httpMethod, routePath, controllerMethodName } = route;

    app[httpMethod](
      routerPath + routePath,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await (instance as any)[controllerMethodName](req, res);

          res.json(result);
        } catch (err) {
          next(err);
        }
      }
    );
  });
});

async function startServer(): Promise<void> {
  const gqlSchema = await buildSchema({
    resolvers: [UserResolver]
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

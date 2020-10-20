/* eslint-disable @typescript-eslint/no-var-requires */
const next = require('next');
const express = require('express');
const { generateRoutes } = require('@project-decorators/router-next-express');
const { routesDefinition } = require('@project-decorators/shared');

const port = 3000;
const baseUrl = `http://localhost:${port}`;
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });

nextApp.prepare().then(() => {
  const expressApp = express();
  generateRoutes({
    nextApp,
    expressApp,
    routesDefinition
  });
  expressApp.listen(3000, () => console.log(`ready - started client server on ${baseUrl}`));
});

/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const next = require('next');

const port = 3000;
const baseUrl = `http://localhost:${port}`;
const dev = process.env.NODE_ENV !== 'production';
const server = next({ dev });

server.prepare().then(() => {
  const expressApp = express();

  expressApp.listen(port, () => console.log(`ready - started client server on ${baseUrl}`));
});

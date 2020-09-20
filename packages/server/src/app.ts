import express from 'express';
import './controllers';
import { router } from './decorators/routes.decorator';

const app = express();

app.get('/', (req, res) => {
  res.send('HI!');
});
app.use(router);

app.listen(4000, () => console.log('ready - started server on http://localhost:4000'));

import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('HI!');
});

app.listen(4000, () => console.log('ready - started server on http://localhost:4000'));

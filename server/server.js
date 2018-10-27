require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const router = require('./routes/routes');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
}

module.exports = { app };

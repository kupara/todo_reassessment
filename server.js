const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./server/config/config');
const routes = require('./server/routes/')

const app = express();

const publicPath = path.resolve(__dirname, 'dist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(publicPath));

//connect db
mongoose.connect(config.db_url, (err) => {
  if (err) console.error(err);
  else {
    console.log('Connected to the db');
  }
});

routes(app);

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening on port: ', config.port);
  }
})
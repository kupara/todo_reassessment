const bodyParser = require('body-parser');
const config = require('./server/config/config');
const express = require('express');
const fs = require('fs');
const https = require('https');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./server/routes/')

const app = express();

const sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'todo'
};

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

https.createServer(sslOptions, app).listen(3001)

// app.listen(config.port, (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Listening on port: ', config.port);
//   }
// })

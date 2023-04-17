const express = require('express');
const app = express();
const config = require('./config/config');
const port = config.host.port;

const routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connectToDatabase = require('./config/dbConfig');
connectToDatabase();

app.use('/', routes);

console.log(process.env.NODE_ENV, port);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
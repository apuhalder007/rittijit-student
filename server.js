const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config/config');
const port = config.host.port;

const routes = require('./routes/index');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const connectToDatabase = require('./config/dbConfig');
connectToDatabase();

app.use('/', routes);

console.log(process.env.NODE_ENV, port);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
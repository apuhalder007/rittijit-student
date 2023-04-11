const express = require('express');
const app = express();
const port = 3000;

const routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connectToDatabase = require('./config/dbConfig');
connectToDatabase();

app.use('/', routes);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
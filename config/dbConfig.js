const mongoose = require('mongoose');
const config = require('./config');
const connectToDatabase = () => {
  const url = config.db.url;
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(error => console.error('Could not connect to MongoDB:', error));
};

module.exports = connectToDatabase;
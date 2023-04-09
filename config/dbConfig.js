const mongoose = require('mongoose');

const connectToDatabase = () => {
  const url = 'mongodb://localhost:27017/IPL';
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(error => console.error('Could not connect to MongoDB:', error));
};

module.exports = connectToDatabase;
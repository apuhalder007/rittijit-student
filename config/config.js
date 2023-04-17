const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: './environments/.env.development' });
} else if (process.env.NODE_ENV === 'staging') {
dotenv.config({ path: './environments/.env.staging' });
} else if (process.env.NODE_ENV === 'production') {
dotenv.config({ path: './environments/.env.production' });
}

const config = {
  db: {
    //host: process.env.DB_HOST,
    //port: process.env.DB_PORT,
    //name: process.env.DB_NAME,
    url: process.env.DB_URL
  },
  host:{
    port: process.env.PORT,
    name: process.env.HOST_NAME
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN
  },
};

module.exports = config;
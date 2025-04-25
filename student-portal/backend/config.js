
require('dotenv').config(); 

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,  // Load from .env
  MONGO_URI: process.env.MONGO_URI,    // Load from .env
};

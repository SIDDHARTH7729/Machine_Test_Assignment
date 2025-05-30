// This file defines the configurations for the server, such as the port number, and loads variables from .env file
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;

module.exports = {
    PORT,
}
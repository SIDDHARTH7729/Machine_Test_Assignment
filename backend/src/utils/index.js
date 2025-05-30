// This acts as an index file for exporting all utility functions
const encryptPassword = require('./encryptPassword');
const checkPassword = require('./checkPassword');
const generateToken = require('./jwtToken');

// exporting the utility functions
module.exports = {
    hashPassword:encryptPassword,
    checkPassword,
    generateToken
}
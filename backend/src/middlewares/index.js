// This file acts as a central index file for exporting all middlewares used in the application.

const verifyToken = require('./authMiddleware');
const upload = require('./uploadFile');
// exporting the verifyToken middleware
module.exports = {
    verifyToken,
    upload
}
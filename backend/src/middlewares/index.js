const verifyToken = require('./authMiddleware');
const upload = require('./uploadFile');
// exporting the verifyToken middleware
module.exports = {
    verifyToken,
    upload
}
const adminController = require('./adminControllers')
const agentController = require('./agentControllers')
const fileController = require('./fileControllers')

// exporting all controllers
module.exports = {
    adminController,
    agentController,
    fileController,
}
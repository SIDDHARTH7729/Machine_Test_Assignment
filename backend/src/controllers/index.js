// This file acts as a central index file for exporting all controllers used in the application.
const adminController = require('./adminControllers')
const agentController = require('./agentControllers')
const fileController = require('./fileControllers')

// exporting all controllers
module.exports = {
    adminController,
    agentController,
    fileController,
}
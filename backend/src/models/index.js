// This file acts as a central index file for exporting all the models used in the application.
const adminModel = require('./userModels')
const agentModel = require('./agentModels')
const fileModel = require('./fileDataModels')

// exporting the models
module.exports = {
    User: adminModel,
    Agent: agentModel,
    File: fileModel,
}


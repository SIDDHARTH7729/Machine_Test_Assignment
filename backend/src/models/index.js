const adminModel = require('./userModels')
const agentModel = require('./agentModels')
const fileModel = require('./fileDataModels')

// exporting the models
module.exports = {
    User: adminModel,
    Agent: agentModel,
    File: fileModel,
}


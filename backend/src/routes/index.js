// This index files serves as a central point to export all the route modules for the application.

// importing the necessary route modules
const authRoutes = require('./authRoutes')
const agentRoutes = require('./agentRoutes')
const fileRoutes = require('./fileRoutes')

// exporting the routes
module.exports = {
    authRoutes,
    agentRoutes,
    fileRoutes
}
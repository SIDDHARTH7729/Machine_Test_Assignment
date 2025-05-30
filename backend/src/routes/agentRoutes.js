// This route handles agent-related operations such as
//  creating agents, fetching all agents, and getting works assigned to a specific agent.

const express = require('express');
const router = express.Router();
// Importing the agent controller which contains the logic for handling agent operations
const {agentController} = require('../controllers');
// Importing the middleware for token verification
const { verifyToken } = require('../middlewares');

// Route to create a new agent
router.post('/create',verifyToken,agentController.createAgent);


// Route to get all agents
router.get('/all',verifyToken,agentController.getAllAgents);


// Route to get works assigned to a specific agent
router.post('/:agentId/works', verifyToken, agentController.getAgentWorks);

module.exports = router;
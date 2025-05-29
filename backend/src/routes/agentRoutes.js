const express = require('express');
const router = express.Router();
const {agentController} = require('../controllers');
const { verifyToken } = require('../middlewares');

// Route to create a new agent
router.post('/create',verifyToken,agentController.createAgent);


// Route to get all agents
router.get('/all',verifyToken,agentController.getAllAgents);


// Route to get works assigned to a specific agent
router.post('/:agentId/works', verifyToken, agentController.getAgentWorks);

module.exports = router;
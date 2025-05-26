const mongoose = require("mongoose");
const { Agent,File } = require("../models");
const { hashPassword } = require("../utils");

// This controller handles the agent creation and fetching all agents
const createAgent = async (req, res) => {
    try {
        // get all credentials from the frontend
        const { name, email, password, phoneNumber } = req.body

        // checks if all the fields are filled or not
        if (!name || !email || !password || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // encerypt the password
        const hashedPassword = hashPassword(password);

        // create a new agent
        const newAgent = await Agent.create({
            name,
            email,
            password: hashedPassword,
            mobile: phoneNumber
        });

        // check if the agent is created or not
        if (!newAgent) {
            return res.status(500).json({ message: "Agent registration failed" });
        }

        // return the response that  new agent has been saved 
        return res.status(201).json({ message: "Agent registered successfully", agent: newAgent });
    } catch (error) {
        console.log("Some error occurred while registering agent: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const getAllAgents = async (req, res) => {
    try {
        // here we have to fetch all the agents from the database
        const agents = await Agent.find({}).select("-password"); 

        // check if agents are found or not
        if (!agents || agents.length === 0) {
            return res.status(404).json({ message: "No agents found" });
        }
        
        // return the agents
        return res.status(200).json({ message: "Agents fetched successfully", agents });
    } catch (error) {
        console.log("Error while getting all agents: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// func to fetch all the deetails and the work given to the specific agent with parameter
const getAgentWorks = async (req, res) => {
    try {
        const agentObjectId = new mongoose.Types.ObjectId(req.params.agentId);

        const agentWorks = await File.find({ agentId: agentObjectId });

        if (!agentWorks || agentWorks.length === 0) {
            return res.status(404).json({ message: "No work found for this agent" });
        }

        return res.status(200).json({ message: "Agent works fetched successfully", agentWorks });
    } catch (error) {
        console.error("Error while getting agent details:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
    createAgent,
    getAllAgents,
    getAgentWorks
}
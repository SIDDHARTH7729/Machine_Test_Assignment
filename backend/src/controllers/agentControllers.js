// This controller file handles the agent related operations such as
// creating an agent, fetching all agents, and fetching works assigned to a specific agent.


const mongoose = require("mongoose");
const { Agent,File } = require("../models");
const { hashPassword } = require("../utils");

// This controller func handles the agent creation and returns response of the creation of a new agent
const createAgent = async (req, res) => {
    try {
        // get all credentials from the frontend
        const { name, email, password, phoneNumber } = req.body

        // checks if all the fields are filled or not
        if (!name || !email || !password || !phoneNumber) {
            return res.status(400).json({ success:false,message: "All fields are required" });
        }

        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) {
            return res.status(409).json({ success: false, message: "An agent with this email already exists" });
        }

        // Optionally also check for name uniqueness
        const existingName = await Agent.findOne({ name });
        if (existingName) {
            return res.status(409).json({ success: false, message: "An agent with this name already exists" });
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
            return res.status(500).json({ success:false,message: "An Agent with this email already exists" });
        }

        // return the response that  new agent has been saved 
        return res.status(201).json({ success:true,message: "Agent registered successfully", agent: newAgent });
    } catch (error) {
        console.log("Some error occurred while registering agent: ", error);
        return res.status(500).json({ success:false,message: "Internal server error" });
    }

}

// This controller func fetches all the agents from the database
const getAllAgents = async (req, res) => {
    try {

        console.log("Fetching all agents...");

        // here we have to fetch all the agents from the database
        const agents = await Agent.find({}).select("-password"); 

        if(agents.length === 0) {
            console.log("No agents found");
            return res.status(201).json({ success:true,message: "No agents found, Please add some agents" });
        }

        // check if agents are found or not
        if (!agents) {
            return res.status(404).json({success: false, message: "No agents found" });
        }
        
        console.log("Agents fetched successfully and sending back with length :", agents.length);
        // return the agents
        return res.status(200).json({ success:true ,message: "Agents fetched successfully", agents });
    } catch (error) {
        console.log("Error while getting all agents: ", error);
        return res.status(500).json({ success:false,message: "Internal server error" });
    }
}

// func to fetch all the deetails and the work given to the specific agent with parameter
const getAgentWorks = async (req, res) => {
    try {
        console.log("Fetching agent works...");
        const agentObjectId = new mongoose.Types.ObjectId(req.params.agentId);
        //sending agent details and their work
        const agent = await Agent.findById(agentObjectId).select("-password");
        const agentWorks = await File.find({ agentId: agentObjectId });

        if (!agentWorks) {
            return res.status(404).json({ success:false,message: "No work found for this agent" });
        }

        console.log("Agent works fetched successfully with length:", agentWorks.length, " and sending back...");
        return res.status(200).json({ success:true,message: "Agent works fetched successfully", agentWorks, agent });
    } catch (error) {
        console.error("Error while getting agent details:", error.message);
        return res.status(500).json({ success:false,message: "Internal server error" });
    }
};



module.exports = {
    createAgent,
    getAllAgents,
    getAgentWorks
}
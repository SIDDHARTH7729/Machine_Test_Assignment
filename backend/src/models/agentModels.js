// This file defines the agent model for the Agent model using Mongoose. 
// Data Modelling is done here to define the structure of the agent data in the MongoDB database. 
// It includes fields for name, email, mobile, and password, along with validation rules and timestamps for creation and updates.
const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    match: /^\+[1-9]\d{1,14}$/ 
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
}, {
  timestamps: true 
});

module.exports = mongoose.model('Agent', AgentSchema);

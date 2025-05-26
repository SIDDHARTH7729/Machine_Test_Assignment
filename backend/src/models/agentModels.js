const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
  name: {
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
    select:false, // we dont sent the password back in response
  },
}, {
  timestamps: true 
});

module.exports = mongoose.model('Agent', AgentSchema);

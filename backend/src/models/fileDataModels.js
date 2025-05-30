// This file defines the data model for file data in the application.
// It uses Mongoose to define the schema for the file data, including fields for first name, phone number, notes, agent ID, and a unique identifier for the same ID.
// This schema is used to structure the data stored in the MongoDB database for file-related operations.
const mongoose = require('mongoose');

const fileDataSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        trim: true
    },
    Phone: {
        type: String,
        required: true,
        min: 7,
        match: /^\+[1-9]\d{1,14}$/,
    },
    Notes: {
        type: String,
        required: true,
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    sameId: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('FileData', fileDataSchema);

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

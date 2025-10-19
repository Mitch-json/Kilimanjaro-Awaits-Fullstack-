const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Crew', crewSchema);
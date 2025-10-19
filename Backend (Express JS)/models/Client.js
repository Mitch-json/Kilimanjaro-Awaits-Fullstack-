const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    route: {
        type: String,
        trim: true,
        required: true
    },
    tripDate: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Client', clientSchema);
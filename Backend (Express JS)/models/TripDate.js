const mongoose = require('mongoose');

const tripDateSchema = new mongoose.Schema({
    date:{
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    route: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }
},{timestamps: true});

module.exports = mongoose.model('TripDate', tripDateSchema);
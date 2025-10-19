const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);
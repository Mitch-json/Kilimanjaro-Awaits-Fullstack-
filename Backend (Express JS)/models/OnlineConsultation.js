const mongoose = require('mongoose');

const onlineConsultationSchema = new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    whatsApp: {
        type: String,
        trim: true,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('OnlineConsultation', onlineConsultationSchema);
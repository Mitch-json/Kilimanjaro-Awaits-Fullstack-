const mongoose = require('mongoose');

const mpesaPaymentSchema = new mongoose.Schema({
    TransID:{
        type: String,
        trim: true,
        required: true
    },
    TransTime: {
        type: String,
        required: true,
        trim: true
    },
    TransAmount: {
        type: String,
        trim: true,
        required: true
    },
    MSISDN: {
        type: String,
        trim: true,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('MpesaPayment', mpesaPaymentSchema);
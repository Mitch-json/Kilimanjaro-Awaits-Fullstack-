const mongoose = require('mongoose');

const cardPaymentSchema = new mongoose.Schema({
    paymentID:{
        type: String,
        trim: true,
        required: true
    },
    receiptURL: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    customerID: {
        type: String,
        trim: true,
        required: true
    },
},{timestamps: true});

module.exports = mongoose.model('CardPayment', cardPaymentSchema);
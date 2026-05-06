// models/Checkout.js
const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    fullName:
    {
        type: String,
        required: true
    },
    businessName:
    {
        type: String
    },
    email:
    {
        type: String,
        required: true
    },
    phone:
    {
        type: String,
        required: true
    },
    zip:
    {
        type: String,
        required: true
    },
    country:
    {
        type: String,
        required: true
    },
    city:
    {
        type: String,
        required: true
    },
    state:
    {
        type: String,
        required: true
    },
    message:
    {
        type: String,
        required: true
    },
    submissionDate:
    {
        type: Date,
        default: Date.now
    }
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
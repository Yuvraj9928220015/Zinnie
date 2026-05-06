// No changes needed, provided for completeness.
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String }
});

const orderSchema = new mongoose.Schema({
    razorpay_order_id: { type: String, required: true, unique: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },

    status: {
        type: String,
        enum: ['created', 'paid', 'failed'],
        default: 'created'
    },

    amount: { type: Number, required: true },
    currency: { type: String, required: true },

    customerInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: {
            line1: String,
            city: String,
            state: String,
            postal_code: String,
            country: String,
        }
    },

    items: [orderItemSchema],
    orderNotes: { type: String, default: '' },

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
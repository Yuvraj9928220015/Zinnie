const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const shortid = require('shortid');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Order = require('../models/Order');

const router = express.Router();

console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
    key_id: 'rzp_test_your_actual_key_id',
    key_secret: 'your_actual_key_secret',
});

router.post('/create-order', async (req, res) => {
    const { amount, currency, customer_info } = req.body;

    const options = {
        amount,
        currency,
        receipt: shortid.generate(),
        notes: {
            customer_name: customer_info.name,
            customer_email: customer_info.email
        }
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("❌ Razorpay Order Creation Error:", error);
        res.status(500).send("Something went wrong with payment gateway.");
    }
});

router.post('/verify-payment', async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        order_details
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        try {
            const newOrder = new Order({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                amount: order_details.amount,
                currency: order_details.currency,
                customerInfo: order_details.customer_info,
                items: order_details.items,
                orderNotes: order_details.order_notes,
                status: 'paid'
            });

            await newOrder.save();

            res.json({
                status: 'success',
                message: 'Payment verified and order saved.',
                orderId: newOrder._id
            });

        } catch (dbError) {
            console.error("❌ Database Order Save Error:", dbError);
            res.status(500).json({ status: 'error', message: 'Failed to save order.' });
        }
    } else {
        res.status(400).json({
            status: 'error',
            message: 'Payment verification failed. Signature mismatch.'
        });
    }
});

module.exports = router;
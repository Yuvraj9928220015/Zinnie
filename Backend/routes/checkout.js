// routes/checkout.js
const express = require('express');
const router = express.Router();
const Checkout = require('../models/Checkout');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

router.post('/', async (req, res) => {
    try {
        const newCheckout = new Checkout(req.body);
        const savedCheckout = await newCheckout.save();
        console.log('Data saved to MongoDB:', savedCheckout);

        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: `New Order Submission from ${savedCheckout.fullName}`,
            html: `
                <h1>New Order Submission Received</h1>
                <p>You have received a new order submission with the following details:</p>
                <hr>
                <p><strong>Full Name:</strong> ${savedCheckout.fullName}</p>
                <p><strong>Business Name:</strong> ${savedCheckout.businessName || 'N/A'}</p>
                <p><strong>Email:</strong> ${savedCheckout.email}</p>
                <p><strong>Phone:</strong> ${savedCheckout.phone}</p>
                <p><strong>Address:</strong> ${savedCheckout.city}, ${savedCheckout.state}, ${savedCheckout.country} - ${savedCheckout.zip}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${savedCheckout.message || 'No message provided.'}</p>
            `,
        };

        const customerMailOptions = {
            from: process.env.EMAIL_USER,
            to: savedCheckout.email,
            subject: `Your Order Confirmation`,
            html: `
                <h1>Thank You for Your Order, ${savedCheckout.fullName}!</h1>
                <p>We have successfully received your information and will process your order shortly.</p>
                <p>Here is a summary of the details you provided:</p>
                <hr>
                <p><strong>Full Name:</strong> ${savedCheckout.fullName}</p>
                <p><strong>Business Name:</strong> ${savedCheckout.businessName || 'N/A'}</p>
                <p><strong>Email:</strong> ${savedCheckout.email}</p>
                <p><strong>Phone:</strong> ${savedCheckout.phone}</p>
                <p><strong>Address:</strong> ${savedCheckout.city}, ${savedCheckout.state}, ${savedCheckout.country} - ${savedCheckout.zip}</p>
                <hr>
                <p>If you have any questions, please contact us by replying to this email.</p>
                <p>Best regards,<br>Your Company Name</p>
            `,
        };

        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(customerMailOptions)
        ]);

        console.log('Admin and customer emails sent successfully.');

        res.status(201).json({ message: 'Form submitted successfully!', data: savedCheckout });

    } catch (error) {
        console.error('Error processing checkout:', error);
        if (error.code === 'EENVELOPE') {
            return res.status(400).json({ message: 'Invalid email address provided. Please check and try again.' });
        }
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
// server.js - Updated with Auth Route
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

app.use(cors({
    origin: function (origin, callback) {
        // ✅ Sabhi localhost ports allow karo
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:3000',
            'http://localhost:3001', 
            'http://localhost:8080',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:5000',
            'https://jcdrink.com',
            'https://www.jcdrink.com',
            'https://zinniezeera.com',
            'https://www.zinniezeera.com'
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log("CORS blocked origin:", origin);
            callback(null, true);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/zinniezeera";

console.log("Email User from .env:", process.env.EMAIL_USER);
console.log("Email Pass from .env exists:", !!process.env.EMAIL_PASS);
// 

mongoose.connect(MONGO_URL)
    .then(() => console.log(" Mongoose Connected to MongoDB"))
    .catch(error => console.error("❌ Database Connection Error:", error));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        Receiver: process.env.EMAIL_RECEIVER
    },
});

app.get('/', (req, res) => res.send('API is running...'));

// Add auth routes
app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);

app.use('/api/payment', paymentRoutes);

const checkoutRoutes = require('./routes/checkout');
app.use('/api/checkout', checkoutRoutes);

app.post('/api/checkout', async (req, res) => {
    try {
        const newCheckout = new Checkout(req.body);
        const savedCheckout = await newCheckout.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: `New Checkout Form Submission from ${savedCheckout.fullName}`,
            html: `<h1>New Submission</h1><p>...</p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Form submitted successfully!', data: savedCheckout });
    } catch (error) {
        console.error('Error processing checkout:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
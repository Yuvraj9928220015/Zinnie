// ✅ STEP 1: dotenv SABSE PEHLE — koi bhi require se pehle
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// uploads folder auto-create
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');
const checkoutRoutes = require('./routes/checkout');
const translateRoutes = require("./routes/translateRoutes");

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
            'http://localhost:8080',
            'http://127.0.0.1:3000',
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

// ✅ STEP 2: MONGO_URI sahi se use karo (MONGO_URL wala hataya)
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/zinniezeera")
    .then(() => console.log("✅ Mongoose Connected to MongoDB"))
    .catch(error => console.error("❌ Database Connection Error:", error));

app.get('/', (req, res) => res.send('API is running...'));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use("/api/translate", translateRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error("❌ SERVER ERROR:", err);
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
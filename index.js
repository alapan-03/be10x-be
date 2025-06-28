// T0W8ttKwZMe9QcQ1

const express = require('express');
const connectDB = require('./jwt-auth/config/db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/auth', require('./jwt-auth/routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

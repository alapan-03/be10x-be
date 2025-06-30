
const express = require('express');
const connectDB = require('./backend/config/db');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(cors({
  origin: '*', // Allow all origins, adjust as needed for security  
}));


// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/mutualfunds', require('./backend/routes/mutualfund'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

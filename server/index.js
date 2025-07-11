const express = require('express');
const db = require('./db/config'); // MongoDB connection function
const route = require('./controllers/route');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load env variables

const fs = require('fs');
const path = require('path');

const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API Routes
app.use('/api', route);

// Default route
app.get('/', async (req, res) => {
    res.send('Welcome to my world...');
});

// Start Express server
const server = app.listen(port, () => {
    const protocol = (process.env.HTTPS === 'true' || process.env.NODE_ENV === 'production') ? 'https' : 'http';
    const { address, port } = server.address();
    const host = address === '::' ? '127.0.0.1' : address;
    console.log(`Server listening at ${protocol}://${host}:${port}/`);
});

// Connect to MongoDB
const DATABASE_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017';
const DATABASE = process.env.DB || 'Prolink';
db(DATABASE_URL, DATABASE);

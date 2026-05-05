require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const itineraryRoutes = require('./routes/itineraryRoutes');
const tripRoutes = require('./routes/tripRoutes');
const { initDatabases } = require('./services/cloudantService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // max 100 requests per 15 mins
  message: {
    error: 'Too many requests, please try again after 15 minutes'
  }
});

app.use(limiter);

// Initialize Cloudant databases on startup
initDatabases();

// Test route
app.get('/', (req, res) => {
  res.send('Travel AI Backend Running 🚀');
});

// Routes
app.use('/itinerary', itineraryRoutes);
app.use('/trip', tripRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Chat route
const chatRoutes = require('./routes/chatRoutes');
app.use('/chat', chatRoutes);
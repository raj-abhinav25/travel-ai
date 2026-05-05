require('dotenv').config();
const express = require('express');
const cors = require('cors');

const itineraryRoutes = require('./routes/itineraryRoutes');
const tripRoutes = require('./routes/tripRoutes');
const { initDatabases } = require('./services/cloudantService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
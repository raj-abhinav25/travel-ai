const { saveTrip, getTripsByUser, getTripById, deleteTrip } = require('../services/tripService');

// Save trip
async function save(req, res) {
  try {
    const { userId, tripData } = req.body;

    if (!userId || !tripData) {
      return res.status(400).json({ error: 'userId and tripData are required' });
    }

    const result = await saveTrip(userId, tripData);
    res.json({ message: 'Trip saved successfully', result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save trip' });
  }
}

// Get all trips for a user
async function getUserTrips(req, res) {
  try {
    const { userId } = req.params;
    const trips = await getTripsByUser(userId);
    res.json({ trips });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
}

// Get single trip
async function getTrip(req, res) {
  try {
    const { tripId } = req.params;
    const trip = await getTripById(tripId);
    res.json({ trip });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
}

// Delete trip
async function removeTri(req, res) {
  try {
    const { tripId, rev } = req.body;
    const result = await deleteTrip(tripId, rev);
    res.json({ message: 'Trip deleted', result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete trip' });
  }
}

module.exports = { save, getUserTrips, getTrip, removeTri };
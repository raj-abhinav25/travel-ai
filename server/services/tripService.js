const { client, TRIPS_DB } = require('./cloudantService');

// Save a trip
async function saveTrip(userId, tripData) {
  const doc = {
    userId,
    destination: tripData.destination,
    days: tripData.days,
    budget: tripData.budget,
    travelStyle: tripData.travelStyle,
    itinerary: tripData.itinerary,
    budgetBreakdown: tripData.budgetBreakdown,
    createdAt: new Date().toISOString()
  };

  const response = await client.postDocument({
    db: TRIPS_DB,
    document: doc
  });

  return response.result;
}

// Get all trips for a user
async function getTripsByUser(userId) {
  try {
    const response = await client.postFind({
      db: TRIPS_DB,
      selector: { userId: userId },
      sort: [{ createdAt: 'desc' }],
      useIndex: 'userId-createdAt-index' // ✅ updated index name
    });
    return response.result.docs;
  } catch (err) {
    console.error('GET TRIPS ERROR:', JSON.stringify(err, null, 2));
    throw err;
  }
}

// Get single trip by ID
async function getTripById(tripId) {
  const response = await client.getDocument({
    db: TRIPS_DB,
    docId: tripId
  });

  return response.result;
}

// Delete a trip
async function deleteTrip(tripId, rev) {
  const response = await client.deleteDocument({
    db: TRIPS_DB,
    docId: tripId,
    rev: rev
  });

  return response.result;
}

module.exports = { saveTrip, getTripsByUser, getTripById, deleteTrip };
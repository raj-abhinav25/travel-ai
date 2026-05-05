const { extractFromMessage } = require('../services/chatService');
const { generateItinerary } = require('../services/itineraryService');
const { saveTrip } = require('../services/tripService');

async function chat(req, res) {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Step 1: Extract info from message
    const { destination, days, budget, travelStyle } = extractFromMessage(message);

    // Step 2: Validate extraction
    if (!destination) {
      return res.status(400).json({
        error: 'Could not detect a destination. Try saying "plan a 3 day trip to Goa under 9000"'
      });
    }

    // Step 3: Generate itinerary
    const tripData = generateItinerary(destination, days, budget, travelStyle);

    if (tripData.error) {
      return res.status(404).json({ error: tripData.error });
    }

    // Step 4: Save to Cloudant if userId provided
    let savedTrip = null;
    if (userId) {
      savedTrip = await saveTrip(userId, tripData);
    }

    // Step 5: Return response
    res.json({
      message: `Here is your ${days} day ${travelStyle} trip to ${destination}!`,
      tripData,
      saved: savedTrip ? true : false
    });

  } catch (err) {
    console.error('CHAT ERROR:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

module.exports = { chat };
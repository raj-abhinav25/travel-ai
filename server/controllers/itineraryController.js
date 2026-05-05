const { generateItinerary } = require('../services/itineraryService');

async function createItinerary(req, res) {
  const { destination, days, budget, travelStyle } = req.body;

  // Basic validation
  if (!destination || !days || !budget || !travelStyle) {
    return res.status(400).json({ error: "Please provide destination, days, budget and travelStyle" });
  }

  if (days < 1 || days > 30) {
    return res.status(400).json({ error: "Days must be between 1 and 30" });
  }

  if (budget < 500) {
    return res.status(400).json({ error: "Minimum budget is ₹500" });
  }

  const result = generateItinerary(destination, days, budget, travelStyle);

  if (result.error) {
    return res.status(404).json(result);
  }

  res.json(result);
}

module.exports = { createItinerary };
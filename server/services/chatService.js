function extractFromMessage(message) {
  const msg = message.toLowerCase();

  // Extract destination
  const destinations = [
  'goa', 'delhi', 'rajgir', 'nalanda', 'mumbai', 
  'jaipur', 'kerala', 'shimla', 'manali', 'agra', 
  'varanasi', 'kolkata'];
  let destination = null;
  for (const place of destinations) {
    if (msg.includes(place)) {
      destination = place;
      break;
    }
  }

  // Extract days
  const daysMatch = msg.match(/(\d+)\s*day/);
  const days = daysMatch ? parseInt(daysMatch[1]) : 3; // default 3 days

  // Extract budget
  const budgetMatch = msg.match(/(\d+)/g);
  let budget = 5000; // default budget
  if (budgetMatch) {
    const numbers = budgetMatch.map(Number);
    // pick the largest number as budget
    budget = Math.max(...numbers);
    // if days was extracted, remove it from budget candidates
    if (days && budget === days) budget = 5000;
  }

  // Extract travel style
  let travelStyle = 'relaxed'; // default
  if (msg.includes('adventure') || msg.includes('trek') || msg.includes('sport')) {
    travelStyle = 'adventure';
  } else if (msg.includes('culture') || msg.includes('history') || msg.includes('heritage')) {
    travelStyle = 'cultural';
  } else if (msg.includes('relax') || msg.includes('chill') || msg.includes('peaceful')) {
    travelStyle = 'relaxed';
  }

  return { destination, days, budget, travelStyle };
}

module.exports = { extractFromMessage };
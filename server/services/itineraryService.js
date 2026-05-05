const destinationData = {
  goa: {
    adventure: ["Scuba diving at Grande Island", "ATV ride at Chorao Island", "Water sports at Baga Beach"],
    relaxed: ["Sunset at Vagator Beach", "Spice plantation tour", "Lazy day at Palolem Beach"],
    cultural: ["Visit Basilica of Bom Jesus", "Old Goa churches tour", "Explore Fontainhas Latin Quarter"]
  },
  delhi: {
    adventure: ["Cycling tour of Old Delhi", "Rock climbing at Asola", "Street food walk at Chandni Chowk"],
    relaxed: ["Lodhi Garden morning walk", "Coffee at Hauz Khas Village", "India Gate evening stroll"],
    cultural: ["Red Fort tour", "Qutub Minar visit", "Humayun's Tomb exploration"]
  },
  rajgir: {
    adventure: ["Ropeway to Ratnagiri Hills", "Nature safari", "Cycling through Rajgir forests"],
    relaxed: ["Hot springs visit", "Peaceful walk at Venu Vana", "Sunset at Gridhakuta Hill"],
    cultural: ["Visit Vishwa Shanti Stupa", "Nalanda ruins day trip", "Cyclopean Wall exploration"]
  },
  nalanda: {
    adventure: ["Cycling around ruins", "Village walk", "Photography trail"],
    relaxed: ["Nalanda museum visit", "Garden stroll", "Local market walk"],
    cultural: ["Nalanda University ruins", "Xuanzang Memorial Hall", "Nava Nalanda Mahavihara visit"]
  }
};

function getBudgetCategory(budget, days) {
  const perDay = budget / days;
  if (perDay < 1000) return "low";
  if (perDay < 3000) return "medium";
  return "high";
}

function getHotel(budgetCategory) {
  const hotels = {
    low: "Budget guesthouse (~₹400/night)",
    medium: "Mid-range hotel (~₹1500/night)",
    high: "Premium hotel (~₹4000/night)"
  };
  return hotels[budgetCategory];
}

function getTransport(budgetCategory) {
  const transport = {
    low: "Local bus / shared auto",
    medium: "Auto rickshaw / cab",
    high: "Private cab / rental car"
  };
  return transport[budgetCategory];
}

function getBudgetBreakdown(budget, days) {
  return {
    travel: Math.round(budget * 0.3),
    stay: Math.round(budget * 0.4),
    food: Math.round(budget * 0.2),
    misc: Math.round(budget * 0.1)
  };
}

function generateItinerary(destination, days, budget, travelStyle) {
  const key = destination.toLowerCase();
  const activities = destinationData[key];

  if (!activities) {
    return { error: `Sorry, we don't have data for "${destination}" yet.` };
  }

  const styleActivities = activities[travelStyle] || activities["relaxed"];
  const budgetCategory = getBudgetCategory(budget, days);
  const hotel = getHotel(budgetCategory);
  const transport = getTransport(budgetCategory);
  const breakdown = getBudgetBreakdown(budget, days);

  const itinerary = [];

  for (let i = 1; i <= days; i++) {
    const activity = styleActivities[(i - 1) % styleActivities.length];

    let dayPlan = {};

    if (i === 1) {
      dayPlan = {
        day: i,
        title: "Arrival Day",
        morning: "Travel to destination & check in",
        afternoon: activity,
        evening: "Local market exploration & dinner",
        stay: hotel,
        transport: transport
      };
    } else if (i === days) {
      dayPlan = {
        day: i,
        title: "Departure Day",
        morning: "Hotel checkout & breakfast",
        afternoon: "Last minute sightseeing",
        evening: "Travel back home",
        stay: "N/A",
        transport: transport
      };
    } else {
      dayPlan = {
        day: i,
        title: `Day ${i} - Exploration`,
        morning: activity,
        afternoon: styleActivities[i % styleActivities.length],
        evening: "Dinner at local restaurant & rest",
        stay: hotel,
        transport: transport
      };
    }

    itinerary.push(dayPlan);
  }

  return {
    destination,
    days,
    budget,
    travelStyle,
    budgetBreakdown: breakdown,
    itinerary
  };
}

module.exports = { generateItinerary };
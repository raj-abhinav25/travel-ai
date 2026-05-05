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
  },
  shimla: {
    adventure: ["Trek to Jakhu Hill", "Skiing at Kufri", "Mountain biking on hill trails"],
    relaxed: ["Mall Road evening walk", "Sunset at Scandal Point", "Visit Viceregal Lodge gardens"],
    cultural: ["Visit Christ Church", "Shimla State Museum", "Explore colonial architecture on Mall Road"]
  },
  manali: {
    adventure: ["Solang Valley snow activities", "Rohtang Pass excursion", "River rafting on Beas"],
    relaxed: ["Hadimba Temple visit", "Old Manali cafe hopping", "Riverside walk at Beas"],
    cultural: ["Hadimba Devi Temple", "Manu Temple visit", "Tibetan Monastery exploration"]
  },
  agra: {
    adventure: ["Sunrise cycling tour around Taj", "Kayaking on Yamuna river", "Heritage walk through Agra fort"],
    relaxed: ["Taj Mahal sunset view", "Mehtab Bagh garden visit", "Agra fort leisurely tour"],
    cultural: ["Taj Mahal visit", "Agra Fort exploration", "Fatehpur Sikri day trip"]
  },
  varanasi: {
    adventure: ["Sunrise boat ride on Ganges", "Cycling through old city lanes", "Night ghost walk tour"],
    relaxed: ["Ganga Aarti evening ceremony", "Ghats morning walk", "Boat ride at sunset"],
    cultural: ["Kashi Vishwanath Temple", "Sarnath Buddhist site", "Vishwanath Gali market walk"]
  },
  kolkata: {
    adventure: ["Street food trail through North Kolkata", "Cycling through heritage areas", "River cruise on Hooghly"],
    relaxed: ["Victoria Memorial gardens", "Coffee at College Street", "Evening at Park Street"],
    cultural: ["Victoria Memorial visit", "Dakshineswar Kali Temple", "Indian Museum exploration"]
  }
};

const seasonalData = {
  goa: {
    summer: {
      warning: null,
      tip: "Great time for water sports and beach activities!"
    },
    monsoon: {
      warning: "⚠️ Monsoon season in Goa — beaches may be rough and some water sports closed.",
      tip: "Visit waterfalls like Dudhsagar which are stunning in monsoon!"
    },
    autumn: {
      warning: null,
      tip: "Perfect weather — one of the best times to visit Goa!"
    },
    winter: {
      warning: null,
      tip: "Peak season! Goa is at its best — expect crowds and higher prices."
    }
  },
  delhi: {
    summer: {
      warning: "⚠️ Delhi summers are extremely hot (45°C+). Carry water and avoid afternoon outings.",
      tip: "Visit monuments early morning or after sunset to avoid heat."
    },
    monsoon: {
      warning: null,
      tip: "Delhi looks beautiful in monsoon — gardens are lush and green!"
    },
    autumn: {
      warning: null,
      tip: "Lovely weather — perfect time to explore Delhi!"
    },
    winter: {
      warning: "⚠️ Delhi winters can have heavy fog — flights and trains may be delayed.",
      tip: "Carry warm clothes — mornings and evenings are very cold!"
    }
  },
  rajgir: {
    summer: {
      warning: "⚠️ Very hot in summer. Stay hydrated and avoid afternoon treks.",
      tip: "Hot springs are less crowded in summer!"
    },
    monsoon: {
      warning: null,
      tip: "Rajgir hills look stunning in monsoon — great for nature walks!"
    },
    autumn: {
      warning: null,
      tip: "Perfect weather for ropeway and outdoor activities!"
    },
    winter: {
      warning: null,
      tip: "Hot springs are most enjoyable in winter — highly recommended!"
    }
  },
  nalanda: {
    summer: {
      warning: "⚠️ Very hot — ruins are exposed with little shade. Carry sunscreen.",
      tip: "Visit early morning for best experience and photos!"
    },
    monsoon: {
      warning: null,
      tip: "Greenery around ruins looks beautiful in monsoon!"
    },
    autumn: {
      warning: null,
      tip: "Best time to visit Nalanda — pleasant weather!"
    },
    winter: {
      warning: null,
      tip: "Great weather for exploring ruins comfortably!"
    }
  },
  mumbai: {
    summer: {
      warning: "⚠️ Hot and humid in summer — stay hydrated.",
      tip: "Marine Drive is beautiful in evenings!"
    },
    monsoon: {
      warning: "⚠️ Mumbai monsoon is very heavy — flooding possible in some areas.",
      tip: "Try Mumbai's famous street food indoors during monsoon!"
    },
    autumn: {
      warning: null,
      tip: "Great time to explore Mumbai — pleasant weather!"
    },
    winter: {
      warning: null,
      tip: "Best time to visit Mumbai — cool and comfortable!"
    }
  },
  jaipur: {
    summer: {
      warning: "⚠️ Extreme heat in Jaipur summers (45°C+). Avoid outdoor activities midday.",
      tip: "Visit forts and palaces early morning only!"
    },
    monsoon: {
      warning: null,
      tip: "Jaipur looks vibrant in monsoon — great for photography!"
    },
    autumn: {
      warning: null,
      tip: "Perfect weather for exploring forts and markets!"
    },
    winter: {
      warning: null,
      tip: "Peak season — best time to visit Jaipur!"
    }
  },
  kerala: {
    summer: {
      warning: null,
      tip: "Good time for backwater houseboats before monsoon hits!"
    },
    monsoon: {
      warning: "⚠️ Kerala receives very heavy monsoon rainfall — some areas may flood.",
      tip: "Ayurvedic treatments are considered most effective during monsoon!"
    },
    autumn: {
      warning: null,
      tip: "Beautiful post-monsoon greenery — great for nature lovers!"
    },
    winter: {
      warning: null,
      tip: "Best time to visit Kerala — perfect weather for beaches and backwaters!"
    }
  },
  shimla: {
    summer: {
      warning: null,
      tip: "Perfect time to escape the heat — Shimla is pleasant and green!"
    },
    monsoon: {
      warning: "⚠️ Landslides possible on mountain roads during monsoon — check road conditions before travelling.",
      tip: "Shimla looks misty and beautiful but be careful on roads!"
    },
    autumn: {
      warning: null,
      tip: "Beautiful autumn colours on the hills — great for photography!"
    },
    winter: {
      warning: "⚠️ Heavy snowfall possible — roads may be blocked. Carry warm clothes.",
      tip: "Perfect if you want a snow experience — Shimla looks magical in winter!"
    }
  },
  manali: {
    summer: {
      warning: null,
      tip: "Best time to visit Manali — Rohtang Pass is open and weather is perfect!"
    },
    monsoon: {
      warning: "⚠️ Landslides and road blockages common during monsoon — avoid if possible.",
      tip: "If visiting, stick to town areas and avoid mountain passes."
    },
    autumn: {
      warning: null,
      tip: "Beautiful weather and less crowded — great time to visit!"
    },
    winter: {
      warning: "⚠️ Rohtang Pass closed in winter. Extreme cold (-15°C). Only for snow lovers.",
      tip: "Solang Valley has great snow activities in winter!"
    }
  },
  agra: {
    summer: {
      warning: "⚠️ Extremely hot in summer (45°C+). Taj Mahal visit early morning only.",
      tip: "Carry lots of water and wear light clothes!"
    },
    monsoon: {
      warning: null,
      tip: "Taj Mahal looks stunning in monsoon with dramatic cloudy skies — great for photos!"
    },
    autumn: {
      warning: null,
      tip: "Perfect weather for sightseeing — one of the best times to visit Agra!"
    },
    winter: {
      warning: "⚠️ Dense fog in winter may obscure Taj Mahal views — especially in January.",
      tip: "Visit Taj Mahal at sunrise for best chance of clear views!"
    }
  },
  varanasi: {
    summer: {
      warning: "⚠️ Very hot and humid in summer. Avoid afternoon outdoor activities.",
      tip: "Early morning Ganga Aarti is most peaceful in summer!"
    },
    monsoon: {
      warning: "⚠️ Ganges water level rises significantly — some ghats may be submerged.",
      tip: "Monsoon Varanasi has a unique mystical atmosphere worth experiencing!"
    },
    autumn: {
      warning: null,
      tip: "Great time to visit — pleasant weather and vibrant festivals!"
    },
    winter: {
      warning: null,
      tip: "Best time to visit Varanasi — cool weather and clear skies!"
    }
  },
  kolkata: {
    summer: {
      warning: "⚠️ Very hot and humid in summer — stay hydrated.",
      tip: "Try Kolkata's famous street food — best enjoyed in the evenings!"
    },
    monsoon: {
      warning: "⚠️ Kolkata experiences heavy rainfall and waterlogging during monsoon.",
      tip: "Monsoon is actually a great time to enjoy Kolkata's indoor cultural attractions!"
    },
    autumn: {
      warning: null,
      tip: "Durga Puja season — Kolkata is absolutely magical during this time!"
    },
    winter: {
      warning: null,
      tip: "Best time to visit Kolkata — perfect weather for exploring the city!"
    }
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

function getCurrentSeason() {
  const month = new Date().getMonth() + 1; // 1-12

  if (month >= 3 && month <= 5) return 'summer';
  if (month >= 6 && month <= 9) return 'monsoon';
  if (month >= 10 && month <= 11) return 'autumn';
  return 'winter'; // Dec, Jan, Feb
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

  // ✅ Get current season info
  const season = getCurrentSeason();
  const seasonal = seasonalData[key] ? seasonalData[key][season] : null;

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
    season,                           // ✅ current season
    seasonalWarning: seasonal?.warning || null,   // ✅ warning if any
    seasonalTip: seasonal?.tip || null,           // ✅ travel tip
    budgetBreakdown: breakdown,
    itinerary
  };
}

module.exports = { generateItinerary };
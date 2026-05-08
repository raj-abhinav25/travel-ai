import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Wallet,
  Compass,
  Clock,
  AlertTriangle,
  Lightbulb,
  Share2,
  Sunrise,
  Sun,
  Moon,
  Hotel,
  Car,
  Plane,
} from "lucide-react";
import BudgetBreakdown from "../components/BudgetBreakdown";
import "./TripDetailsPage.css";

const API_BASE = "http://localhost:5000";

const destinationImages = {
  goa: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=500&fit=crop",
  manali: "https://images.unsplash.com/photo-1605649487212-b4bdc7e75306?w=1200&h=500&fit=crop",
  jaipur: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&h=500&fit=crop",
  kerala: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&h=500&fit=crop",
  shimla: "https://images.unsplash.com/photo-1597074866923-dc0589150458?w=1200&h=500&fit=crop",
  udaipur: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=500&fit=crop",
  varanasi: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=1200&h=500&fit=crop",
  mumbai: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=1200&h=500&fit=crop",
  delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&h=500&fit=crop",
  agra: "https://images.unsplash.com/photo-1564507592227-d023362181b4?w=1200&h=500&fit=crop",
  bangalore: "https://images.unsplash.com/photo-1596176539460-1419736c0a0c?w=1200&h=500&fit=crop",
  kolkata: "https://images.unsplash.com/photo-1558431382-27f5a0533485?w=1200&h=500&fit=crop",
  chennai: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&h=500&fit=crop",
  srinagar: "https://images.unsplash.com/photo-1620023640232-0056e4095b5e?w=1200&h=500&fit=crop",
  leh: "https://images.unsplash.com/photo-1621831835773-455b9a4c8a51?w=1200&h=500&fit=crop",
  paris: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&h=500&fit=crop",
  london: "https://images.unsplash.com/photo-1513635269975-59693e0cd25d?w=1200&h=500&fit=crop",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=500&fit=crop",
  new_york: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&h=500&fit=crop",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&h=500&fit=crop",
  default: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=500&fit=crop",
};

const styleIcons = {
  adventure: <Compass size={14} />,
  relaxed: <Sun size={14} />,
  cultural: <MapPin size={14} />,
};

const TripDetailsPage = ({ addToast }) => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/trip/${tripId}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        const tripData = data.trip || data;
        setTrip(tripData);
        if (tripData.itinerary?.length > 0) {
          setActiveDay(0);
        }
      } catch (err) {
        console.error("Fetch trip error:", err);
        setError("Unable to load trip details.");
        if (addToast) addToast("Failed to load trip details", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [tripId, addToast]);

  const handleShare = async () => {
    const destination = trip?.destination || "a trip";
    const text = `Check out my ${trip?.days}-day trip to ${destination} planned with WanderAI!`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `Trip to ${destination}`, text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      if (addToast) addToast("Trip info copied to clipboard!", "success");
    }
  };

  if (loading) {
    return (
      <div className="trip-details-page page-enter">
        <div className="td-loading">
          <div className="td-loading-spinner" />
          <p>Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="trip-details-page page-enter">
        <div className="td-error">
          <AlertTriangle size={40} strokeWidth={1.5} />
          <h2>Something went wrong</h2>
          <p>{error || "Trip not found"}</p>
          <button className="td-back-btn" onClick={() => navigate("/saved")}>
            <ArrowLeft size={16} /> Back to Saved Trips
          </button>
        </div>
      </div>
    );
  }

  const destination = trip.destination || "Unknown";
  const displayDest = destination.charAt(0).toUpperCase() + destination.slice(1);
  const days = trip.days || "?";
  const budget = trip.budget || 0;
  const travelStyle = trip.travelStyle || "adventure";
  const itinerary = trip.itinerary || [];
  const imageUrl =
    destinationImages[destination.toLowerCase().replace(/\s+/g, "_")] || destinationImages.default;
  const createdDate = trip.createdAt
    ? new Date(trip.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const timeSlots = [
    { key: "morning", icon: <Sunrise size={16} />, label: "Morning", color: "#f59e0b" },
    { key: "afternoon", icon: <Sun size={16} />, label: "Afternoon", color: "#e94560" },
    { key: "evening", icon: <Moon size={16} />, label: "Evening", color: "#6366f1" },
  ];

  return (
    <div className="trip-details-page page-enter" id="trip-details-page">
      {/* Hero Banner */}
      <div className="td-hero" id="td-hero">
        <img src={imageUrl} alt={displayDest} className="td-hero-img" />
        <div className="td-hero-overlay" />
        <div className="td-hero-content animate-fade-in-up">
          <button className="td-hero-back" onClick={() => navigate("/saved")} id="td-back-btn">
            <ArrowLeft size={18} />
            <span>Saved Trips</span>
          </button>
          <h1 className="td-hero-title">{displayDest}</h1>
          <div className="td-hero-meta">
            <span className="td-hero-chip">
              <Calendar size={14} />
              {days} Days
            </span>
            <span className="td-hero-chip">
              <Wallet size={14} />
              ₹{budget.toLocaleString()}
            </span>
            <span className="td-hero-chip td-hero-chip--style">
              {styleIcons[travelStyle] || <Compass size={14} />}
              {travelStyle}
            </span>
          </div>
        </div>
        <button className="td-share-btn" onClick={handleShare} title="Share trip" id="td-share-btn">
          <Share2 size={16} />
        </button>
      </div>

      {/* Main Content */}
      <div className="td-content">
        {/* Trip Info Strip */}
        <div className="td-info-strip animate-fade-in-up delay-1">
          {createdDate && (
            <div className="td-info-item">
              <Clock size={14} />
              <span>Planned on {createdDate}</span>
            </div>
          )}
          <div className="td-info-item">
            <Plane size={14} />
            <span>{itinerary.length} day itinerary</span>
          </div>
        </div>

        {/* Warnings / Tips */}
        {trip.seasonalWarning && (
          <div className="td-banner td-banner--warning animate-fade-in-up delay-2" id="td-warning">
            <AlertTriangle size={16} />
            <span>{trip.seasonalWarning}</span>
          </div>
        )}
        {trip.seasonalTip && (
          <div className="td-banner td-banner--tip animate-fade-in-up delay-2" id="td-tip">
            <Lightbulb size={16} />
            <span>{trip.seasonalTip}</span>
          </div>
        )}

        {/* Day Navigation Tabs */}
        {itinerary.length > 0 && (
          <div className="td-day-tabs animate-fade-in-up delay-2" id="td-day-tabs">
            {itinerary.map((day, idx) => (
              <button
                key={idx}
                className={`td-day-tab ${activeDay === idx ? "active" : ""}`}
                onClick={() => setActiveDay(idx)}
                id={`td-tab-day-${idx + 1}`}
              >
                <span className="td-day-tab-num">Day {day.day || idx + 1}</span>
                <span className="td-day-tab-title">{day.title}</span>
              </button>
            ))}
          </div>
        )}

        {/* Active Day Detail */}
        {activeDay !== null && itinerary[activeDay] && (
          <div className="td-day-detail animate-fade-in-up" key={activeDay} id="td-day-detail">
            <div className="td-day-detail-header">
              <div className="td-day-badge">Day {itinerary[activeDay].day || activeDay + 1}</div>
              <h2 className="td-day-title">{itinerary[activeDay].title}</h2>
            </div>

            <div className="td-timeline">
              {timeSlots.map((slot) => {
                const activity = itinerary[activeDay][slot.key];
                if (!activity) return null;
                return (
                  <div className="td-timeline-item" key={slot.key}>
                    <div className="td-timeline-dot" style={{ background: slot.color }} />
                    <div className="td-timeline-line" />
                    <div className="td-timeline-content">
                      <div className="td-timeline-label">
                        <span className="td-timeline-icon" style={{ color: slot.color }}>
                          {slot.icon}
                        </span>
                        <span className="td-timeline-text">{slot.label}</span>
                      </div>
                      <p className="td-timeline-activity">{activity}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stay & Transport for this day */}
            <div className="td-day-extras">
              {itinerary[activeDay].stay && (
                <div className="td-extra-chip">
                  <Hotel size={14} />
                  <span>{itinerary[activeDay].stay}</span>
                </div>
              )}
              {itinerary[activeDay].transport && (
                <div className="td-extra-chip">
                  <Car size={14} />
                  <span>{itinerary[activeDay].transport}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* All Days Overview Grid */}
        <div className="td-section animate-fade-in-up delay-3">
          <h2 className="td-section-title">
            <MapPin size={18} />
            Full Itinerary Overview
          </h2>
          <div className="td-overview-grid" id="td-overview-grid">
            {itinerary.map((day, idx) => (
              <div
                key={idx}
                className={`td-overview-card ${activeDay === idx ? "active" : ""}`}
                onClick={() => setActiveDay(idx)}
              >
                <div className="td-overview-card-header">
                  <div className="td-overview-badge">Day {day.day || idx + 1}</div>
                  <h4>{day.title}</h4>
                </div>
                <div className="td-overview-slots">
                  {timeSlots.map((slot) =>
                    day[slot.key] ? (
                      <div className="td-overview-slot" key={slot.key}>
                        <span className="td-overview-slot-icon" style={{ color: slot.color }}>
                          {slot.icon}
                        </span>
                        <span className="td-overview-slot-text">{day[slot.key]}</span>
                      </div>
                    ) : null
                  )}
                </div>
                {(day.stay || day.transport) && (
                  <div className="td-overview-footer">
                    {day.stay && (
                      <span className="td-overview-meta">
                        <Hotel size={12} /> {day.stay}
                      </span>
                    )}
                    {day.transport && (
                      <span className="td-overview-meta">
                        <Car size={12} /> {day.transport}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Budget Breakdown */}
        {trip.budgetBreakdown && (
          <div className="td-section animate-fade-in-up delay-4">
            <BudgetBreakdown breakdown={trip.budgetBreakdown} totalBudget={budget} />
          </div>
        )}

        {/* Bottom CTA */}
        <div className="td-bottom-cta animate-fade-in-up delay-5">
          <button className="td-cta-btn" onClick={() => navigate("/chat")} id="td-plan-new-btn">
            <Compass size={16} />
            Plan a New Trip
          </button>
          <button className="td-cta-btn td-cta-btn--secondary" onClick={() => navigate("/saved")} id="td-back-saved-btn">
            <ArrowLeft size={16} />
            Back to Saved Trips
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;

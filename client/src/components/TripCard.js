import React from "react";
import { Calendar, Wallet, Trash2 } from "lucide-react";
import "./TripCard.css";

const TripCard = ({ trip, onDelete, onClick }) => {
  const styleColors = {
    adventure: { bg: "rgba(233, 69, 96, 0.08)", text: "var(--color-accent)" },
    relaxed: { bg: "rgba(16, 185, 129, 0.08)", text: "#10b981" },
    cultural: { bg: "rgba(99, 102, 241, 0.08)", text: "#6366f1" },
  };

  const destinationImages = {
    goa: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=250&fit=crop",
    manali: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=250&fit=crop",
    jaipur: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=250&fit=crop",
    kerala: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=250&fit=crop",
    default: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop",
  };

  const destination = trip.tripData?.destination || trip.destination || "Unknown";
  const days = trip.tripData?.days || trip.days || "?";
  const budget = trip.tripData?.budget || trip.budget || 0;
  const travelStyle = trip.tripData?.travelStyle || trip.travelStyle || "adventure";
  const savedDate = trip.savedAt
    ? new Date(trip.savedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    : "Recently";

  const imageUrl = destinationImages[destination.toLowerCase()] || destinationImages.default;
  const style = styleColors[travelStyle] || styleColors.adventure;

  return (
    <div className="trip-card animate-fade-in-up" id={`trip-card-${trip._id || trip.id}`} onClick={onClick}>
      <div className="trip-card-image">
        <img src={imageUrl} alt={destination} loading="lazy" />
        <div className="trip-card-overlay">
          <span className="trip-style-badge" style={{ background: style.bg, color: style.text }}>
            {travelStyle}
          </span>
        </div>
      </div>

      <div className="trip-card-content">
        <h3 className="trip-destination">{destination}</h3>
        <div className="trip-details">
          <div className="trip-detail">
            <Calendar size={13} />
            <span>{days} Days</span>
          </div>
          <div className="trip-detail">
            <Wallet size={13} />
            <span>₹{budget.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="trip-card-footer">
        <span className="trip-date">{savedDate}</span>
        <button
          className="trip-delete-btn"
          id={`delete-trip-${trip._id || trip.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(trip);
          }}
          title="Delete trip"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default TripCard;

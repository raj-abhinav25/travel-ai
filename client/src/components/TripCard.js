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
    manali: "https://images.unsplash.com/photo-1605649487212-b4bdc7e75306?w=400&h=250&fit=crop",
    jaipur: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=250&fit=crop",
    kerala: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=250&fit=crop",
    shimla: "https://images.unsplash.com/photo-1597074866923-dc0589150458?w=400&h=250&fit=crop",
    udaipur: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=250&fit=crop",
    varanasi: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=400&h=250&fit=crop",
    mumbai: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=400&h=250&fit=crop",
    delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=250&fit=crop",
    agra: "https://images.unsplash.com/photo-1564507592227-d023362181b4?w=400&h=250&fit=crop",
    bangalore: "https://images.unsplash.com/photo-1596176539460-1419736c0a0c?w=400&h=250&fit=crop",
    kolkata: "https://images.unsplash.com/photo-1558431382-27f5a0533485?w=400&h=250&fit=crop",
    chennai: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=250&fit=crop",
    srinagar: "https://images.unsplash.com/photo-1620023640232-0056e4095b5e?w=400&h=250&fit=crop",
    leh: "https://images.unsplash.com/photo-1621831835773-455b9a4c8a51?w=400&h=250&fit=crop",
    paris: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=250&fit=crop",
    london: "https://images.unsplash.com/photo-1513635269975-59693e0cd25d?w=400&h=250&fit=crop",
    dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop",
    new_york: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=250&fit=crop",
    bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=250&fit=crop",
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

  const imageUrl = destinationImages[destination.toLowerCase().replace(/\s+/g, "_")] || destinationImages.default;
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

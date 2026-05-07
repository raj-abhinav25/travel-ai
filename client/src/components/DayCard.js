import React from "react";
import { Sunrise, Sun, Moon, Hotel, Car } from "lucide-react";
import "./DayCard.css";

const DayCard = ({ day }) => {
  const timeSlots = [
    { key: "morning", icon: <Sunrise size={15} />, label: "Morning" },
    { key: "afternoon", icon: <Sun size={15} />, label: "Afternoon" },
    { key: "evening", icon: <Moon size={15} />, label: "Evening" },
  ];

  return (
    <div className="day-card animate-fade-in-up" id={`day-card-${day.day}`}>
      <div className="day-card-header">
        <div className="day-badge">Day {day.day}</div>
        <h3 className="day-title">{day.title}</h3>
      </div>

      <div className="day-card-body">
        {timeSlots.map((slot) => (
          <div className="time-slot" key={slot.key}>
            <div className="time-slot-label">
              <span className="time-icon">{slot.icon}</span>
              <span className="time-text">{slot.label}</span>
            </div>
            <p className="time-activity">{day[slot.key]}</p>
          </div>
        ))}
      </div>

      <div className="day-card-footer">
        {day.stay && (
          <div className="day-meta">
            <Hotel size={13} />
            <span>{day.stay}</span>
          </div>
        )}
        {day.transport && (
          <div className="day-meta">
            <Car size={13} />
            <span>{day.transport}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayCard;

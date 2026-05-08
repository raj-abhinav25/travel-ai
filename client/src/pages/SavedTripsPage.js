import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Globe, Plane, Compass, Unplug } from "lucide-react";
import TripCard from "../components/TripCard";
import ConfirmModal from "../components/ConfirmModal";
import { SkeletonCard } from "../components/Skeleton";
import "./SavedTripsPage.css";

const API_BASE = "http://localhost:5000";

const SavedTripsPage = ({ addToast }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/trip/user/${localStorage.getItem('wanderai_userId')}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setTrips(Array.isArray(data) ? data : data.trips || []);
    } catch (err) {
      console.error("Fetch trips error:", err);
      setError("Unable to load your saved trips. Please check if the server is running.");
      addToast("Failed to load saved trips", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleDeleteRequest = (trip) => {
    setDeleteTarget(trip);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    const tripId = deleteTarget._id || deleteTarget.id;
    const rev = deleteTarget._rev || deleteTarget.rev;

    try {
      const res = await fetch(`${API_BASE}/trip/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId, rev }),
      });

      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

      setTrips((prev) => prev.filter((t) => (t._id || t.id) !== tripId));
      addToast("Trip deleted successfully", "success");
    } catch (err) {
      console.error("Delete error:", err);
      addToast("Failed to delete trip", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleTripClick = (trip) => {
    const tripId = trip._id || trip.id;
    if (tripId) {
      navigate(`/trip/${tripId}`);
    }
  };

  const destination = deleteTarget?.tripData?.destination || deleteTarget?.destination || "this trip";

  return (
    <div className="saved-page page-enter" id="saved-trips-page">
      <div className="saved-container">
        <div className="saved-header">
          <div>
            <h1 className="saved-title animate-fade-in-up">Saved Trips</h1>
            <p className="saved-subtitle animate-fade-in-up delay-1">
              {trips.length > 0
                ? `${trips.length} trip${trips.length > 1 ? "s" : ""} saved`
                : "Your travel adventures await"}
            </p>
          </div>
          {trips.length > 0 && (
            <button className="refresh-btn animate-fade-in delay-2" onClick={fetchTrips} title="Refresh">
              <RefreshCw size={15} />
              <span>Refresh</span>
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="trips-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="saved-error animate-fade-in-up" id="error-state">
            <div className="error-icon-wrapper">
              <Unplug size={28} strokeWidth={1.5} />
            </div>
            <h3>Connection Error</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={fetchTrips}>Try Again</button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && trips.length === 0 && (
          <div className="saved-empty animate-fade-in-up" id="empty-state">
            <div className="empty-illustration">
              <div className="empty-globe animate-float">
                <Globe size={48} strokeWidth={1} />
              </div>
              <div className="empty-plane">
                <Plane size={20} strokeWidth={1.5} />
              </div>
            </div>
            <h3>No Trips Saved Yet</h3>
            <p>Start planning your next adventure! Ask our AI to create a perfect itinerary for you.</p>
            <button className="empty-cta" onClick={() => navigate("/chat")} id="start-planning-btn">
              <Compass size={16} />
              Start Planning
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && trips.length > 0 && (
          <div className="trips-grid" id="trips-grid">
            {trips.map((trip, index) => (
              <div key={trip._id || trip.id || index} className={`animate-fade-in-up delay-${Math.min(index + 1, 5)}`}>
                <TripCard trip={trip} onDelete={handleDeleteRequest} onClick={() => handleTripClick(trip)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Trip"
        message={`Are you sure you want to delete your trip to ${destination}? This action cannot be undone.`}
      />
    </div>
  );
};

export default SavedTripsPage;

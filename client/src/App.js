import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import SavedTripsPage from "./pages/SavedTripsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import TripDetailsPage from "./pages/TripDetailsPage";
import Toast from "./components/Toast";
import "./App.css";

// Component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("wanderai_token");
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

function App() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Home — public landing page */}
              <Route path="/" element={<LandingPage addToast={addToast} />} />

              {/* Auth pages — public */}
              <Route path="/login" element={<LoginPage addToast={addToast} />} />
              <Route path="/signup" element={<SignupPage addToast={addToast} />} />

              {/* Protected pages — require login */}
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatPage addToast={addToast} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved"
                element={
                  <ProtectedRoute>
                    <SavedTripsPage addToast={addToast} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage addToast={addToast} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trip/:tripId"
                element={
                  <ProtectedRoute>
                    <TripDetailsPage addToast={addToast} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <div className="toast-container">
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                id={toast.id}
                message={toast.message}
                type={toast.type}
                onClose={removeToast}
              />
            ))}
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
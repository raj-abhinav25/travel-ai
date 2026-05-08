import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, ArrowRight, Sparkles, Brain, PiggyBank, Lightbulb, Mountain, Palmtree, Landmark, LogIn, UserPlus } from "lucide-react";
import "./LandingPage.css";

const LandingPage = ({ addToast }) => {
  const [query, setQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("wanderai_token");

  const travelStyles = [
    { key: "adventure", label: "Adventure", icon: <Mountain size={16} /> },
    { key: "relaxed", label: "Relaxed", icon: <Palmtree size={16} /> },
    { key: "cultural", label: "Cultural", icon: <Landmark size={16} /> },
  ];

  const features = [
    {
      icon: <Brain size={24} strokeWidth={1.5} />,
      title: "AI Powered",
      description: "Smart itineraries crafted using advanced AI that understands your preferences and travel style.",
    },
    {
      icon: <PiggyBank size={24} strokeWidth={1.5} />,
      title: "Budget Planner",
      description: "Detailed cost breakdowns keep your travels affordable. See exactly where every rupee goes.",
    },
    {
      icon: <Lightbulb size={24} strokeWidth={1.5} />,
      title: "Smart Suggestions",
      description: "Discover hidden gems and optimized routes tailored to make your trip unforgettable.",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      addToast("Please enter a travel query to get started!", "warning");
      return;
    }
    navigate("/chat", { state: { query, travelStyle: selectedStyle } });
  };

  return (
    <div className="landing-page page-enter" id="landing-page">
      {/* Hero */}
      <section className="hero" id="hero-section">
        <div className="hero-bg">
          <div className="hero-gradient" />
        </div>

        <div className="hero-content">
          <div className="hero-badge animate-fade-in-down">
            <Sparkles size={14} />
            <span>AI-Powered Travel Planning</span>
          </div>

          <h1 className="hero-title animate-fade-in-up delay-1">
            Plan Smarter.
            <br />
            <span className="hero-title-accent">Travel Better.</span>
          </h1>

          <p className="hero-subtitle animate-fade-in-up delay-2">
            Let AI craft your perfect trip — personalized itineraries, smart
            budgets, and local gems, all in seconds.
          </p>

          <form className="hero-search animate-fade-in-up delay-3" onSubmit={handleSearch} id="search-form">
            <div className="search-container">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                id="search-input"
                placeholder="Try: 3 day adventure trip to Goa under ₹9000"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
              <button type="submit" className="search-btn" id="search-btn">
                <span>Plan My Trip</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          <div className="travel-styles animate-fade-in-up delay-4">
            {travelStyles.map((style) => (
              <button
                key={style.key}
                className={`style-chip ${selectedStyle === style.key ? "active" : ""}`}
                id={`style-${style.key}`}
                onClick={() => setSelectedStyle(selectedStyle === style.key ? "" : style.key)}
              >
                {style.icon}
                {style.label}
              </button>
            ))}
          </div>

          {/* Auth CTA — only shown if not logged in */}
          {!isLoggedIn && (
            <div className="hero-auth-cta animate-fade-in-up delay-5" id="hero-auth-cta">
              <Link to="/signup" className="hero-cta-btn hero-cta-primary" id="hero-signup-btn">
                <UserPlus size={18} />
                Get Started Free
              </Link>
              <Link to="/login" className="hero-cta-btn hero-cta-secondary" id="hero-login-btn">
                <LogIn size={18} />
                Log In
              </Link>
            </div>
          )}
        </div>

        <div className="hero-scroll-indicator animate-fade-in delay-5">
          <div className="scroll-line" />
        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features-section">
        <div className="features-container">
          <div className="features-header">
            <span className="features-label">Why WanderAI</span>
            <h2 className="features-title">
              Everything you need for the
              <span className="text-accent"> perfect trip</span>
            </h2>
            <p className="features-subtitle">
              From idea to itinerary in seconds. No more hours of research.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                className={`feature-card animate-fade-in-up delay-${index + 1}`}
                key={feature.title}
                id={`feature-${feature.title.toLowerCase().replace(" ", "-")}`}
              >
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section" id="stats-section">
        <div className="stats-container">
          {[
            { value: "10K+", label: "Trips Planned" },
            { value: "50+", label: "Destinations" },
            { value: "4.9", label: "User Rating" },
            { value: "<30s", label: "Planning Time" },
          ].map((stat) => (
            <div className="stat-item" key={stat.label}>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer" id="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">WanderAI</span>
            <p className="footer-tagline">Plan Smarter. Travel Better.</p>
          </div>
          <span className="footer-credit">Made with care for travelers</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

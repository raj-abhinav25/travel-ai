import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Send, Bot, User, Plane, MapPin, AlertTriangle, Lightbulb } from "lucide-react";
import DayCard from "../components/DayCard";
import BudgetBreakdown from "../components/BudgetBreakdown";
import { SkeletonDayCard } from "../components/Skeleton";
import "./ChatPage.css";

const API_BASE = "http://localhost:5000";

const ChatPage = ({ addToast }) => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const querySentRef = useRef(false);

  // Auto-send initial query from landing page or load saved trip
  useEffect(() => {
    if (location.state?.tripData && !querySentRef.current) {
      querySentRef.current = true;
      setTripData(location.state.tripData);

      const destination = location.state.tripData.destination || "destination";
      const days = location.state.tripData.days || "?";

      setMessages([
        { role: "user", text: `Show me my saved trip to ${destination}`, timestamp: new Date() },
        { role: "ai", text: `Here is your saved ${days}-day trip to ${destination}!`, timestamp: new Date() },
      ]);

      window.history.replaceState({}, document.title);
    } else if (location.state?.query && !querySentRef.current) {
      querySentRef.current = true;
      const initialQuery = location.state.travelStyle
        ? `${location.state.query} (${location.state.travelStyle} style)`
        : location.state.query;
      handleSend(initialQuery);
      window.history.replaceState({}, document.title);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (messageText) => {
    const text = messageText || input.trim();
    if (!text) return;

    const userMsg = { role: "user", text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, userId: "user_demo_123" }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      const aiMsg = {
        role: "ai",
        text: data.message || "Here's your trip plan!",
        timestamp: new Date(),
      };

      await new Promise((r) => setTimeout(r, 600));
      setMessages((prev) => [...prev, aiMsg]);

      if (data.tripData) {
        setTripData(data.tripData);
        if (data.saved) {
          addToast("Trip plan saved automatically!", "success");
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg = {
        role: "ai",
        text: "I'm having trouble connecting to the server. Please make sure the backend is running on localhost:5000.",
        isError: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      addToast("Failed to connect to server", "error");
    } finally {
      setIsTyping(false);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="chat-page page-enter" id="chat-page">
      {/* Left: Chat */}
      <div className="chat-panel" id="chat-panel">
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="chat-header-title">WanderAI</h3>
              <span className={`chat-status ${isTyping ? "typing" : ""}`}>
                <span className="status-dot" />
                {isTyping ? "Typing..." : "Online"}
              </span>
            </div>
          </div>
        </div>

        <div className="chat-messages" id="chat-messages">
          {messages.length === 0 && !isTyping && (
            <div className="chat-empty">
              <div className="chat-empty-icon animate-float">
                <Plane size={32} strokeWidth={1.5} />
              </div>
              <h3>Start Planning Your Trip</h3>
              <p>Tell me where you want to go, your budget, and how many days. I'll create the perfect itinerary.</p>
              <div className="chat-suggestions">
                {[
                  "3 day trip to Goa under ₹9000",
                  "5 day cultural trip to Jaipur",
                  "Weekend getaway to Manali",
                ].map((suggestion) => (
                  <button key={suggestion} className="suggestion-chip" onClick={() => handleSend(suggestion)}>
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`message-wrapper ${msg.role} animate-fade-in-up`}>
              {msg.role === "ai" && (
                <div className="message-avatar ai-avatar">
                  <Bot size={14} />
                </div>
              )}
              <div className={`message-bubble ${msg.role} ${msg.isError ? "error" : ""}`}>
                <p className="message-text">{msg.text}</p>
                <span className="message-time">{formatTime(msg.timestamp)}</span>
              </div>
              {msg.role === "user" && (
                <div className="message-avatar user-avatar">
                  <User size={14} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="message-wrapper ai animate-fade-in">
              <div className="message-avatar ai-avatar">
                <Bot size={14} />
              </div>
              <div className="message-bubble ai typing-bubble">
                <div className="typing-indicator" id="typing-indicator">
                  <span className="typing-dot" style={{ animationDelay: "0s" }} />
                  <span className="typing-dot" style={{ animationDelay: "0.15s" }} />
                  <span className="typing-dot" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <form className="chat-input-container" onSubmit={handleSubmit} id="chat-input-form">
          <div className="chat-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              id="chat-input"
              placeholder="Ask me about your next trip..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              autoComplete="off"
            />
            <button type="submit" className="chat-send-btn" id="chat-send-btn" disabled={isTyping || !input.trim()}>
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* Right: Results */}
      <div className="results-panel" id="results-panel">
        {!tripData && !loading && (
          <div className="results-empty">
            <div className="results-empty-icon animate-float">
              <MapPin size={40} strokeWidth={1.5} />
            </div>
            <h3>Your Itinerary Will Appear Here</h3>
            <p>Start a conversation and I'll plan your perfect trip with day-by-day activities and budget breakdown.</p>
          </div>
        )}

        {loading && (
          <div className="results-loading">
            <div className="results-loading-header">
              <div className="loading-spinner" />
              <span>Crafting your itinerary...</span>
            </div>
            <div className="skeleton-grid">
              <SkeletonDayCard />
              <SkeletonDayCard />
            </div>
          </div>
        )}

        {tripData && !loading && (
          <div className="results-content animate-fade-in-up">
            <div className="results-header">
              <h2 className="results-title">
                {tripData.destination?.charAt(0).toUpperCase() + tripData.destination?.slice(1)}
              </h2>
              <div className="results-meta">
                <span className="meta-chip">{tripData.days} Days</span>
                <span className="meta-chip">₹{tripData.budget?.toLocaleString()}</span>
                <span className="meta-chip style-tag">{tripData.travelStyle}</span>
              </div>
            </div>

            {tripData.seasonalWarning && (
              <div className="banner banner-warning animate-fade-in-up" id="warning-banner">
                <AlertTriangle size={16} />
                <span>{tripData.seasonalWarning}</span>
              </div>
            )}

            {tripData.seasonalTip && (
              <div className="banner banner-tip animate-fade-in-up" id="tip-banner">
                <Lightbulb size={16} />
                <span>{tripData.seasonalTip}</span>
              </div>
            )}

            <div className="itinerary-cards">
              {tripData.itinerary?.map((day, index) => (
                <DayCard key={index} day={day} />
              ))}
            </div>

            {tripData.budgetBreakdown && (
              <BudgetBreakdown breakdown={tripData.budgetBreakdown} totalBudget={tripData.budget} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

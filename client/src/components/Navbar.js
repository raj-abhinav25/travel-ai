import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Compass, Bookmark, Sun, Moon, Menu, X, LogIn, UserCircle, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("wanderai_token");

  // Public nav links (always shown)
  const publicLinks = [
    { path: "/", label: "Home", icon: Home },
  ];

  // Links only shown when logged in
  const protectedLinks = [
    { path: "/chat", label: "Plan Trip", icon: Compass },
    { path: "/saved", label: "Saved", icon: Bookmark },
  ];

  const navLinks = isLoggedIn ? [...publicLinks, ...protectedLinks] : publicLinks;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
    localStorage.removeItem("wanderai_token");
    localStorage.removeItem("wanderai_userId");
    localStorage.removeItem("wanderai_profile");
    setMobileOpen(false);
    navigate("/");
  };

  // Get user profile for avatar
  const getProfile = () => {
    try {
      const stored = localStorage.getItem("wanderai_profile");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const profile = getProfile();
  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" id="logo-link">
          <div className="logo-mark">W</div>
          <span className="logo-text">WanderAI</span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
              id={`nav-link-${link.label.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMobileOpen(false)}
            >
              <link.icon size={16} strokeWidth={2} />
              {link.label}
            </Link>
          ))}

          <div className="nav-divider" />

          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <div className="theme-toggle-track">
              <Sun size={12} className="theme-icon sun-icon" />
              <Moon size={12} className="theme-icon moon-icon" />
              <div className={`theme-toggle-thumb ${isDark ? "dark" : ""}`} />
            </div>
          </button>

          <div className="nav-divider" />

          {/* Auth Section */}
          {isLoggedIn ? (
            <div className="nav-user-section">
              <Link
                to="/profile"
                className={`nav-avatar-link ${location.pathname === "/profile" ? "active" : ""}`}
                id="nav-profile-link"
                onClick={() => setMobileOpen(false)}
              >
                {profile?.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt="Profile"
                    className="nav-avatar-img"
                  />
                ) : (
                  <div className="nav-avatar-placeholder">
                    {initials}
                  </div>
                )}
              </Link>
              <button
                className="nav-logout-btn"
                id="nav-logout-btn"
                onClick={handleLogout}
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="nav-auth-btns">
              <Link
                to="/login"
                className={`nav-link nav-login-link ${location.pathname === "/login" ? "active" : ""}`}
                id="nav-login-link"
                onClick={() => setMobileOpen(false)}
              >
                <LogIn size={16} />
                Log In
              </Link>
              <Link
                to="/signup"
                className="nav-signup-btn"
                id="nav-signup-btn"
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button
          className="navbar-toggle"
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

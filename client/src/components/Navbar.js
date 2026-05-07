import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Compass, Bookmark, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/chat", label: "Plan Trip", icon: Compass },
    { path: "/saved", label: "Saved", icon: Bookmark },
  ];

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

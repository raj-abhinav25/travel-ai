import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle, LogIn } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./AuthPages.css";

const LoginPage = ({ addToast }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear specific field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (formError) setFormError("");
  };

  // ✅ REPLACED - Now connected to Firebase Auth
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setFormError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      const token = await user.getIdToken();
      
      // Store token and userId just like before so the rest of the app works seamlessly
      localStorage.setItem('wanderai_token', token);
      localStorage.setItem('wanderai_userId', user.uid);

      // Fetch user profile from backend
      try {
        const response = await fetch(`http://localhost:5000/auth/user/${user.uid}`);
        if (response.ok) {
          const profileData = await response.json();
          localStorage.setItem("wanderai_profile", JSON.stringify({
            name: profileData.name,
            email: profileData.email,
            photoUrl: profileData.photoUrl || ""
          }));
        }
      } catch (e) {
        console.error("Failed to fetch user profile", e);
      }

      if (addToast) addToast("Welcome back! Redirecting...", "success");

      setTimeout(() => {
        // Redirect to the page they tried to visit before login, or default to /chat
        const from = location.state?.from?.pathname || "/chat";
        // Also preserve any state (like search queries from LandingPage)
        const preservedState = location.state?.from?.state;
        navigate(from, { state: preservedState });
      }, 600);

    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setFormError('Invalid email or password.');
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-layout page-enter" id="login-page">
      {/* Animated Background */}
      <div className="auth-bg">
        <div className="auth-bg-overlay" />
      </div>
      <div className="auth-bg-orb auth-bg-orb--1" />
      <div className="auth-bg-orb auth-bg-orb--2" />
      <div className="auth-bg-orb auth-bg-orb--3" />

      {/* Glassmorphism Card */}
      <div className="auth-card" id="login-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <div className="auth-logo-mark">W</div>
            <span className="auth-logo-text">WanderAI</span>
          </div>
          <p className="auth-tagline">Plan Smarter. Travel Better.</p>
        </div>

        {/* Error Toast */}
        {formError && (
          <div className="auth-error-toast" id="login-error">
            <AlertCircle size={18} className="auth-error-icon" />
            <span className="auth-error-text">{formError}</span>
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleLogin} id="login-form" noValidate>
          {/* Email */}
          <div className="input-group">
            <label className="input-label" htmlFor="login-email">Email</label>
            <div className="input-wrapper">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                id="login-email"
                name="email"
                className={`input-field ${errors.email ? "error" : ""}`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <span className="input-error" id="login-email-error">
                <AlertCircle size={12} />
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="input-group">
            <label className="input-label" htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <Lock size={16} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                name="password"
                className={`input-field input-field--password ${errors.password ? "error" : ""}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                id="login-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <span className="input-error" id="login-password-error">
                <AlertCircle size={12} />
                {errors.password}
              </span>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="auth-options">
            <label className="remember-me" id="remember-me-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="forgot-password"
              id="forgot-password-btn"
              onClick={() => addToast && addToast("Password reset coming soon!", "info")}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`auth-btn ${isLoading ? "loading" : ""}`}
            id="login-btn"
            disabled={isLoading}
          >
            {isLoading && <div className="auth-spinner" />}
            <span className="btn-text">
              <LogIn size={18} />
              Log In
            </span>
          </button>

          {/* Divider */}
          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or</span>
            <div className="auth-divider-line" />
          </div>

          {/* Footer Link */}
          <div className="auth-footer">
            <span className="auth-footer-text">
              Don't have an account?{" "}
              <Link to="/signup" className="auth-footer-link" id="goto-signup">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
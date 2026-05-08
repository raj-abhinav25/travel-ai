import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, UserPlus } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./AuthPages.css";

const SignupPage = ({ addToast }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return { level: 0, label: "", className: "" };

    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { level: 1, label: "Weak", className: "weak" };
    if (score <= 3) return { level: 2, label: "Medium", className: "medium" };
    return { level: 3, label: "Strong", className: "strong" };
  }, [formData.password]);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (formError) setFormError("");
  };

  // ✅ REPLACED - Now connected to Firebase Auth
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setFormError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Store initial profile data for the UI
      localStorage.setItem("wanderai_profile", JSON.stringify({
        name: formData.fullName,
        email: formData.email,
        photoUrl: ""
      }));

      // Show success message
      setShowSuccess(true);
      if (addToast) addToast("Account created successfully!", "success");

      // Redirect to login after signup
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setFormError('Email is already in use.');
      } else if (err.code === 'auth/weak-password') {
        setFormError('Password is too weak.');
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-layout page-enter" id="signup-page">
      {/* Animated Background */}
      <div className="auth-bg">
        <div className="auth-bg-overlay" />
      </div>
      <div className="auth-bg-orb auth-bg-orb--1" />
      <div className="auth-bg-orb auth-bg-orb--2" />
      <div className="auth-bg-orb auth-bg-orb--3" />

      {/* Glassmorphism Card */}
      <div className="auth-card" id="signup-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <div className="auth-logo-mark">W</div>
            <span className="auth-logo-text">WanderAI</span>
          </div>
          <p className="auth-tagline">Create your account</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="auth-success" id="signup-success">
            <CheckCircle size={18} className="auth-success-icon" />
            <span className="auth-success-text">
              Account created! Redirecting to login...
            </span>
          </div>
        )}

        {/* Error Toast */}
        {formError && (
          <div className="auth-error-toast" id="signup-error">
            <AlertCircle size={18} className="auth-error-icon" />
            <span className="auth-error-text">{formError}</span>
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSignup} id="signup-form" noValidate>
          {/* Full Name */}
          <div className="input-group">
            <label className="input-label" htmlFor="signup-name">Full Name</label>
            <div className="input-wrapper">
              <User size={16} className="input-icon" />
              <input
                type="text"
                id="signup-name"
                name="fullName"
                className={`input-field ${errors.fullName ? "error" : ""}`}
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
            {errors.fullName && (
              <span className="input-error" id="signup-name-error">
                <AlertCircle size={12} />
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="input-group">
            <label className="input-label" htmlFor="signup-email">Email</label>
            <div className="input-wrapper">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                id="signup-email"
                name="email"
                className={`input-field ${errors.email ? "error" : ""}`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <span className="input-error" id="signup-email-error">
                <AlertCircle size={12} />
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="input-group">
            <label className="input-label" htmlFor="signup-password">Password</label>
            <div className="input-wrapper">
              <Lock size={16} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="signup-password"
                name="password"
                className={`input-field input-field--password ${errors.password ? "error" : ""}`}
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                id="signup-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <span className="input-error" id="signup-password-error">
                <AlertCircle size={12} />
                {errors.password}
              </span>
            )}

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="password-strength" id="password-strength">
                <div className="strength-bars">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`strength-bar ${passwordStrength.level >= level
                          ? `active ${passwordStrength.className}`
                          : ""
                        }`}
                    />
                  ))}
                </div>
                <span className={`strength-text ${passwordStrength.className}`}>
                  {passwordStrength.label}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label className="input-label" htmlFor="signup-confirm-password">
              Confirm Password
            </label>
            <div className="input-wrapper">
              <Lock size={16} className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="signup-confirm-password"
                name="confirmPassword"
                className={`input-field input-field--password ${errors.confirmPassword ? "error" : ""}`}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                id="signup-confirm-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="input-error" id="signup-confirm-error">
                <AlertCircle size={12} />
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className={`auth-btn ${isLoading ? "loading" : ""}`}
            id="signup-btn"
            disabled={isLoading || showSuccess}
          >
            {isLoading && <div className="auth-spinner" />}
            <span className="btn-text">
              <UserPlus size={18} />
              Create Account
            </span>
          </button>

          {/* Footer Link */}
          <div className="auth-footer">
            <span className="auth-footer-text">
              Already have an account?{" "}
              <Link to="/login" className="auth-footer-link" id="goto-login">
                Log In
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
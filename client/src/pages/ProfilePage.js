import React, { useState, useEffect, useRef } from "react";
import { User, Mail, Camera, Save, X } from "lucide-react";
import "./ProfilePage.css";

const ProfilePage = ({ addToast }) => {
  const fileInputRef = useRef(null);
  
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    photoUrl: ""
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load profile from local storage if exists
    try {
      const stored = localStorage.getItem("wanderai_profile");
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse profile", e);
    }

    // Then fetch fresh data from backend
    const fetchProfile = async () => {
      const userId = localStorage.getItem("wanderai_userId");
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:5000/auth/user/${userId}`);
        if (response.ok) {
          const profileData = await response.json();
          const newProfile = {
            name: profileData.name,
            email: profileData.email,
            photoUrl: profileData.photoUrl || ""
          };
          setProfile(newProfile);
          localStorage.setItem("wanderai_profile", JSON.stringify(newProfile));
        }
      } catch (e) {
        console.error("Failed to fetch user profile", e);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    setIsEditing(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        if (addToast) addToast("Image must be smaller than 1MB", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, photoUrl: reader.result }));
        setIsEditing(true);
        if (addToast) addToast("Photo updated! Don't forget to save.", "info");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userId = localStorage.getItem("wanderai_userId");
      if (userId) {
        await fetch('http://localhost:5000/auth/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            name: profile.name,
            email: profile.email,
            photoUrl: profile.photoUrl
          })
        });
      }
      localStorage.setItem("wanderai_profile", JSON.stringify(profile));
      addToast("Profile updated successfully!", "success");
      setIsEditing(false);
    } catch (err) {
      addToast("Failed to update profile.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    try {
      const stored = localStorage.getItem("wanderai_profile");
      if (stored) {
        setProfile(JSON.parse(stored));
      } else {
        setProfile({ name: "", email: "", photoUrl: "" });
      }
    } catch (e) {}
    setIsEditing(false);
  };

  const initials = profile.name
    ? profile.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="profile-page page-enter">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-container">
            {profile.photoUrl ? (
              <img src={profile.photoUrl} alt="Profile" className="profile-avatar" />
            ) : (
              <div className="profile-avatar-placeholder">{initials}</div>
            )}
            
            <button 
              className="profile-camera-btn"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload photo"
            >
              <Camera size={16} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handlePhotoUpload} 
              accept="image/*" 
              style={{ display: "none" }} 
            />
          </div>
          
          <h1 className="profile-title">{profile.name || "Wanderer"}</h1>
          <p className="profile-subtitle">{profile.email || "Update your profile details below"}</p>
        </div>

        <div className="profile-content">
          <form className="profile-form" onSubmit={handleSave}>
            <div className="profile-form-group">
              <label className="profile-label" htmlFor="profile-name">Full Name</label>
              <div className="profile-input-wrapper">
                <User size={18} className="profile-input-icon" />
                <input
                  type="text"
                  id="profile-name"
                  name="name"
                  className="profile-input"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="profile-form-group">
              <label className="profile-label" htmlFor="profile-email">Email Address</label>
              <div className="profile-input-wrapper">
                <Mail size={18} className="profile-input-icon" />
                <input
                  type="email"
                  id="profile-email"
                  name="email"
                  className="profile-input"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {isEditing && (
              <div className="profile-actions animate-fade-in-up">
                <button 
                  type="button" 
                  className="profile-btn-cancel"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="profile-btn-save"
                  disabled={isLoading || (!profile.name && !profile.email)}
                >
                  {isLoading ? (
                     <div className="auth-spinner" style={{ position: "static", marginRight: "8px" }} />
                  ) : (
                    <Save size={16} />
                  )}
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

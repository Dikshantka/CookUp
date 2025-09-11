'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ email: '', password: '' });
  };

  if (isLoggedIn) {
    return (
      <div className="apple-page-container">
        {/* Subtle parallax background */}
        <div 
          className="apple-bg-layer"
          style={{
            transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`
          }}
        />
        
        <div className="apple-content">
          <div className="apple-profile-card">
            <div className="apple-logo-section">
              <div className="apple-avatar-large">
                {formData.email.charAt(0).toUpperCase()}
              </div>
              <h1 className="apple-welcome-text">Welcome back</h1>
              <p className="apple-email-text">{formData.email}</p>
            </div>
            
            <div className="apple-actions-grid">
              <Link href="/recipes" className="apple-action-card recipes-card">
                <div className="apple-card-icon">🍳</div>
                <h3>My Recipes</h3>
                <p>Discover your culinary creations</p>
              </Link>
              
              <Link href="/notes" className="apple-action-card notes-card">
                <div className="apple-card-icon">📝</div>
                <h3>My Notes</h3>
                <p>Your cooking insights and tips</p>
              </Link>
            </div>
            
            <button onClick={handleLogout} className="apple-logout-btn">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="apple-page-container">
      {/* Clean Apple-style background */}
      <div 
        className="apple-bg-layer"
        style={{
          transform: `translate(${mousePosition.x * 0.003}px, ${mousePosition.y * 0.003}px)`
        }}
      />
      
      <div className="apple-content">
        {/* Cook-Up Logo */}
        <div className="apple-header">
          <img 
            src="/images/Cook-Up Logo.png" 
            alt="Cook-Up" 
            className="apple-logo"
          />
        </div>
        
        {/* Clean Login Form */}
        <div className="apple-login-card">
          <h1 className="apple-title">Sign in to Cook-Up</h1>
          <p className="apple-subtitle">Enter your email and password to continue</p>
          
          <form onSubmit={handleSubmit} className="apple-form">
            <div className="apple-input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="apple-input"
              />
            </div>
            
            <div className="apple-input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="apple-input"
              />
            </div>
            
            <button type="submit" className="apple-signin-btn">
              Continue
            </button>
          </form>
          
          <div className="apple-divider">
            <span>or</span>
          </div>
          
          <div className="apple-signup-section">
            <p className="apple-signup-text">
              Don't have a Cook-Up account?
            </p>
            <Link href="/social" className="apple-signup-link">
              Create one now
            </Link>
          </div>
        </div>
        
        {/* Clean footer */}
        <div className="apple-footer">
          <p>Privacy Policy • Terms of Service</p>
        </div>
      </div>
    </div>
  );
}

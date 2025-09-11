'use client';

import Link from 'next/link';
import { useState } from 'react';

// Simple inline social login component
const SocialLoginPanel = ({ mode }: { mode: string }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Google Login */}
      <a 
        href="/api/auth/login?connection=google-oauth2"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '12px',
          background: '#fff',
          border: '2px solid #ddd',
          borderRadius: '8px',
          textDecoration: 'none',
          color: '#333',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{ fontSize: '18px' }}>🌐</span>
        Continue with Google
      </a>
      
      {/* GitHub Login */}
      <a 
        href="/api/auth/login?connection=github"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '12px',
          background: '#333',
          border: '2px solid #333',
          borderRadius: '8px',
          textDecoration: 'none',
          color: '#fff',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{ fontSize: '18px' }}>⚡</span>
        Continue with GitHub
      </a>
    </div>
  );
};

export default function SocialLoginPage() {
  const [showEmailLogin, setShowEmailLogin] = useState(false);

  return (
    <div className="box">
      {/* Main Content - Centered with Logo */}
      <main style={{ 
        padding: '60px 20px',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Logo */}
        <img 
          src="/images/Cook-Up Logo.png" 
          alt="Cook-Up Logo" 
          style={{ 
            width: '120px', 
            height: '120px',
            borderRadius: '50%',
            marginBottom: '30px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
          }}
        />
        
        <h1 style={{ 
          marginBottom: '15px',
          color: '#4CAF50' // Green color matching logo theme
        }}>
          Cook-Up
        </h1>
        
        <p style={{ 
          marginBottom: '30px',
          fontSize: '16px',
          color: '#66c909', // Lighter green from logo
          textAlign: 'center',
          fontWeight: '500'
        }}>
          Sign in to start cooking
        </p>
        
        {/* Login Options Container */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '30px 25px',
          borderRadius: '15px',
          boxShadow: '0 8px 25px rgba(76, 175, 80, 0.2)', // Green shadow to match logo
          maxWidth: '380px',
          width: '100%',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(76, 175, 80, 0.1)' // Subtle green border
        }}>
          
          {/* Toggle Buttons */}
          <div style={{
            display: 'flex',
            marginBottom: '20px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #e0e0e0'
          }}>
            <button
              onClick={() => setShowEmailLogin(false)}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                background: !showEmailLogin ? '#4CAF50' : '#f5f5f5',
                color: !showEmailLogin ? 'white' : '#666',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Social Login
            </button>
            <button
              onClick={() => setShowEmailLogin(true)}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                background: showEmailLogin ? '#4CAF50' : '#f5f5f5',
                color: showEmailLogin ? 'white' : '#666',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Email Login
            </button>
          </div>

          {/* Email/Password Login Form */}
          {showEmailLogin ? (
            <form action="/api/auth/login" method="post" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>
              
              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>
              
              <button
                type="submit"
                className="btn"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#45a049'}
                onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#4CAF50'}
              >
                Sign In
              </button>
              
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <a href="/api/auth/login?screen_hint=signup" style={{
                  color: '#4CAF50',
                  textDecoration: 'none',
                  fontSize: '14px'
                }}>
                  Create new account
                </a>
              </div>
            </form>
          ) : (
            /* Social Login Panel */
            <SocialLoginPanel mode="login" />
          )}
        </div>
        
        {/* Back to Home */}
        <Link href="/" style={{
          marginTop: '25px',
          color: '#4CAF50',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'color 0.3s ease'
        }}>
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}

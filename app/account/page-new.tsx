'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  name: string;
  email: string;
  picture: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by checking cookies or making an API call
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/profile');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.log('User not authenticated');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="box">
        <header>
          <img 
            src="/images/Cook-Up Logo.png" 
            alt="Cook-Up Logo" 
            style={{ maxWidth: '80px', height: 'auto' }}
          />
        </header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/recipes">Recipes</Link>
          <Link href="/notes">Notes</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/account" className="nav-active">Account</Link>
        </nav>
        <main style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h1>Loading...</h1>
        </main>
        <footer>
          <p>&copy; 2025 Cook-Up. All rights reserved.</p>
        </footer>
      </div>
    );
  }
  
  // If user is logged in, show their profile
  if (user) {
    return (
      <div className="box">
        <header>
          <img 
            src="/images/Cook-Up Logo.png" 
            alt="Cook-Up Logo" 
            style={{ maxWidth: '80px', height: 'auto' }}
          />
        </header>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/recipes">Recipes</Link>
          <Link href="/notes">Notes</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/account" className="nav-active">Account</Link>
        </nav>

        <main>
          <h1>Account Profile</h1>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 8px 25px rgba(76, 175, 80, 0.2)',
            maxWidth: '400px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <img src={user.picture} alt="Profile" style={{ borderRadius: '50%', width: 80, marginBottom: 16 }} />
            <p style={{ fontSize: '1.1rem', marginBottom: 8, color: '#333' }}><strong>Name:</strong> {user.name}</p>
            <p style={{ fontSize: '1.1rem', marginBottom: 24, color: '#333' }}><strong>Email:</strong> {user.email}</p>
            <a href="/api/auth/logout" style={{ 
              background: '#4CAF50', 
              color: '#fff', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              textDecoration: 'none', 
              fontWeight: 'bold',
              display: 'inline-block',
              transition: 'background-color 0.3s'
            }}>Log Out</a>
          </div>
        </main>

        <footer>
          <p>&copy; 2025 Cook-Up. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  // If user is not logged in, show login form
  return (
    <div className="box">
      <header>
        <img 
          src="/images/Cook-Up Logo.png" 
          alt="Cook-Up Logo" 
          style={{ maxWidth: '80px', height: 'auto' }}
        />
      </header>

      <nav>
        <Link href="/">Home</Link>
        <Link href="/recipes">Recipes</Link>
        <Link href="/notes">Notes</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/account" className="nav-active">Account</Link>
      </nav>

      <main style={{ 
        padding: '40px 20px',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{ marginBottom: '8px' }}>Welcome Back</h1>
        <p className="welcome-text" style={{ 
          marginBottom: '30px',
          fontSize: '16px'
        }}>
          Sign in to access your Cook-Up account
        </p>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '35px 30px',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(76, 175, 80, 0.15)',
          maxWidth: '400px',
          width: '100%',
          margin: '0 auto',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(102, 201, 9, 0.1))',
            borderRadius: '50%',
            zIndex: 0
          }}></div>
          
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, rgba(102, 201, 9, 0.1), rgba(76, 175, 80, 0.1))',
            borderRadius: '50%',
            zIndex: 0
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Login Form */}
            <form action="/api/auth/login" method="post" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="input-box" style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '16px',
                    border: '2px solid rgba(76, 175, 80, 0.2)',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    background: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4CAF50';
                    e.target.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(76, 175, 80, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <span style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#4CAF50',
                  fontSize: '18px'
                }}>👤</span>
              </div>
              
              <div className="input-box" style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '16px',
                    border: '2px solid rgba(76, 175, 80, 0.2)',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    background: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4CAF50';
                    e.target.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(76, 175, 80, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <span style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#4CAF50',
                  fontSize: '18px'
                }}>🔒</span>
              </div>
              
              <button
                type="submit"
                className="btn"
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'linear-gradient(135deg, #4CAF50, #66c909)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginBottom: '15px',
                  boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                Sign In
              </button>
            </form>
            
            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '20px 0',
            }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.3), transparent)' }}></div>
              <span style={{ 
                margin: '0 20px', 
                color: '#4CAF50', 
                fontSize: '14px', 
                fontWeight: '500'
              }}>
                OR
              </span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.3), transparent)' }}></div>
            </div>
            
            {/* Sign Up Button */}
            <Link 
              href="/social"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '15px',
                background: 'linear-gradient(135deg, #66c909, #4CAF50)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                boxShadow: '0 4px 15px rgba(102, 201, 9, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              <span>✨</span>
              Create Account
            </Link>
            
            {/* Help text */}
            <p style={{
              textAlign: 'center',
              marginTop: '20px',
              fontSize: '13px',
              color: '#666',
              lineHeight: '1.4'
            }}>
              New to Cook-Up? Create an account to start sharing your favorite recipes!
            </p>
          </div>
        </div>
      </main>

      <footer>
        <p>&copy; 2025 Cook-Up. All rights reserved.</p>
      </footer>
    </div>
  );
}

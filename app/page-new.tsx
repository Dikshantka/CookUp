'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
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

  return (
    <div className={`box parallax-container ${isVisible ? 'fade-in' : ''}`}>
      {/* Parallax Background Layers */}
      <div 
        className="parallax-layer layer-1"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
        }}
      />
      <div 
        className="parallax-layer layer-2"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      />
      <div 
        className="parallax-layer layer-3"
        style={{
          transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
        }}
      />

      {/* Header */}
      <header className="slide-up">
        <img 
          src="/images/Cook-Up Logo.png" 
          alt="Cook-Up Logo" 
          style={{ maxWidth: '80px', height: 'auto' }}
          className="bounce-in"
        />
      </header>

      {/* Navigation */}
      <nav className="slide-in-left">
        <Link href="/" className="hover-lift">Home</Link>
        <Link href="/recipes" className="hover-lift">Recipes</Link>
        <Link href="/notes" className="hover-lift">Notes</Link>
        <Link href="/contact" className="hover-lift">Contact</Link>
        <Link href="/account" className="hover-lift">Account</Link>
      </nav>

      {/* Main Content */}
      <main className="scale-in">
        <h1 className="glow-effect">Welcome to Cook-Up</h1>
        <p className="welcome-text fade-in-delayed">
          Discover and share amazing recipes with the world
        </p>
        <Link href="/social" className="hover-lift pulse-on-hover">
          <span>Get Started</span>
          <div className="btn-ripple"></div>
        </Link>
      </main>

      {/* Footer */}
      <footer className="slide-in-right">
        <p>&copy; 2024 Cook-Up. Bringing flavors to life.</p>
      </footer>
    </div>
  );
}

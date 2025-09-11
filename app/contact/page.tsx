
"use client";
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to an API or email service
  }

  return (
    <main style={{
      maxWidth: 420,
      margin: '60px auto',
      padding: 32,
      background: 'linear-gradient(135deg, #f8fafc 0%, #ede9fe 100%)',
      borderRadius: 18,
      boxShadow: '0 4px 32px #e0e7ff',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', color: '#7c3aed', marginBottom: 8, fontWeight: 700 }}>Contact Us</h1>
      <p style={{ color: '#555', marginBottom: 28, fontSize: '1.08rem' }}>
        We'd love to hear from you! Fill out the form below and we'll get back to you soon.
      </p>
      {submitted ? (
        <div style={{ color: '#22c55e', fontWeight: 600, fontSize: '1.1rem', marginTop: 32 }}>
          Thank you for contacting us!<br />We'll reply as soon as possible.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <input name="name" placeholder="Your Name" required style={inputStyle} />
          <input name="email" type="email" placeholder="Your Email" required style={inputStyle} />
          <textarea name="message" placeholder="Your Message" required style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} />
          <button type="submit" style={buttonStyle}>Send Message</button>
        </form>
      )}
    </main>
  );
}

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  fontSize: '1rem',
  outline: 'none',
  background: '#fff',
  boxShadow: '0 1px 4px #e0e7ff',
};

const buttonStyle = {
  background: 'linear-gradient(90deg, #7c3aed 0%, #6366f1 100%)',
  color: '#fff',
  padding: '12px 0',
  borderRadius: '8px',
  border: 'none',
  fontWeight: 700,
  fontSize: '1.08rem',
  boxShadow: '0 2px 8px #e0e7ff',
  cursor: 'pointer',
  marginTop: '8px',
  transition: 'background 0.2s',
};

'use client';

import { useState } from 'react';
import { SocialLoginPanel } from '../../src/components/auth/SocialLoginPanel';
import { formStyles, containerStyles } from '../../src/styles/socialLogin';

export default function RegisterClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! You can now log in.');
        setEmail('');
        setPassword('');
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={formStyles.container}>
      <div style={containerStyles.header}>
        <h1 style={containerStyles.title}>Create Your Account</h1>
        <p style={containerStyles.subtitle}>
          Join CookUp to discover and share amazing recipes
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={formStyles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={formStyles.input}
        />

        <button
          type="submit"
          disabled={isLoading}
          style={{
            ...formStyles.button,
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        {error && (
          <div style={{ color: '#dc3545', fontSize: 14, marginTop: 12, textAlign: 'center' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ color: '#28a745', fontSize: 14, marginTop: 12, textAlign: 'center' }}>
            {success}
          </div>
        )}
      </form>

      <SocialLoginPanel mode="register" />
    </div>
  );
}

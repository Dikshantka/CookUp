'use client';

import { useState } from 'react';
import { SocialLoginPanel } from '../../src/components/auth/SocialLoginPanel';

interface TestResult {
  provider: string;
  timestamp: string;
  status: 'success' | 'error';
  message: string;
}

export default function TestSocialPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const handleProviderTest = (provider: string, connection: string) => {
    const timestamp = new Date().toLocaleTimeString();
    
    // Simulate testing the provider
    const result: TestResult = {
      provider,
      timestamp,
      status: 'success',
      message: `${provider} login flow initiated successfully`
    };
    
    setTestResults(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
    
    // You could add actual testing logic here
    console.log(`Testing ${provider} with connection ${connection}`);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            🧪 Social Login Testing
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '1.1rem'
          }}>
            Test all social authentication providers
          </p>
        </div>

        {/* Social Login Panel */}
        <div style={{ marginBottom: '2rem' }}>
          <SocialLoginPanel 
            mode="test" 
            onProviderClick={handleProviderTest}
          />
        </div>

        {/* Test Results */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937'
            }}>
              Test Results
            </h2>
            {testResults.length > 0 && (
              <button
                onClick={clearResults}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#dc2626'}
                onMouseOut={(e) => e.currentTarget.style.background = '#ef4444'}
              >
                Clear Results
              </button>
            )}
          </div>

          <div style={{
            background: '#f9fafb',
            borderRadius: '8px',
            padding: '1rem',
            minHeight: '200px',
            maxHeight: '400px',
            overflowY: 'auto',
            border: '1px solid #e5e7eb'
          }}>
            {testResults.length === 0 ? (
              <div style={{
                textAlign: 'center',
                color: '#6b7280',
                padding: '2rem',
                fontStyle: 'italic'
              }}>
                Click on any social login button above to start testing...
              </div>
            ) : (
              <div>
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'white',
                      padding: '1rem',
                      borderRadius: '6px',
                      marginBottom: '0.5rem',
                      border: `1px solid ${result.status === 'success' ? '#10b981' : '#ef4444'}`,
                      borderLeft: `4px solid ${result.status === 'success' ? '#10b981' : '#ef4444'}`
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{
                        fontWeight: 'bold',
                        color: '#1f2937',
                        textTransform: 'capitalize'
                      }}>
                        {result.provider}
                      </span>
                      <span style={{
                        fontSize: '0.8rem',
                        color: '#6b7280'
                      }}>
                        {result.timestamp}
                      </span>
                    </div>
                    <div style={{
                      color: result.status === 'success' ? '#10b981' : '#ef4444',
                      fontSize: '0.9rem'
                    }}>
                      {result.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '1rem',
          background: '#f3f4f6',
          borderRadius: '8px'
        }}>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            🔧 <strong>Using New Modular Components:</strong> SocialLoginPanel from src/components/auth/
          </p>
        </div>
      </div>
    </div>
  );
}

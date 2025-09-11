import React from 'react';

interface SocialLoginPanelProps {
  onSocialLogin?: (provider: string) => void;
  className?: string;
}

export const SocialLoginPanel: React.FC<SocialLoginPanelProps> = ({ 
  onSocialLogin,
  className 
}) => {
  const handleSocialLogin = (provider: string) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <div className={`social-login-panel ${className || ''}`}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px',
        marginTop: '16px'
      }}>
        <button
          onClick={() => handleSocialLogin('google')}
          style={{
            padding: '12px 16px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            backgroundColor: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          Continue with Google
        </button>
        <button
          onClick={() => handleSocialLogin('github')}
          style={{
            padding: '12px 16px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            backgroundColor: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};
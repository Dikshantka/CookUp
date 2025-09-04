/**
 * Home Page Component
 * 
 * Landing page with authentication links and app description.
 * Provides entry points for login/logout and navigation to protected areas.
 */

export default async function HomePage() {
  return (
    <main style={{ 
      padding: 40, 
      maxWidth: 800, 
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: 16,
        color: '#333'
      }}>
        🔐 Secure Notes App
      </h1>
      
      <p style={{ 
        fontSize: '1.2rem', 
        color: '#666',
        marginBottom: 32,
        lineHeight: 1.6
      }}>
        A secure note-taking application built with Next.js, Auth0 authentication, and MongoDB.
        <br />
        Your notes are protected and only accessible to you.
      </p>

      {/* Authentication Links */}
      <div style={{ 
        display: 'flex', 
        gap: 16, 
        justifyContent: 'center',
        marginBottom: 32
      }}>
        <a 
          href="/api/auth/login"
          style={{
            padding: '12px 24px',
            backgroundColor: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: 8,
            fontWeight: 500,
            transition: 'background-color 0.2s'
          }}
        >
          🚀 Log In
        </a>
        <a 
          href="/api/auth/logout"
          style={{
            padding: '12px 24px',
            backgroundColor: '#f5f5f5',
            color: '#333',
            textDecoration: 'none',
            borderRadius: 8,
            border: '1px solid #ddd',
            fontWeight: 500,
            transition: 'background-color 0.2s'
          }}
        >
          👋 Log Out
        </a>
      </div>

      {/* Feature Links */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: 12,
        alignItems: 'center'
      }}>
        <p style={{ color: '#666', fontSize: '1rem' }}>
          After logging in, try these features:
        </p>
        
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a 
            href="/api/auth/profile" 
            target="_blank" 
            rel="noreferrer"
            style={{
              padding: '8px 16px',
              backgroundColor: '#f0f9ff',
              color: '#0369a1',
              textDecoration: 'none',
              borderRadius: 6,
              border: '1px solid #bae6fd',
              fontSize: '0.9rem'
            }}
          >
            👤 View Profile
          </a>
          
          <a 
            href="/notes"
            style={{
              padding: '8px 16px',
              backgroundColor: '#f0fdf4',
              color: '#166534',
              textDecoration: 'none',
              borderRadius: 6,
              border: '1px solid #bbf7d0',
              fontSize: '0.9rem'
            }}
          >
            📝 My Notes
          </a>
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{ 
        marginTop: 48,
        padding: 24,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ color: '#334155', marginBottom: 16 }}>
          🛠️ Built With
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: 12, 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {['Next.js 15', 'Auth0', 'MongoDB', 'TypeScript', 'Vercel'].map((tech) => (
            <span 
              key={tech}
              style={{
                padding: '6px 12px',
                backgroundColor: 'white',
                color: '#475569',
                borderRadius: 6,
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}


/**
 * Notes Client Component
 * 
 * Interactive React component for managing personal notes.
 * Provides functionality to create, view, and refresh notes.
 * Handles API communication and error states.
 */

'use client';

import { useEffect, useState } from 'react';

// Type definition for note objects
interface Note {
  _id: string;
  text: string;
  userId: string;
  createdAt: string;
}

export default function NotesClient() {
  // Component state management
  const [text, setText] = useState(''); // Input field text
  const [notes, setNotes] = useState<Note[]>([]); // List of notes
  const [error, setError] = useState<string>(''); // Error message display
  const [loading, setLoading] = useState(false); // Loading state for better UX

  /**
   * Loads notes from the API
   * Fetches all notes for the authenticated user
   */
  async function loadNotes() {
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch('/api/notes', { 
        cache: 'no-store' // Ensure fresh data on each request
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch notes (${res.status})`);
      }
      
      const data = await res.json();
      setNotes(data);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to load notes';
      setError(message);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Adds a new note
   * Validates input and sends POST request to API
   */
  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    
    // Validate input
    if (!text.trim()) {
      setError('Please enter some text for your note');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Failed to create note (${res.status})`);
      }
      
      // Clear input and refresh notes list
      setText('');
      await loadNotes();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to add note';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  // Load notes when component mounts
  useEffect(() => { 
    loadNotes(); 
  }, []);

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 24 }}>My Secure Notes</h1>
      
      {/* Error display */}
      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#fee', 
          padding: 12, 
          borderRadius: 4, 
          marginBottom: 16 
        }}>
          {error}
        </div>
      )}

      {/* Note creation form */}
      <form onSubmit={addNote} style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your note here..."
            style={{ 
              padding: 12, 
              minWidth: 300, 
              minHeight: 80,
              flex: 1,
              borderRadius: 4,
              border: '1px solid #ccc',
              fontSize: 14,
              fontFamily: 'inherit'
            }}
            disabled={loading}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button 
              type="submit" 
              disabled={loading || !text.trim()}
              style={{
                padding: '12px 20px',
                backgroundColor: loading ? '#ccc' : '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: 14
              }}
            >
              {loading ? 'Adding...' : 'Add Note'}
            </button>
            <button 
              type="button" 
              onClick={loadNotes}
              disabled={loading}
              style={{
                padding: '12px 20px',
                backgroundColor: '#f5f5f5',
                color: '#333',
                border: '1px solid #ccc',
                borderRadius: 4,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: 14
              }}
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
      </form>

      {/* Notes list */}
      <div>
        <h2 style={{ marginBottom: 16 }}>Your Notes ({notes.length})</h2>
        
        {loading && notes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 20, color: '#666' }}>
            Loading your notes...
          </div>
        ) : notes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 20, color: '#666' }}>
            No notes yet. Create your first note above!
          </div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {notes.map((note) => (
              <li 
                key={note._id}
                style={{
                  backgroundColor: '#f9f9f9',
                  padding: 16,
                  marginBottom: 12,
                  borderRadius: 8,
                  border: '1px solid #e0e0e0'
                }}
              >
                <div style={{ 
                  whiteSpace: 'pre-wrap', 
                  marginBottom: 8,
                  lineHeight: 1.5 
                }}>
                  {note.text}
                </div>
                <div style={{ 
                  fontSize: 12, 
                  color: '#666',
                  textAlign: 'right'
                }}>
                  {new Date(note.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
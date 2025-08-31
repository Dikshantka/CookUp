'use client';

import { useEffect, useState } from 'react';

export default function NotesClient() {
  const [text, setText] = useState('');
  const [notes, setNotes] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  async function load() {
    setError('');
    try {
      const res = await fetch('/api/notes', { cache: 'no-store' });
      if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
      const data = await res.json();
      setNotes(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load notes');
      setNotes([]);
    }
  }

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      const msg = await res.text();
      setError(msg || `Post failed (${res.status})`);
      return;
    }
    setText('');
    await load();
  }

  useEffect(() => { load(); }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>My Notes</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={addNote} style={{ marginTop: 12 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note…"
          style={{ padding: 8, minWidth: 280, marginRight: 8 }}
        />
        <button type="submit">Add</button>
        <button type="button" onClick={load} style={{ marginLeft: 8 }}>
          Refresh
        </button>
      </form>

      <ul style={{ marginTop: 24 }}>
        {notes.map((n) => (
          <li key={n._id}>{n.text}</li>
        ))}
      </ul>
    </main>
  );
}
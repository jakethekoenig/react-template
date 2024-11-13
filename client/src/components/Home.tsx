import { useState, useEffect } from 'react';

interface Note {
  id: number;
  content: string;
  timestamp: string;
}

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const response = await fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newNote }),
      });

      if (response.ok) {
        setNewNote('');
        fetchNotes();
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="page">
      <h1>Notes</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', width: '100%' }}>
        <input
          type="text"
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          placeholder="Enter a new note..."
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '0.5rem',
            fontSize: '1rem',
          }}
        />
        <button type="submit">Add Note</button>
      </form>

      <div style={{ width: '100%' }}>
        {notes.map(note => (
          <div
            key={note.id}
            style={{
              padding: '1rem',
              marginBottom: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          >
            <p>{note.content}</p>
            <small style={{ color: '#666' }}>{new Date(note.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

import { useState, useEffect } from 'react';

interface Note {
  id: number;
  content: string;
  timestamp: string;
}

const Note = ({ note, onDelete }: { note: Note; onDelete: (id: number) => void }) => (
  <div key={note.id} className="card">
    <div style={{ flex: '1', marginRight: '1rem' }}>
      <p>{note.content}</p>
      <p className="info">{new Date(note.timestamp).toLocaleString()}</p>
    </div>
    <button onClick={() => onDelete(note.id)} className="delete-button">
      Delete
    </button>
  </div>
);

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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchNotes();
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="page">
      <h1>Bulletin Board</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
        }}
      >
        <input
          type="text"
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          placeholder="What's on your mind?"
          style={{ flex: '1' }}
        />
        <button type="submit" className="button">
          Add Note
        </button>
      </form>

      <hr style={{ width: '100%', marginBottom: '2rem' }} />

      <div style={{ width: '100%' }}>
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Home;

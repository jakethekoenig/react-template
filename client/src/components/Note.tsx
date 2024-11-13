interface NoteProps {
  id: number;
  content: string;
  timestamp: string;
  onDelete: (id: number) => void;
}

const Note = ({ id, content, timestamp, onDelete }: NoteProps) => {
  return (
    <div
      style={{
        padding: '1rem',
        marginBottom: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <p>{content}</p>
        <small style={{ color: '#666' }}>{new Date(timestamp).toLocaleString()}</small>
      </div>
      <button
        onClick={() => onDelete(id)}
        style={{
          background: '#ff4444',
          color: 'white',
          border: 'none',
          padding: '0.5rem',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Note;

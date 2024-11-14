import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(20, 20, 20, 0.7)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        <Link to="/">Bulletin Board</Link>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '2rem',
        }}
      >
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;

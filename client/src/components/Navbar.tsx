import { Link } from "react-router-dom";

const navbarStyles = {
  container: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
  },
  links: {
    display: "flex",
    gap: "2rem",
  },
};

const Navbar = () => {
  return (
    <nav style={navbarStyles.container}>
      <div style={navbarStyles.title}>
        <Link to="/">Website</Link>
      </div>
      <div style={navbarStyles.links}>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;

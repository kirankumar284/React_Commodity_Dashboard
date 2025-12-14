import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        📊 <span>Commodity Dashboard</span>
      </div>

      <div className="nav-links">
        <NavLink to="/" className="nav-btn">
          Home
        </NavLink>
        <NavLink to="/dashboard" className="nav-btn">
          Dashboard
        </NavLink>
      </div>
    </nav>
  );
}

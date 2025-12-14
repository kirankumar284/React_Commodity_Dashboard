import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="hero">
        <h1>Welcome to the Commodity Prices Dashboard</h1>
        <p>
          Monitor commodity price trends over the last 30 days. Select
          commodities, visualize data, and gain market insights instantly.
        </p>
        <button className="primary-btn" onClick={() => navigate("/dashboard")}>
          Explore Dashboard
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const API_KEY = "demo"; // replace with real key

const COMMODITY_API_MAP = {
  "Natural Gas": "NATURAL_GAS",
  Copper: "COPPER",
  Aluminium: "ALUMINUM",
  Wheat: "WHEAT",
  Corn: "CORN",
  Cotton: "COTTON",
  Sugar: "SUGAR",
  Coffee: "COFFEE",
};

const FREQUENCY_OPTIONS = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

export default function Dashboard() {
  const [commodity, setCommodity] = useState("Natural Gas");
  const [frequency, setFrequency] = useState("monthly");
  const [prices, setPrices] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCommodityData = async () => {
    setLoading(true);
    setError("");

    try {
      const functionName = COMMODITY_API_MAP[commodity];

      const response = await fetch(
        `https://www.alphavantage.co/query?function=${functionName}&interval=${frequency}&apikey=${API_KEY}`
      );

      const data = await response.json();

      if (!data.data) {
        throw new Error("API limit reached or invalid response");
      }

      const sliceCount = getSliceCount(frequency);

      // Alpha Vantage data comes latest first
      const slicedData = data.data.slice(0, sliceCount).reverse();

      setLabels(slicedData.map((item) => item.date));
      setPrices(slicedData.map((item) => Number(item.value)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSliceCount = (frequency) => {
    if (frequency === "daily") return 30; // last 30 days
    if (frequency === "weekly") return 12; // last 12 weeks (~3 months)
    if (frequency === "monthly") return 12; // last 12 months
    return 30;
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: `${commodity} (${frequency})`,
        data: prices,
        backgroundColor: "#f9c74f",
      },
    ],
  };

  useEffect(() => {
    fetchCommodityData();
  }, [commodity, frequency]);

  return (
    <div className="dashboard-container">
      <h1>Commodity Price Dashboard</h1>

      {/* Filters */}
      <div className="dashboard-controls">
        <div className="filters-left">
          <div className="filter-item">
            <label>Commodity</label>
            <select
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
            >
              {Object.keys(COMMODITY_API_MAP).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              {FREQUENCY_OPTIONS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="primary-btn" onClick={fetchCommodityData}>
          Fetch Data
        </button>
      </div>

      {/* Status */}
      {loading && <p>Loading data...</p>}
      {error && <p className="error">{error}</p>}

      {/* Chart */}
      {prices.length > 0 && !loading && (
        <div className="chart-container">
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
}

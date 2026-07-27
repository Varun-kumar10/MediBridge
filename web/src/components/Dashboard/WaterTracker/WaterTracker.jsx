import "./WaterTracker.css";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

function WaterTracker() {
  const current = 1.8;
  const goal = 3;
  const percentage = (current / goal) * 100;

  return (
    <div className="water-card">
      <div className="water-header">
        <h2>💧 Water Tracker</h2>
        <WaterDropIcon />
      </div>

      <h1>{current}L</h1>

      <p>Goal: {goal}L Today</p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <span>{Math.round(percentage)}% Completed</span>
    </div>
  );
}

export default WaterTracker;
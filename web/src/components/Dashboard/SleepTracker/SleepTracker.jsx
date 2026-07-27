import "./SleepTracker.css";
import BedtimeIcon from "@mui/icons-material/Bedtime";

function SleepTracker() {
  const slept = 7.5;
  const goal = 8;
  const percentage = (slept / goal) * 100;

  return (
    <div className="sleep-card">
      <div className="sleep-header">
        <h2>😴 Sleep Tracker</h2>
        <BedtimeIcon />
      </div>

      <h1>{slept} hrs</h1>

      <p>Goal: {goal} hrs</p>

      <div className="sleep-progress">
        <div
          className="sleep-progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <span>{Math.round(percentage)}% Sleep Goal</span>
    </div>
  );
}

export default SleepTracker;
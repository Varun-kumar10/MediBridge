import "./AIAssistant.css";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BedtimeIcon from "@mui/icons-material/Bedtime";

function AIAssistant() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="ai-card">

      <div className="ai-header">
        <SmartToyIcon className="ai-icon" />
        <h2>AI Health Assistant</h2>
      </div>

      <h3>
        Hello, {user?.full_name || "Patient"} 👋
      </h3>

      <p className="ai-subtitle">
        Here are today's AI health suggestions
      </p>

      <div className="ai-tip">
        <WaterDropIcon />
        <span>Drink 500ml more water today.</span>
      </div>

      <div className="ai-tip">
        <FavoriteIcon />
        <span>Your heart rate looks normal.</span>
      </div>

      <div className="ai-tip">
        <BedtimeIcon />
        <span>Try to sleep before 11 PM tonight.</span>
      </div>

      <button className="ai-button">
        Chat with AI
      </button>

    </div>
  );
}

export default AIAssistant;
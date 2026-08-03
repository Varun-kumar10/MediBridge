import "./SummaryCards.css";

import { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import MedicationIcon from "@mui/icons-material/Medication";

import { getDashboardSummary } from "../../../services/dashboardService";

function SummaryCards() {

  const [summary, setSummary] = useState({
    heartRate: "--",
    waterIntake: 0,
    sleepHours: 0,
    medicineCount: 0,
  });

  useEffect(() => {

    const fetchSummary = async () => {

      try {

        const response = await getDashboardSummary();

        setSummary(response.summary);

      } catch (error) {

        console.error(error);

      }

    };

    fetchSummary();

  }, []);

  const cards = [
    {
      title: "Heart Rate",
      value: `${summary.heartRate} BPM`,
      icon: <FavoriteIcon />,
      color: "#ef4444",
    },
    {
      title: "Water Intake",
      value: `${summary.waterIntake} ml`,
      icon: <WaterDropIcon />,
      color: "#3b82f6",
    },
    {
      title: "Sleep",
      value: `${summary.sleepHours} hrs`,
      icon: <BedtimeIcon />,
      color: "#8b5cf6",
    },
    {
      title: "Medicines",
      value: `${summary.medicineCount} Today`,
      icon: <MedicationIcon />,
      color: "#10b981",
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, index) => (
        <div className="summary-card" key={index}>
          <div
            className="card-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div className="card-content">
            <h4>{card.title}</h4>
            <h2>{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
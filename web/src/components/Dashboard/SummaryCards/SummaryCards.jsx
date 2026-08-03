import "./SummaryCards.css";

import { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import MedicationIcon from "@mui/icons-material/Medication";

import { getHeartRate } from "../../../services/healthService";

function SummaryCards() {

  const [heartRate, setHeartRate] = useState("--");

  useEffect(() => {

    const fetchHeartRate = async () => {

      try {

        const response = await getHeartRate();

        setHeartRate(response.heartRate);

      } catch (error) {

        console.error("Heart Rate Error:", error);

      }

    };

    fetchHeartRate();

  }, []);

  const cards = [
    {
      title: "Heart Rate",
      value: `${heartRate} BPM`,
      icon: <FavoriteIcon />,
      color: "#ef4444",
    },
    {
      title: "Water Intake",
      value: "1.8 / 3 L",
      icon: <WaterDropIcon />,
      color: "#3b82f6",
    },
    {
      title: "Sleep",
      value: "7h 30m",
      icon: <BedtimeIcon />,
      color: "#8b5cf6",
    },
    {
      title: "Medicines",
      value: "3 Today",
      icon: <MedicationIcon />,
      color: "#10b981",
    },
  ];

  return (
    <div className="summary-cards">

      {cards.map((card, index) => (

        <div
          className="summary-card"
          key={index}
        >

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
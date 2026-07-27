import "./AppointmentCard.css";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";

function AppointmentCard() {
  return (
    <div className="appointment-card">
      <h2>📅 Upcoming Appointment</h2>

      <div className="doctor-info">
        <PersonIcon />

        <div>
          <h3>Dr. Ramesh Kumar</h3>
          <p>Cardiologist</p>
        </div>
      </div>

      <div className="appointment-details">
        <div>
          <CalendarMonthIcon />
          <span>28 July 2026</span>
        </div>

        <div>
          <AccessTimeIcon />
          <span>10:30 AM</span>
        </div>
      </div>

      <button>Join Meeting</button>
    </div>
  );
}

export default AppointmentCard;
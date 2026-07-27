import "./EmergencySOS.css";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CallIcon from "@mui/icons-material/Call";

function EmergencySOS() {
  return (
    <div className="sos-card">

      <div className="sos-header">
        <h2>🚨 Emergency SOS</h2>
        <WarningAmberIcon />
      </div>

      <p className="sos-text">
        Need immediate medical assistance?
      </p>

      <button className="sos-button">
        <CallIcon />
        Call Emergency
      </button>

      <div className="nearest-hospital">
        <LocalHospitalIcon />
        <span>Nearest Hospital: City Care Hospital</span>
      </div>

    </div>
  );
}

export default EmergencySOS;
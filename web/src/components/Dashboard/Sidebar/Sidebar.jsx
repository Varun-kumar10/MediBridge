import "./Sidebar.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DescriptionIcon from "@mui/icons-material/Description";
import MedicationIcon from "@mui/icons-material/Medication";
import EventIcon from "@mui/icons-material/Event";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <LocalHospitalIcon className="logo-icon" />
        <h2>MediBridge</h2>
      </div>

      <nav className="sidebar-menu">

        <div className="menu-item active">
          <DashboardIcon />
          <span>Dashboard</span>
        </div>

        <div className="menu-item">
          <SmartToyIcon />
          <span>AI Assistant</span>
        </div>

        <div className="menu-item">
          <DescriptionIcon />
          <span>Reports</span>
        </div>

        <div className="menu-item">
          <MedicationIcon />
          <span>Medicine</span>
        </div>

        <div className="menu-item">
          <EventIcon />
          <span>Appointments</span>
        </div>

        <div className="menu-item">
          <AnalyticsIcon />
          <span>Analytics</span>
        </div>

        <div className="menu-item">
          <SettingsIcon />
          <span>Settings</span>
        </div>

      </nav>

      <div className="logout-section">

        <div className="menu-item logout">

          <LogoutIcon />

          <span>Logout</span>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;
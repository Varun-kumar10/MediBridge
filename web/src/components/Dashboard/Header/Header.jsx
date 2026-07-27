import "./Header.css";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="dashboard-header">

      <div className="header-left">

        <h1>
          Welcome Back, {user?.full_name} 👋
        </h1>

        <p>
          Stay healthy and have a wonderful day!
        </p>

      </div>

      <div className="header-right">

        <div className="header-icon">
          <NotificationsNoneIcon />
        </div>

        <div className="header-icon">
          <DarkModeOutlinedIcon />
        </div>

        <div className="profile">

          <div className="profile-avatar">
            {user?.full_name?.charAt(0)}
          </div>

          <div className="profile-info">

            <span>{user?.full_name}</span>

            <small>Patient</small>

          </div>

          <KeyboardArrowDownIcon />

        </div>

      </div>

    </header>
  );
}

export default Header;
import React from "react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        background: "#f5f7fb",
      }}
    >
      <h1>🏥 MediBridge Dashboard</h1>

      <h2>Welcome, {user?.full_name || "User"} 👋</h2>

      <p>{user?.email || "No email available"}</p>
    </div>
  );
}

export default Dashboard;
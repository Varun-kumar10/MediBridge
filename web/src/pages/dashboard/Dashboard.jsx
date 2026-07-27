import "./Dashboard.css";

import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import Header from "../../components/Dashboard/Header/Header";
import SummaryCards from "../../components/Dashboard/SummaryCards/SummaryCards";
import AIAssistant from "../../components/Dashboard/AIAssistant/AIAssistant";
import ReportCard from "../../components/Dashboard/ReportCard/ReportCard";
import AppointmentCard from "../../components/Dashboard/AppointmentCard/AppointmentCard";
import RecentReports from "../../components/Dashboard/ReportCard/RecentReports";
import WaterTracker from "../../components/Dashboard/WaterTracker/WaterTracker";
import SleepTracker from "../../components/Dashboard/SleepTracker/SleepTracker";
import MedicineReminder from "../../components/Dashboard/MedicineReminder/MedicineReminder";
import EmergencySOS from "../../components/Dashboard/EmergencySOS/EmergencySOS";

function Dashboard() {
  return (
    <>
      <Sidebar />

      <div className="dashboard-container">

        <Header />

        <SummaryCards />

        {/* AI Assistant + Weekly Chart */}
        <div className="dashboard-grid">

          <AIAssistant />

          <ReportCard />

        </div>

        {/* Appointment + Recent Reports */}
        <div className="dashboard-bottom-grid">

          <AppointmentCard />

          <RecentReports />
           <WaterTracker />
             <SleepTracker />
                <MedicineReminder />
                  <EmergencySOS />

        </div>

      </div>
    </>
  );
}

export default Dashboard;
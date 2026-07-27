import "./RecentReports.css";

import DescriptionIcon from "@mui/icons-material/Description";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function RecentReports() {
  const reports = [
    {
      title: "Blood Test",
      date: "25 Jul 2026",
    },
    {
      title: "ECG Report",
      date: "20 Jul 2026",
    },
    {
      title: "Chest X-Ray",
      date: "18 Jul 2026",
    },
  ];

  return (
    <div className="recent-reports">
      <h2>📄 Recent Medical Reports</h2>

      {reports.map((report, index) => (
        <div className="report-item" key={index}>
          <div className="report-left">
            <DescriptionIcon />

            <div>
              <h4>{report.title}</h4>
              <p>{report.date}</p>
            </div>
          </div>

          <ArrowForwardIosIcon fontSize="small" />
        </div>
      ))}
    </div>
  );
}

export default RecentReports;
import "./ReportCard.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", health: 72 },
  { day: "Tue", health: 75 },
  { day: "Wed", health: 80 },
  { day: "Thu", health: 82 },
  { day: "Fri", health: 88 },
  { day: "Sat", health: 90 },
  { day: "Sun", health: 92 },
];

function ReportCard() {
  return (
    <div className="report-card">
      <div className="report-header">
        <h2>📈 Weekly Health Progress</h2>
        <span>This Week</span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="health"
            stroke="#0f4c81"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ReportCard;
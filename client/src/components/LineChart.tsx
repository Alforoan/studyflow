import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  day: string;
  value: number;
}

const data: DataPoint[] = [
  { day: "Monday", value: 2 },
  { day: "Tuesday", value: 5.5 },
  { day: "Wednesday", value: 2 },
  { day: "Thursday", value: 8.5 },
  { day: "Friday", value: 1.5 },
  { day: "Saturday", value: 5 },
  {day: "Sunday", value: 6}
];

const MyLineChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart
      data={data}
      margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
    >
      <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export default MyLineChart;

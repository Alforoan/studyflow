import React from "react";
import {
  // LineChart,
  BarChart,
  // Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar
} from "recharts";

interface DataPoint {
  type: string;
  value: number | string;
}

interface MyLineChartProps {
  type: string;
  userAnalytics: {
    numberOfBoards: number;
    numberOfCards: number;
    // totalTimeSpent: number;
    avgCardsPerBoard: number;
    avgTimePerCard: number;
  };
}

{/* <LineChart
      data={data}
      margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
    >
      <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
</LineChart> */}
const MyLineChart: React.FC<MyLineChartProps> = ({ type, userAnalytics }) => {
  const data: DataPoint[] = [
    { type: "Total Boards", value: userAnalytics.numberOfBoards },
    { type: "Total Cards", value: userAnalytics.numberOfCards },
    // { type: "Total Time Spent", value: userAnalytics.totalTimeSpent },
    {type: "Average Cards Per Board", value: (userAnalytics.avgCardsPerBoard).toFixed(1)},
    { type: "Average Time Per Card (mins)", value: (userAnalytics.avgTimePerCard).toFixed(1) }
  ];

  return type === "all-time" ? (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  ) : (
    ""
  );
};
export default MyLineChart;

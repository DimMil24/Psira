import { Paper, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
const dataset = [
  { date: new Date(2023, 12, 1), st: 20, rt: 5 },
  { date: new Date(2024, 1, 1), st: 5, rt: 2 },
  { date: new Date(2024, 2, 1), st: 13, rt: 4 },
  { date: new Date(2024, 3, 1), st: 29, rt: 18 },
  { date: new Date(2024, 4, 1), st: 12, rt: 2 },
];

const OverTimeChart = () => {
  return (
    <Paper elevation={3}>
      <Typography variant="h6">Tickets over Time</Typography>
      <LineChart
        dataset={dataset}
        xAxis={[
          {
            dataKey: "date",
            scaleType: "time",
            valueFormatter: (date) =>
              date
                .toLocaleString("default", { month: "long" })
                .substring(0, 3) +
              " " +
              date.getFullYear().toString(),
          },
        ]}
        series={[
          {
            id: "Submitted",
            label: "Submitted Tickets",
            dataKey: "st",
            stack: "st",
            showMark: false,
            area: true,
          },
          {
            id: "Resolved",
            label: "Resolved Tickets",
            dataKey: "rt",
            stack: "rt",
            showMark: false,
            area: true,
          },
        ]}
        height={300}
      ></LineChart>
    </Paper>
  );
};

export default OverTimeChart;

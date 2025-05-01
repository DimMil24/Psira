import { Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const dataset = [
  {
    label: "Low",
    num: 10,
  },
  {
    label: "Medium",
    num: 15,
  },
  {
    label: "High",
    num: 5,
  },
  {
    label: "Urgent",
    num: 7,
  },
];

const PriorityChart = () => {
  return (
    <Paper elevation={3}>
      <Typography variant="h6">Tickets by Priority</Typography>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "label",
            colorMap: {
              type: "ordinal",
              values: ["Low", "Medium", "High", "Urgent"],
              colors: ["green", "#42a6f5", "orange", "red"],
            },
          },
        ]}
        series={[{ dataKey: "num", color: "red" }]}
        height={300}
      />
    </Paper>
  );
};

export default PriorityChart;

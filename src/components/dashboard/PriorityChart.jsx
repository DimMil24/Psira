import { Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const PriorityChart = ({ newData }) => {
  return (
    <Paper elevation={3}>
      <Typography variant="h6">Tickets by Priority</Typography>
      <BarChart
        dataset={newData}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "priority",
            colorMap: {
              type: "ordinal",
              values: ["Low", "Medium", "High", "Urgent"],
              colors: ["green", "#42a6f5", "orange", "red"],
            },
          },
        ]}
        series={[{ dataKey: "count", color: "red" }]}
        height={300}
      />
    </Paper>
  );
};

export default PriorityChart;

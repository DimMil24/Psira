import { Paper, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";

const StatusChart = ({ chartData }) => {
  chartData.map((e) => {
    if (e.label === "New") {
      return { ...(e.color = "#008cf8") };
    }
    if (e.label === "In Development") {
      return { ...(e.color = "#00d088") };
    }
    if (e.label === "Testing") {
      return { ...(e.color = "#eba317") };
    }
    if (e.label === "Resolved") {
      return { ...(e.color = "#fe445f") };
    }
  });
  return (
    <Paper sx={{ padding: 2 }} elevation={3}>
      <Typography textAlign="left" variant="h6">
        Tickets by Status
      </Typography>
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            outerRadius: 120,
            cx: 150,
          },
        ]}
        width={450}
        height={300}
      />
    </Paper>
  );
};

export default StatusChart;

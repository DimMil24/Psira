import { Paper, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";

const ProjectCountChart = ({ chartData }) => {
  chartData.map((e) => {
    if (e.label === "Low") {
      return { ...(e.color = "#008cf8") };
    }
    if (e.label === "Medium") {
      return { ...(e.color = "#00d088") };
    }
    if (e.label === "High") {
      return { ...(e.color = "#eba317") };
    }
    if (e.label === "Urgent") {
      return { ...(e.color = "#fe445f") };
    }
  });
  return (
    <Paper sx={{ padding: 2 }} elevation={3}>
      <Typography textAlign="left" variant="h6">
        Project by Status
      </Typography>
      <PieChart
        series={[
          {
            data: chartData,
          },
        ]}
        width={450}
        height={300}
      />
    </Paper>
  );
};

export default ProjectCountChart;

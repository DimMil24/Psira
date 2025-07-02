import { Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const TicketCountByProject = ({ newData }) => {
  return (
    <Paper sx={{ padding: 2 }} elevation={3}>
      <Typography textAlign="left" variant="h6">
        Tickets by Project
      </Typography>
      <BarChart
        margin={{
          left: 35,
          right: 0,
          top: 30,
          bottom: 30,
        }}
        dataset={newData}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "name",
            valueFormatter: (value, context) => {
              if (context.location === "tick") {
                if (value.length > 9) {
                  return `${value.slice(0, 8)}... `;
                }
                return `${value} `;
              } else {
                return `${value} `;
              }
            },
            tickLabelStyle: {
              fontSize: 14,
            },
          },
        ]}
        series={[{ dataKey: "count", color: "#228cde" }]}
        height={300}
      />
    </Paper>
  );
};

export default TicketCountByProject;

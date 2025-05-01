import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import RecentsTable from "../dashboard/RecentsTable";
import OverTimeChart from "../dashboard/OverTimeChart";
import PriorityChart from "../dashboard/PriorityChart";

const DashboardPage = () => {
  return (
    <Grid container columnSpacing={3} rowSpacing={3}>
      <Grid size={3}>
        <Paper elevation={2}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            rowGap={1}
            justifyContent={"center"}
            alignItems={"center"}
            height={120}
          >
            <Typography variant="h6">Total Projects</Typography>
            <Box
              sx={{
                height: "35px",
                width: "100px",
                backgroundColor: "#29404f",
                borderRadius: 1,
              }}
            >
              <Typography color="white" variant="h6">
                3
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid size={3}>
        <Paper elevation={3}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            rowGap={1}
            justifyContent={"center"}
            alignItems={"center"}
            height={120}
          >
            <Typography variant="h6">Total Tickets</Typography>
            <Box
              sx={{
                height: "35px",
                width: "100px",
                backgroundColor: "#29404f",
                borderRadius: 1,
              }}
            >
              <Typography color="white" variant="h6">
                8
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid size={3}>
        <Paper elevation={3}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            rowGap={1}
            justifyContent={"center"}
            alignItems={"center"}
            height={120}
          >
            <Typography variant="h6">Open Tickets</Typography>
            <Box
              sx={{
                height: "35px",
                width: "100px",
                backgroundColor: "#2395f4",
                borderRadius: 1,
              }}
            >
              <Typography color="white" variant="h6">
                3
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid size={3}>
        <Paper elevation={3}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            rowGap={1}
            justifyContent={"center"}
            alignItems={"center"}
            height={120}
          >
            <Typography variant="h6">Closed Tickets</Typography>
            <Box
              sx={{
                height: "35px",
                width: "100px",
                backgroundColor: "#00c853",
                borderRadius: 1,
              }}
            >
              <Typography color="white" variant="h6">
                14
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid size={12}>
        <RecentsTable />
      </Grid>
      <Grid size={6}>
        <OverTimeChart />
      </Grid>
      <Grid size={6}>
        <PriorityChart />
      </Grid>
    </Grid>
  );
};
export default DashboardPage;

import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import RecentsTable from "../dashboard/RecentsTable";
import PriorityChart from "../dashboard/PriorityChart";
import { useContext, useEffect, useState } from "react";
import { myFetchGet } from "../../utils/fetchUtils";
import { AuthContext } from "../../auth/AuthProvider";
import StatusChart from "../dashboard/StatusChart";
import DeadlineProjectsTable from "../dashboard/DeadlineProjectsTable";
import ProjectCountChart from "../dashboard/ProjectCountChart";
import TicketCountByProject from "../dashboard/TicketCountByProject";
import Loading from "../Loading";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const response = await myFetchGet("dashboard", token);
      setData(response);
      setLoading(false);
    };
    getData();
  }, [token]);

  return loading ? (
    <Loading loadingProp={loading} />
  ) : (
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
                alignContent: "center",
              }}
            >
              <Typography color="white" variant="h6">
                {data.totalProjects}
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
                alignContent: "center",
              }}
            >
              <Typography color="white" variant="h6">
                {data.totalTickets}
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
                alignContent: "center",
              }}
            >
              <Typography color="white" variant="h6">
                {data.openTickets}
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
                alignContent: "center",
              }}
            >
              <Typography color="white" variant="h6">
                {data.closedTickets}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid size={12}>
        <Paper elevation={2} sx={{ padding: 2 }}>
          <Typography textAlign="left" variant="h6">
            Recent Activity
          </Typography>
          <RecentsTable rowData={data.dashboardTickets} />
        </Paper>
      </Grid>
      <Grid size={6}>
        <StatusChart chartData={data.statusTickets} />
      </Grid>
      <Grid size={6}>
        <PriorityChart newData={data.priorityTickets} />
      </Grid>
      <Grid size={12}>
        <DeadlineProjectsTable rowData={data.deadlineProjects} />
      </Grid>
      <Grid size={6}>
        <TicketCountByProject newData={data.ticketCountByProject} />
      </Grid>
      <Grid size={6}>
        <ProjectCountChart chartData={data.projectNumberByPriority} />
      </Grid>
    </Grid>
  );
};
export default DashboardPage;

import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { myFetchGet } from "../../../utils/fetchUtils";
import { AuthContext } from "../../../auth/AuthProvider";
import { stringAvatar } from "../../../utils/avatarUtils";
import { getRole } from "../../../utils/roleDisplayUtils";
import { getColorPriority, getColorType } from "../../../utils/chipUtils";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../Loading";

const DetailsProjectPage = () => {
  let navigate = useNavigate();
  let { project_id } = useParams();
  const [data, setData] = useState([]);
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(user);

  function TicketTable() {
    let ticketData;

    if (value === 0) {
      ticketData = data.tickets.open;
    } else {
      ticketData = data.tickets.resolved;
    }
    return ticketData.length === 0 ? (
      <Box p={3}>
        <Typography>No Tickets</Typography>
      </Box>
    ) : (
      <TableContainer>
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Priority</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Submitter</TableCell>
              <TableCell align="center">Modified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketData.map((ticket) => (
              <TableRow
                sx={{ cursor: "pointer" }}
                hover={true}
                onClick={() =>
                  navigate("/tickets/" + project_id + "/" + ticket.id)
                }
                key={ticket.id}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ wordBreak: "break-word" }}
                >
                  {ticket.name}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={ticket.priority}
                    color={getColorPriority(ticket.priority)}
                    variant="filled"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={ticket.type}
                    color={getColorType(ticket.type)}
                    variant="filled"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">{ticket.submitted}</TableCell>
                <TableCell align="center">{ticket.modified}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  useEffect(() => {
    const getData = async () => {
      const response = await myFetchGet("projects/" + project_id, token);
      setData(response);
      setLoading(false);
    };

    getData();
  }, [token, project_id]);

  return loading ? (
    <Loading loadingProp={loading} />
  ) : (
    <Stack spacing={3}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            rowGap: 1,
          }}
        >
          <Typography sx={{ wordBreak: "break-word" }} variant="h4">
            {data.projectName}
          </Typography>
          <Typography variant="body1">
            {data.startDate} - {data.deadline}
          </Typography>
          <Chip
            label={"Priority: " + data.priority}
            color={getColorPriority(data.priority)}
            variant="filled"
            sx={{ width: 130 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              columnGap: 1,
            }}
          >
            <Avatar {...stringAvatar(data.ownerUser.fullName)} />
            <Box>
              <Typography sx={{ wordBreak: "break-word" }}>
                {data.ownerUser.fullName}
              </Typography>
              <Typography variant="body2">
                {getRole(data.ownerUser.role)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <Typography variant="h5">Description</Typography>
          <Typography sx={{ wordBreak: "break-word" }}>
            {data.description}
          </Typography>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography textAlign={"left"} variant="h5">
          Project Managers
        </Typography>
        <Grid container rowSpacing={2} p={1}>
          {data.users.map((user) => {
            if (user.role === "ROLE_MANAGER" || user.role === "ROLE_ADMIN")
              return (
                <Grid key={user.id} size={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 1,
                    }}
                  >
                    <Avatar {...stringAvatar(user.fullName)} />
                    <Box textAlign={"left"}>
                      <Typography>{user.fullName}</Typography>
                      <Typography variant="body2">
                        {getRole(user.role)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
          })}
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography textAlign={"left"} variant="h5">
          Members
        </Typography>
        <Grid container rowSpacing={2} p={1}>
          {data.users.map((user) => {
            if (
              user.role === "ROLE_DEVELOPER" ||
              user.role === "ROLE_SUBMITTER"
            )
              return (
                <Grid key={user.id} size={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 1,
                    }}
                  >
                    <Avatar {...stringAvatar(user.fullName)} />
                    <Box textAlign={"left"}>
                      <Typography>{user.fullName}</Typography>
                      <Typography variant="body2">
                        {getRole(user.role)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
          })}
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Open Tickets" />
              <Tab label="Closed Tickets" />
            </Tabs>
          </Box>
          <TicketTable value={value} />
        </Box>
      </Paper>

      {user?.role !== "ROLE_SUBMITTER" && user?.role !== "ROLE_DEVELOPER" && (
        <Box display="flex" flexDirection="row-reverse">
          <Button color="error">
            <DeleteIcon />
            <Typography variant="body2">DELETE</Typography>
          </Button>
          <Button color="inherit" onClick={() => navigate("edit")}>
            <EditIcon />
            <Typography variant="body2">EDIT</Typography>
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default DetailsProjectPage;

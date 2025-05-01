import {
  Box,
  Button,
  Chip,
  Grid2,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import priorities from "../../../utils/priorities";
import ticketType from "../../../utils/ticketTypes";
import ticketStatus from "../../../utils/ticketStatus";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/AuthProvider";
import { myFetchGet, myFetchPut } from "../../../utils/fetchUtils";
import { useNavigate, useParams } from "react-router";

export default function EditTicketPage() {
  const [ticketData, setTicketData] = useState();
  const [devData, setDevData] = useState([]);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [developer, setDeveloper] = useState("");
  const [status, setStatus] = useState(ticketStatus[0].label);
  const [priority, setPriority] = useState(priorities[0].label);
  const [type, setType] = useState(ticketType[0].label);
  const navigate = useNavigate();
  let { project_id, ticket_id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await myFetchPut("tickets/" + project_id + "/" + ticket_id, token, {
        title: name,
        description: description,
        status: status,
        priority: priority,
        type: type,
        developerId: developer,
      });
      navigate("/tickets/" + project_id + "/" + ticket_id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await myFetchGet(
        "tickets/" + project_id + "/" + ticket_id,
        token
      );
      setTicketData(data);
      setName(data.name);
      setDescription(data.description);
      setStatus(data.status);
      setType(data.type);
      setPriority(data.priority);
      setDeveloper(data.assignedTo.id);
      setLoading(false);
    };

    const getDevelopers = async () => {
      const dev = await myFetchGet(
        "tickets/submit/devs?projectId=" + project_id,
        token
      );
      setDevData(dev);
    };

    getData();
    getDevelopers();
  }, [project_id, ticket_id, token]);

  return (
    <Stack>
      {!loading && (
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography sx={{ textAlign: "left", mb: 1 }} variant="h5">
            Edit Ticket
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid2 container rowGap={3}>
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  id="ticket_name"
                  label="Ticket Name"
                  variant="outlined"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  id="standard-multiline-static"
                  label="Ticket Description"
                  multiline
                  required
                  rows={3}
                  variant="outlined"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  id="ticket-Status"
                  label="Status"
                  select
                  variant="outlined"
                  fullWidth
                  sx={{ textAlign: "left" }}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {ticketStatus.map((ticket) => (
                    <MenuItem key={ticket.label} value={ticket.label}>
                      <Chip label={ticket.label} color={ticket.color} />
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
              <Grid2 size={6} paddingRight={1}>
                <TextField
                  id="submitter"
                  variant="outlined"
                  fullWidth
                  defaultValue={ticketData.submittedBy.fullName}
                  disabled
                />
              </Grid2>
              <Grid2 size={6} paddingLeft={1}>
                <TextField
                  id="developer"
                  select
                  label="Developer"
                  value={developer}
                  onChange={(e) => setDeveloper(e.target.value)}
                  fullWidth
                  required
                  sx={{ textAlign: "left" }}
                >
                  <MenuItem value="-1">Unassigned</MenuItem>
                  {devData.map((dev) => (
                    <MenuItem key={dev.id} value={dev.id}>
                      {dev.fullName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
              <Grid2 size={6} paddingRight={1}>
                <TextField
                  id="ticket-priority"
                  select
                  label="Priority"
                  fullWidth
                  sx={{ textAlign: "left" }}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  {priorities.map((ticket) => (
                    <MenuItem key={ticket.label} value={ticket.label}>
                      <Chip label={ticket.label} color={ticket.color} />
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
              <Grid2 size={6} paddingLeft={1}>
                <TextField
                  id="ticket-type"
                  select
                  label="Type"
                  fullWidth
                  sx={{ textAlign: "left" }}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {ticketType.map((ticket) => (
                    <MenuItem key={ticket.label} value={ticket.label}>
                      <Chip label={ticket.label} color={ticket.color} />
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
            </Grid2>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        </Paper>
      )}
    </Stack>
  );
}

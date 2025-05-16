import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import priorities from "../../../utils/priorities";
import ticketType from "../../../utils/ticketTypes";
import { ticketStatusSubmit } from "../../../utils/ticketStatus";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/AuthProvider";
import { myFetchGet, myFetchPost } from "../../../utils/fetchUtils";
import { useNavigate } from "react-router";
import Loading from "../../Loading";

export default function SubmitTicketPage() {
  const [projectData, setProjectData] = useState([]);
  const [devData, setDevData] = useState([]);
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [loadingDev, setLoadingDevs] = useState(true);
  const [project, setProject] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [developer, setDeveloper] = useState("");
  const [status, setStatus] = useState(ticketStatusSubmit[0].label);
  const [priority, setPriority] = useState(priorities[0].label);
  const [type, setType] = useState(ticketType[0].label);
  const navigate = useNavigate();

  const getDevelopers = async (id) => {
    const dev = await myFetchGet("tickets/submit/devs?projectId=" + id, token);
    setDevData(dev);
    setLoadingDevs(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await myFetchPost("tickets", token, {
        title: name,
        description: description,
        status: status,
        priority: priority,
        type: type,
        developerId: developer,
        projectId: project,
      });
      navigate("/tickets/open");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const projects = await myFetchGet("tickets/submit/projects", token);
      setProjectData(projects);
      setLoading(false);
    };

    getData();
  }, [token]);

  return loading ? (
    <Loading loadingProp={loading} />
  ) : (
    <Stack>
      <Paper elevation={2} sx={{ mb: 3, p: 2 }}>
        <Typography sx={{ textAlign: "left", mb: 1 }} variant="h5">
          Select Project
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="select-projects-label">Project</InputLabel>
          <Select
            labelId="select-projects-label"
            id="projects-select"
            select
            label="Project"
            sx={{ textAlign: "left" }}
            value={project}
            onChange={async (e) => {
              setProject(e.target.value);
              await getDevelopers(e.target.value);
            }}
          >
            {projectData.map((p) => (
              <MenuItem key={p.projectId} value={p.projectId}>
                {p.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
      {!loadingDev && (
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography sx={{ textAlign: "left", mb: 1 }} variant="h5">
            Submit Ticket
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container rowGap={3}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  id="ticket_name"
                  label="Ticket Name"
                  variant="outlined"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid size={12}>
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
              </Grid>
              <Grid size={12}>
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
                  {ticketStatusSubmit.map((ticket) => (
                    <MenuItem key={ticket.label} value={ticket.label}>
                      <Chip label={ticket.label} color={ticket.color} />
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={6} paddingRight={1}>
                <TextField
                  id="submitter"
                  defaultValue={user?.fullName}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid size={6} paddingLeft={1}>
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
              </Grid>
              <Grid size={6} paddingRight={1}>
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
              </Grid>
              <Grid size={6} paddingLeft={1}>
                <TextField
                  id="ticket-type"
                  select
                  label="Type"
                  fullWidth
                  sx={{ textAlign: "left" }}
                  defaultValue={ticketType[0].label}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {ticketType.map((ticket) => (
                    <MenuItem key={ticket.label} value={ticket.label}>
                      <Chip label={ticket.label} color={ticket.color} />
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
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

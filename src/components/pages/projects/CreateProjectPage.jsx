import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useEffect, useState } from "react";
import priorities from "../../../utils/priorities";
import { myFetchGet, myFetchPost } from "../../../utils/fetchUtils";
import { AuthContext } from "../../../auth/AuthProvider";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import Loading from "../../Loading";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function CreateProjectPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(priorities[0].label);
  const [deadline, setDeadline] = useState(dayjs());
  const [personName, setPersonName] = useState([]);
  const theme = useTheme();
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await myFetchGet("user/caller", token);
      setUserData(data);
      setLoading(false);
    };

    getData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await myFetchPost("projects", token, {
        title: name,
        description: description,
        priority: priority,
        deadline: deadline,
        users: personName.map((e) => e.id),
      });
      navigate("/projects");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return loading ? (
    <Loading loadingProp={loading} />
  ) : (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography sx={{ textAlign: "left", mb: 1 }} variant="h5">
        Create Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container rowGap={3}>
          <Grid size={12}>
            <TextField
              fullWidth
              id="project_name"
              label="Project Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id="standard-multiline-static"
              label="Project Description"
              multiline
              rows={3}
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>

          <Grid size={6} paddingRight={1}>
            <FormControl fullWidth>
              <InputLabel id="ticket-priority-label">Priority</InputLabel>
              <Select
                labelId="ticket-priority-label"
                id="priority"
                select
                label="Priority"
                sx={{ textAlign: "left" }}
                SelectDisplayProps={{
                  style: { paddingTop: 12, paddingBottom: 12 },
                }}
                defaultValue={priorities[0].label}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {priorities.map((ticket) => (
                  <MenuItem key={ticket.label} value={ticket.label}>
                    <Chip label={ticket.label} color={ticket.color} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6} paddingLeft={1}>
            <DatePicker
              sx={{ height: 65 }}
              slotProps={{ textField: { fullWidth: true } }}
              disablePast
              label="Deadline"
              value={deadline}
              onChange={(e) => setDeadline(e)}
            />
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="assigned_users">Users</InputLabel>
              <Select
                labelId="assigned_users"
                id="users"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="users" label="Users" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value.id}
                        color="primary"
                        label={value.fullName}
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {userData.map((user) => (
                  <MenuItem
                    key={user.id}
                    value={user}
                    style={getStyles(user, personName, theme)}
                  >
                    {user.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "row-reverse",
            columnGap: 1,
          }}
        >
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

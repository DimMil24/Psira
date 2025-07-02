import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { myFetchGet } from "../../../utils/fetchUtils";
import { AuthContext } from "../../../auth/AuthProvider";
import { Link } from "react-router";
import { stringAvatar } from "../../../utils/avatarUtils";
import { getColorPriority } from "../../../utils/chipUtils";
import Loading from "../../Loading";

const AllProjectsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const response = await myFetchGet("projects", token);
      setData(response);
      setLoading(false);
    };
    getData();
  }, [token]);

  return loading ? (
    <Loading loadingProp={loading} />
  ) : (
    <Grid container>
      {data.map((p) => (
        <Grid key={p.id} size={4} sx={{ padding: 1 }}>
          <Paper elevation={2} sx={{ height: 230 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: 230,
                textAlign: "left",
              }}
            >
              <Typography
                sx={{
                  p: 1,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
                variant="body1"
              >
                {p.projectName}
              </Typography>
              <Typography sx={{ ml: 1 }} variant="body2">
                {p.startDate} - {p.deadline}
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Stack direction="row" spacing={-2}>
                  {p.users.map((u) => (
                    <Avatar key={u.fullName} {...stringAvatar(u.fullName)} />
                  ))}
                </Stack>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                  p: 1,
                }}
              >
                <Chip
                  label={"Priority: " + p.priority}
                  color={getColorPriority(p.priority)}
                  variant="filled"
                />
                <Button variant="contained">
                  <Link
                    style={{ textDecoration: "none", color: "#FFFFFF" }}
                    to={"/projects/" + p.id}
                  >
                    Details
                  </Link>
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default AllProjectsPage;

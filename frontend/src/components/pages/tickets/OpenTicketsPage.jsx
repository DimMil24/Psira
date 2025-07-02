import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/AuthProvider";
import { myFetchGet } from "../../../utils/fetchUtils";
import {
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { stringAvatar } from "../../../utils/avatarUtils";
import {
  getColorPriority,
  getColorStatus,
  getColorType,
} from "../../../utils/chipUtils";
import { Link } from "react-router";
import Loading from "../../Loading";

export default function OpenTicketsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const response = await myFetchGet("tickets/open", token);
      setData(response.tickets);
      setLoading(false);
    };
    getData();
  }, [token]);

  return loading ? (
    <Loading loadingProp={loading} />
  ) : data.length === 0 ? (
    <Typography variant="h6">No Tickets</Typography>
  ) : (
    <Paper elevation={2}>
      <List>
        {data.map((t) => {
          return (
            <ListItem key={t.id} alignItems="flex-start">
              <ListItemButton
                component={Link}
                to={"/tickets/" + t.projectId + "/" + t.id}
              >
                <ListItemAvatar>
                  <Avatar {...stringAvatar(t.submitted)} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ wordBreak: "break-word" }}
                  primary={t.name}
                  secondary={
                    <>
                      <Box display="flex" flexDirection="row" columnGap={1}>
                        <Chip
                          label={t.projectName}
                          style={{ maxWidth: 400 }}
                          variant="filled"
                          size="small"
                        />
                        <Typography>{t.modified}</Typography>
                        <Chip
                          label={t.priority}
                          color={getColorPriority(t.priority)}
                          variant="filled"
                          size="small"
                        />
                        <Chip
                          label={t.type}
                          color={getColorType(t.type)}
                          variant="filled"
                          size="small"
                        />
                        <Chip
                          label={t.status}
                          color={getColorStatus(t.status)}
                          variant="filled"
                          size="small"
                        />
                      </Box>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

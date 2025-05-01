import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid2,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { myFetchGet, myFetchPost } from "../../../utils/fetchUtils";
import { AuthContext } from "../../../auth/AuthProvider";
import { stringAvatar } from "../../../utils/avatarUtils";
import { getRole } from "../../../utils/roleDisplayUtils";
import {
  getColorPriority,
  getColorStatus,
  getColorType,
} from "../../../utils/chipUtils";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryTimeLine from "../../HistoryTimeLine";

const TicketPage = () => {
  let { project_id, ticket_id } = useParams();
  const [commentData, setCommentData] = useState([]);
  const [data, setData] = useState([]);
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  let navigate = useNavigate();

  const handleCommentSend = async () => {
    try {
      await myFetchPost("comments", token, {
        comment: comment,
        ticketId: ticket_id,
      });
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await myFetchGet(
        "tickets/" + project_id + "/" + ticket_id,
        token
      );
      setData(response);
      setLoading(false);
    };

    const getCommentData = async () => {
      const response = await myFetchGet("comments/" + ticket_id, token);
      setCommentData(response);
    };

    getData();
    getCommentData();
  }, [token, ticket_id, project_id]);

  return loading ? (
    "hi"
  ) : (
    <Grid2 container rowGap={3} columnSpacing={2}>
      <Grid2 size={12}>
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
              {data.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: 1,
              }}
            >
              <Typography>Submitted {data.created} </Typography>
              {data.created !== data.updated && (
                <Typography>Updated {data.updated}</Typography>
              )}
            </Box>
          </Box>
        </Paper>
      </Grid2>

      <Grid2 size={6}>
        <Paper elevation={2} sx={{ p: 2, height: 130 }}>
          <Typography variant="h5" textAlign="left">
            Submitted By:
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              columnGap: 1,
              p: 2,
            }}
          >
            <Avatar {...stringAvatar(data.submittedBy.fullName)} />
            <Box>
              <Typography textAlign="left">
                {data.submittedBy.fullName}
              </Typography>
              <Typography textAlign="left" variant="body2">
                {getRole(data.submittedBy.role)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid2>

      <Grid2 size={6}>
        <Paper elevation={2} sx={{ p: 2, height: 130 }}>
          <Typography variant="h5" textAlign="left">
            Assigned To:
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              columnGap: 1,
              p: 2,
            }}
          >
            {data.assignedTo.id !== -1 && (
              <Avatar {...stringAvatar(data.assignedTo.fullName)} />
            )}
            <Box>
              <Typography textAlign="left">
                {data.assignedTo.fullName}
              </Typography>
              {data.assignedTo.id !== null && (
                <Typography textAlign="left" variant="body2">
                  {getRole(data.assignedTo.role)}
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>
      </Grid2>

      <Grid2 size={4}>
        <Paper elevation={2}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"space-between"}
            height={65}
            alignItems={"center"}
            p={2}
          >
            <Typography variant="h5">Priority</Typography>
            <Chip
              label={data.priority}
              color={getColorPriority(data.priority)}
              variant="filled"
            />
          </Box>
        </Paper>
      </Grid2>

      <Grid2 size={4}>
        <Paper elevation={2}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"space-between"}
            height={65}
            alignItems={"center"}
            p={2}
          >
            <Typography variant="h5">Status</Typography>
            <Chip
              label={data.status}
              color={getColorStatus(data.status)}
              variant="filled"
            />
          </Box>
        </Paper>
      </Grid2>

      <Grid2 size={4}>
        <Paper elevation={2}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"space-between"}
            height={65}
            alignItems={"center"}
            p={2}
          >
            <Typography variant="h5">Type</Typography>
            <Chip
              label={data.type}
              color={getColorType(data.type)}
              variant="filled"
            />
          </Box>
        </Paper>
      </Grid2>

      <Grid2 size={12}>
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
      </Grid2>

      <Grid2 size={12}>
        <Paper square variant="outlined">
          <Typography textAlign={"left"} variant="h5" p={2}>
            Comments
          </Typography>
        </Paper>
        <Paper
          elevation={0}
          square
          variant="outlined"
          style={{
            maxHeight: 500,
            overflow: "auto",
            background: "#f0f0f0",
          }}
        >
          {commentData.length > 0 && (
            <List>
              {commentData.map((c) => {
                let direction;
                if (user.userId === c.user.id) {
                  direction = "row-reverse";
                } else {
                  direction = "row";
                }
                return (
                  <ListItem key={c.id} sx={{ flexDirection: direction }}>
                    <Box display="flex" flexDirection="column">
                      <Box
                        display="flex"
                        flexDirection={direction}
                        columnGap={1}
                      >
                        <Avatar {...stringAvatar(c.user.fullName)} />
                        <Paper elevation={2}>
                          <Box display="flex" flexDirection="column" p={1}>
                            <Typography variant="subtitle2">
                              {c.user.fullName}
                            </Typography>
                            <Typography
                              sx={{ wordBreak: "break-word" }}
                              variant="body1"
                            >
                              {c.comment}
                            </Typography>
                          </Box>
                        </Paper>
                      </Box>
                      <Typography>{c.createdAt}</Typography>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Paper>
        <Paper square variant="outlined">
          <Box display="flex" flexDirection="row" p={2}>
            <TextField
              id="comment_box"
              label="Add Comment"
              multiline
              rows={3}
              variant="outlined"
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></TextField>
            <Button
              sx={{ alignSelf: "flex-end" }}
              color="inherit"
              onClick={() => {
                handleCommentSend();
              }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Paper>
      </Grid2>
      <Grid2 size={12}>
        <Paper square variant="outlined">
          <Typography textAlign={"left"} variant="h5" p={2}>
            History
          </Typography>
        </Paper>
        <Paper
          square
          variant="outlined"
          style={{
            maxHeight: 550,
            overflow: "auto",
          }}
        >
          <Box p={2}>
            <HistoryTimeLine historyData={data.history} />
          </Box>
        </Paper>
      </Grid2>
      <Grid2 size={12}>
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
      </Grid2>
    </Grid2>
  );
};

export default TicketPage;

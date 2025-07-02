import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { stringAvatar } from "../utils/avatarUtils";

export default function HistoryTimeLine({ historyData }) {
  let customPosition;
  if (historyData.length % 2 === 0) {
    customPosition = "alternate-reverse";
  } else {
    customPosition = "alternate";
  }
  return (
    <Timeline position={customPosition}>
      {historyData.map((h) => {
        return (
          <TimelineItem key={h.id}>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={2}>
                <Box
                  display="flex"
                  flexDirection="column"
                  rowGap={1}
                  sx={{ p: 2, textAlign: "left" }}
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    columnGap={1}
                    alignItems="center"
                  >
                    <Avatar {...stringAvatar(h.fullName)} />
                    <Box display="flex" flexDirection="column">
                      <Typography variant="h6">{h.fullName}</Typography>
                      <Typography variant="caption">{h.date}</Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ wordBreak: "break-word" }}>
                    {h.text}
                  </Typography>
                </Box>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

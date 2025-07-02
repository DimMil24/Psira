import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const DeadlineProjectsTable = ({ rowData }) => {
  return rowData.length < 1 ? (
    <Paper elevation={3}>
      <Typography sx={{ textAlign: "left", p: 2 }} variant="h6">
        Upcoming Deadlines
      </Typography>
      <Box sx={{ p: 2 }}>
        <Typography>No Upcoming Deadlines</Typography>
      </Box>
    </Paper>
  ) : (
    <Paper elevation={3}>
      <Typography sx={{ textAlign: "left", p: 2 }} variant="h6">
        Upcoming Deadlines
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row) => (
              <TableRow
                key={row.projectId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ wordBreak: "break-word" }}
                  component="th"
                  scope="row"
                >
                  {row.projectName}
                </TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.deadline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DeadlineProjectsTable;

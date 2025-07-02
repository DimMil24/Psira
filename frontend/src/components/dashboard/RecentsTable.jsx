import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { getColorStatus, getColorType } from "../../utils/chipUtils";

const RecentsTable = ({ rowData }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ticket</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Developer</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                sx={{ wordBreak: "break-word" }}
                component="th"
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell align="right">
                <Chip
                  label={row.status}
                  color={getColorStatus(row.status)}
                  variant="filled"
                  size="small"
                />
              </TableCell>
              <TableCell align="right">{row.assigned}</TableCell>
              <TableCell align="right">
                <Chip
                  label={row.type}
                  color={getColorType(row.type)}
                  variant="filled"
                  size="small"
                />
              </TableCell>
              <TableCell align="right">{row.modified}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecentsTable;

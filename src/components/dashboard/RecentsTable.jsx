import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
} from "@mui/material";
import { getColorStatus, getColorType } from "../../utils/chipUtils";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const RecentsTable = ({ rowData }) => {
  return (
    <TableContainer component={Paper}>
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
              <TableCell component="th" scope="row">
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

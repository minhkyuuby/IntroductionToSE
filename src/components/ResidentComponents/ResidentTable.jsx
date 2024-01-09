import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';


const columns = [
  { id: 'residentId', label: 'Mã cư dân' },
  { id: 'nameResident', label: 'Họ tên' },
  { id: 'birthdayResident', label: 'Ngày sinh' },
  { id: 'citizenshipResidentId', label: 'Căn cước công dân ' },
]
export default function ResidentTable({ rows }) {
  useEffect(() => {
    // Bất cứ thay đổi nào trong rows sẽ kích hoạt lại hàm này
    console.log("Rows changed:", rows);
  }, [rows]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: '#7FC7D9', color: 'white' }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.residentId}>
              {columns.map((column) => (
                <TableCell key={column.id} >
                  {row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


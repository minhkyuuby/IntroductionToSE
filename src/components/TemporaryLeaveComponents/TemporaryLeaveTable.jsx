import React, { useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const columns = [
  { id: 'paperId', label: 'Mã giấy' },
  { id: 'residentId', label: 'Mã cư dân' },
  { id: 'fullname', label: 'Tên cư dân' },
  { id: 'start', label: 'Từ khi' },
  { id: 'end', label: 'Đến khi' },
  { id: 'reason', label: 'Lý do' },
];

export default function TemporaryLeaveTable({ rows }) {
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
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

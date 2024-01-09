import React from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

export default function TemporaryResidenceTable({ data }) {
  const columns = [
    { id: 'paperId', label: 'Mã giấy' },
    { id: 'residentId', label: 'Mã cư dân' },
    { id: 'residentName', label: 'Tên cư dân' },
    { id: 'fromDate', label: 'Từ khi' },
    { id: 'toDate', label: 'Đến khi' },
    { id: 'reason', label: 'Lý do' },
  ];

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
          {data.map((row) => (
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

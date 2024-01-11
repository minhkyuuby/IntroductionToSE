import React, { useEffect } from 'react';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';

const columns = [
  { id: 'name', label: 'Tên dịch vụ' },
  { id: 'status', label: 'Trạng thái' },
  { id: 'description', label: 'Mô tả' },
  { id: 'price', label: 'Giá (nghìn đồng)' },
  { id: 'unit', label: 'Đơn vị' },
  { id: 'actions', label: 'Hoạt động' },
];
export default function ServiceTable({ rows, handleServiceActiveTogge }) {
  useEffect(() => {
    // Bất cứ thay đổi nào trong rows sẽ kích hoạt lại hàm này
    console.log("Rows changed:", rows);
  }, [rows]);

  const handleActiveServiceToggle = (rowIndex) => {
    handleServiceActiveTogge(rows[rowIndex].id)
  }

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
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.id} >
                  {column.id === 'actions' ? (
                    <>
                      <IconButton aria-label="pay" size="small" onClick={()=> handleActiveServiceToggle(rowIndex)} >
                       <EditNotificationsIcon fontSize="small" />
                      </IconButton>
                    </>
                  ) : (
                    row[column.id]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

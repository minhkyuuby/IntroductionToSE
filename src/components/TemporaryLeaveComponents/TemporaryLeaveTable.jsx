import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import temporaryLeaveAPI from '../../api/temporaryLeaveAPI';

const columns = [
  { id: 'paperId', label: 'Mã giấy' },
  { id: 'residentId', label: 'Mã cư dân' },
  { id: 'fullname', label: 'Tên cư dân' },
  { id: 'start', label: 'Từ khi' },
  { id: 'end', label: 'Đến khi' },
  { id: 'reason', label: 'Lý do' },
  { id: 'actions', label: 'Hoạt động' },
];

const cellStyle = {
  textAlign: 'center',
  verticalAlign: 'middle',
};

export default function TemporaryLeaveTable({ rows, setRows }) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDeleteClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    const paperIdToDelete = rows[selectedRow].id;

    // Call the API to delete the temporary leave with the obtained ID
    temporaryLeaveAPI.deleteTemporaryLeaveCard(paperIdToDelete)
      .then(() => {
        // If the deletion is successful, update the UI by fetching updated temporary leave data
        return temporaryLeaveAPI.getAllTemporaryLeave();
      })
      .then(response => {
        // Update the state with the updated temporary leave data
        setRows(response);
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("Error deleting temporary leave or fetching updated temporary leaves:", error);
      })
      .finally(() => {
        // Close the delete confirmation dialog
        setDeleteConfirmationOpen(false);
      });
  };

  const handleDeleteCancel = () => {
    setSelectedRow(null);
    setDeleteConfirmationOpen(false);
  };

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
              <TableCell key={column.id } style={cellStyle}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.id} style={cellStyle}>
                  {column.id === 'actions' ? (
                      <IconButton aria-label="delete" size="small" onClick={() => handleDeleteClick(rowIndex)} style={{ color: '#f23a3a' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                  ) : (
                    row[column.id]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa giấy tạm vắng này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteConfirm} style={{ color: '#f23a3a' }} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

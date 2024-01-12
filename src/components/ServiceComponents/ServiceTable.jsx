import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import serviceApi from '../../api/serviceApi.js';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';

const columns = [
  { id: 'name', label: 'Tên dịch vụ' },
  { id: 'status', label: 'Trạng thái' },
  { id: 'description', label: 'Mô tả' },
  { id: 'price', label: 'Giá (nghìn đồng)' },
  { id: 'unit', label: 'Đơn vị' },
  { id: 'actions', label: 'Hoạt động' },
];

const cellStyle = {
  textAlign: 'center',
  verticalAlign: 'middle',
};

export default function ServiceTable({ rows, handleServiceActiveTogge }) {
  useEffect(() => {
    // Bất cứ thay đổi nào trong rows sẽ kích hoạt lại hàm này
    console.log("Rows changed:", rows);
  }, [rows]);
  
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDeleteClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    const serviceIdToDelete = rows[selectedRow].id;

    // Call the API to delete the service with the obtained ID
    serviceApi.deleteService(serviceIdToDelete)
      .then(() => {
        // If the deletion is successful, update the UI by fetching updated service data
        return serviceApi.getAllServices();
      })
      .then(response => {
        // Update the state with the updated service data
        setRows(response);
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("Error deleting service or fetching updated services:", error);
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
  
  const handleActiveServiceToggle = (rowIndex) => {
    handleServiceActiveTogge(rows[rowIndex].id)
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: '#7FC7D9', color: 'white' }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} style={cellStyle}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.id} style={cellStyle}>
                  {column.id === 'actions' ? (
                   <>
                      <IconButton aria-label="pay" size="small" onClick={()=> handleActiveServiceToggle(rowIndex)} >
                       <EditNotificationsIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="delete" size="small" onClick={() => handleDeleteClick(rowIndex)} style={{ color: '#f23a3a' }}>
                        <DeleteIcon fontSize="small" />
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
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa dịch vụ này không?
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

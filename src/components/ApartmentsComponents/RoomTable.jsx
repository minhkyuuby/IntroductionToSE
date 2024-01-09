import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
import EditRoomModal from './EditRoomModal';

const columns = [
  { id: 'roomName', label: 'Tên phòng' },
  { id: 'status', label: 'Trạng thái' },
  { id: 'area', label: 'Diện tích (m²)' },
  { id: 'numResidents', label: 'Số người' },
  { id: 'actions', label: 'Xóa' }, // New column for the delete button
];

const cellStyle = {
  textAlign: 'center',
  verticalAlign: 'middle',
};

export default function RoomTable({ rows, setRows }) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5; // Set the default rows per page to 5

  const handleDeleteClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    const newRows = [...rows];
    newRows.splice(selectedRow, 1);
    setRows(newRows);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteCancel = () => {
    setSelectedRow(null);
    setDeleteConfirmationOpen(false);
  };

  const handleEditClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setEditModalOpen(true);
  };

  useEffect(() => {
    // Bất cứ thay đổi nào trong rows sẽ kích hoạt lại hàm này
    console.log("Rows changed:", rows);
  }, [rows]);

  // Tính toán số hàng trống cần thêm vào cuối bảng
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, size: 'small'}} aria-label="simple table">
        <TableHead style={{ backgroundColor: '#7FC7D9', color: 'white' }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} style={cellStyle}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.id} style={cellStyle}>
                  {column.id === 'actions' ? (
                    <>
                      <IconButton aria-label="edit" size="small" onClick={() => handleEditClick(row)}>
                        <EditIcon fontSize="small" />
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
          {/* Thêm hàng trống vào cuối bảng */}
          {emptyRows > 0 && (
            <TableRow style={{ height: 62.67 * emptyRows }}>
              <TableCell colSpan={5} />
            </TableRow>
          )}
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
            Bạn có chắc chắn muốn xóa phòng này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDeleteCancel} 
            sx={{
              backgroundColor: '#E8E8E8', 
              color: '#2E2E2E',
              '&:hover': {
                backgroundColor: '#DCDCDC', 
              },
            }}>
            Hủy
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            sx={{ 
              backgroundColor: '#f23a3a', 
              color: '#FFFFFF', 
              border: 1,
              '&:hover': {
                  backgroundColor: '#E00000', 
                },
              }} 
            autoFocus>
            Xác nhận 
          </Button>
        </DialogActions>
      </Dialog>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
      />
      <EditRoomModal
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        selectedRow={selectedRow}
        setRows={setRows}
      />
    </TableContainer>
    
  );
}

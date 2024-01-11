import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, DialogContentText, DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddHomeIcon from '@mui/icons-material/AddHome';
import TablePagination from '@mui/material/TablePagination';
import EditResidentModal from './EditResidentModal';
import residentApi from '../../api/residentApi';
import AddRoomForResidentModal from './AddRoomForResidentModal';

const columns = [
  { id: 'residentId', label: 'Mã cư dân' },
  { id: 'fullname', label: 'Họ tên' },
  { id: 'birthdayResident', label: 'Ngày sinh' },
  { id: 'identity', label: 'Căn cước công dân ' },
  { id: 'room', label: 'Phòng' },
  { id: 'actions', label: 'Thao tác' }, 
]
const cellStyle = {
  textAlign: 'center',
  verticalAlign: 'middle',
};

export default function ResidentTable({ rows, setRows }) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [addRoomModalOpen, setAddRoomModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5; // Set the default rows per page to 5

  const handleUpdateRow = (updatedRow) => {
    const updatedRows = rows.map(row => (row === selectedRow ? updatedRow : row));
    setRows(updatedRows);
    setEditModalOpen(false);
  };
  
  const handleDeleteClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    const roomIdToDelete = rows[selectedRow].id; 
  
    // Call the API to delete the room with the obtained ID
    residentApi.deleteResident(roomIdToDelete)
      .then(() => {
        // If the deletion is successful, update the UI by fetching updated room data
        return residentApi.getAllResidents();
      })
      .then(response => {
        // Map the response to format it for the table
        const updatedResidents = response.map(item => {
          const infoObject = JSON.parse(item.info);
          return {
            id: item.id,
            fullname: infoObject.fullname,
            phone_number: infoObject.phone_number,
            identity: infoObject.cccd,
            birthdayResident: infoObject.birthdayResident, 
            residentId: infoObject.residentId,
          };
        });
        // Update the state with the updated room data
        setRows(updatedResidents);
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("Error deleting room or fetching updated rooms:", error);
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

  const handleEditClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setEditModalOpen(true);
  };

  const handleRoomButtonClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setAddRoomModalOpen(true); 
  };

  useEffect(() => {
    // Bất cứ thay đổi nào trong rows sẽ kích hoạt lại hàm này
    console.log("Rows changed:", rows);
  }, [rows]);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, size: 'small' }} aria-label="simple table">
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
                      <IconButton aria-label="edit" size="small" onClick={() => handleEditClick(rowIndex)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="delete" size="small" onClick={() => handleDeleteClick(rowIndex)} style={{ color: '#f23a3a' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </>
                  ) : column.id === 'room' ? (
                    <IconButton aria-label='addroom' size='small' onClick={() => handleRoomButtonClick(rowIndex)}>
                      <AddHomeIcon fontSize='small' />
                    </IconButton>
                    
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
              <TableCell colSpan={columns.length} />
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
            Bạn có chắc chắn muốn xóa cư dân  này không?
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
      <EditResidentModal
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        selectedRow={selectedRow}
        handleUpdateRow={handleUpdateRow} // Truyền hàm handleUpdateRow ở đây
      />
      <AddRoomForResidentModal
          open={addRoomModalOpen}
          handleClose={() => setAddRoomModalOpen(false)}
          residentId={rows[selectedRow]?.id}
      />
    </TableContainer>

  );
}


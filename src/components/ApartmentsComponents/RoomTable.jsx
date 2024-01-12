import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
import EditRoomModal from './EditRoomModal';
import PersonIcon from '@mui/icons-material/Person';
import apartmentApi from '../../api/apartmentApi';
import InformationModal from './InformationModal';

const columns = [
  { id: 'name', label: 'Tên phòng' },
  { id: 'status', label: 'Trạng thái' },
  { id: 'area', label: 'Diện tích (m²)' },
  { id: 'information', label: 'Thông tin' },
  { id: 'actions', label: 'Thao tác' }, 
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
  const [informationModalOpen, setInformationModalOpen] = useState(false); 
  const rowsPerPage = 5; 

  const handleDeleteClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    const roomIdToDelete = rows[selectedRow].id; 
  
    // Call the API to delete the room with the obtained ID
    apartmentApi.deleteRoom(roomIdToDelete)
      .then(() => {
        // If the deletion is successful, update the UI by fetching updated room data
        return apartmentApi.getAllApartments();
      })
      .then(response => {
        // Map the response to format it for the table
        const updatedRooms = response.map(item => {
          const infoObject = JSON.parse(item.info);
          return {
            id: item.id,
            name: item.name,
            status: infoObject.status === 0 ? "Đang hoạt động" : "Không hoạt động",
            area: infoObject.area,
          };
        });
        // Update the state with the updated room data
        setRows(updatedRooms);
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

  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleEditClick = (rowIndex) => {
    setSelectedRowData(rows[rowIndex]);
    setEditModalOpen(true);
  };

  const handleInforButtonClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setInformationModalOpen(true);
  };

  useEffect(() => {

  }, [rows]);

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
                      <IconButton aria-label="edit" size="small" onClick={() => handleEditClick(rowIndex)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="delete" size="small" onClick={() => handleDeleteClick(rowIndex)} style={{ color: '#f23a3a' }}>
                       <DeleteIcon fontSize="small" />
                      </IconButton>
                    </>
                  ) : column.id === 'information' ? (
                    <IconButton aria-label='infor' size='small' onClick={() => handleInforButtonClick(rowIndex)}>
                      <PersonIcon fontSize='small' />
                    </IconButton>
                    
                  ) : (
                    row[column.id]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 62.67 * emptyRows }}>
              <TableCell colSpan={4} />
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
        selectedRow={selectedRowData}
        setRows={setRows}
      />
      <InformationModal
        open={informationModalOpen} 
        handleClose={() => setInformationModalOpen(false)} 
        apartmentId = {rows[selectedRow]?.id}
      />
    </TableContainer>
    
  );
}

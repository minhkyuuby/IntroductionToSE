import React, { useEffect, useState } from 'react';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, DialogContentText, DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import vehicleApi from '../../api/vehicleApi';

const columns = [
  { id: 'vehicleRoom', label: 'Phòng sở hữu xe' },
  { id: 'name', label: 'Tên xe' },
  { id: 'type', label: 'Loại xe' },
  { id: 'actions', label: 'xóa' },
];

const cellStyle = {
  textAlign: 'center',
  verticalAlign: 'middle',
};

export default function VechicleTable({ vehicles = [], resetData }) {
  const [rows, setRows] = useState(vehicles);
  const [showDeleteAlart, setShowDeleteAlart] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const handleDelete = (deleteId) => {
    setDeleteId(deleteId)
    setShowDeleteAlart(true)
  }

  const handleDeleteConfirm = () => {
    vehicleApi.deleteVehicle(deleteId).then(() => {
      setShowDeleteAlart(false)
      resetData()
    })
  }

  const handleDeleteCancel = () => {
    setShowDeleteAlart(false)
  }

  useEffect(() => {
    // Bất cứ thay đổi nào trong rows sẽ kích hoạt lại hàm này
    const nrows = vehicles.map(vec => {
      const infoObject = JSON.parse(vec.info)
      return {
        id: vec.id,
        vehicleRoom: infoObject.apartment_name,
        name: vec.name,
        type: infoObject.note
      }
    })
    setRows(nrows)

  }, [vehicles]);


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
          {rows.map((row) => (
            <TableRow key={row.name}>
              {columns.map((column) => (
                <TableCell key={column.id } style={cellStyle}>
                  {column.id === 'actions' ? (
                    <>
                      <IconButton aria-label="pay" size="small" onClick={() => handleDelete(row.id)} style={{ color: '#f23a3a' }}>
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
        open={showDeleteAlart}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa phương tiện này không?
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
    </TableContainer>
  );
}

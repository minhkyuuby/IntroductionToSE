import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import TablePagination from '@mui/material/TablePagination';
import PaymentIcon from '@mui/icons-material/Payment';
import billApi from '../../api/billApi';
import PayModal from './modals/PayModal';
import BillDetailModal from './modals/BillDetailModal';

const columns = [
  { id: 'title', label: 'Tiều đề' },
  { id: 'roomName', label: 'Tên phòng' },
  { id: 'time_create', label: 'Tạo lúc' },
  { id: 'total', label: 'Tổng cộng tiền (nghìn đồng)' },
  { id: 'actions', label: 'hoạt động' }, 
];

const cellStyle = {
  textAlign: 'center',
  verticalAlign: 'middle',
};

export default function NewBillTable({ rows, resetDataOnDelete, handlePayBill }) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [payModalOpen, setpayModalOpen] = useState(false);
  const [totalPayment, setTotalPayment] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5; 

  const handleDeleteClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setDeleteConfirmationOpen(true);
  };

  const handlePayClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setTotalPayment(rows[rowIndex].total)
    setpayModalOpen(true)
  }

  const hanlePayConfirm = (payAmount, loanNumber) => {
    const billIdToDelete = rows[selectedRow].id;
    
    handlePayBill(billIdToDelete, payAmount, loanNumber)
  };

  const handleDeleteConfirm = () => {
    const billIdToDelete = rows[selectedRow].id;
  
    billApi.deleteBill(billIdToDelete).then(() => {
      resetDataOnDelete();
    }).finally(() => {
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

  useEffect(() => {
    // Bất cứ thay đổi nào trong rows sẽ kích hoạt lại hàm này
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
                      <IconButton aria-label="pay" size="small" onClick={() => handlePayClick(rowIndex)} style={{ color: 'green' }}>
                       <PaymentIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="edit" size="small" onClick={() => handleEditClick(rowIndex)}>
                        <InfoIcon fontSize="small" />
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
      

      <PayModal isOpen={payModalOpen} totalAmount={totalPayment} onClose={() => setpayModalOpen(false)} onSubmit={hanlePayConfirm}/>
      <BillDetailModal open={editModalOpen} billData={selectedRowData} onClose={() => setEditModalOpen(false)}/>

      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
      />
      
    </TableContainer>
    
  );
}

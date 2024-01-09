// EditRoomModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#7FC7D9',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  export default function EditRoomModal({ open, handleClose, selectedRow, setRows }) {
    const [roomName, setRoomName] = useState('');
    const [status, setStatus] = useState('');
    const [area, setArea] = useState('');
    const [numResidents, setNumResidents] = useState('');
  
    useEffect(() => {
      if (selectedRow) {
        setRoomName(selectedRow.roomName);
        setStatus(selectedRow.status);
        setArea(selectedRow.area);
        setNumResidents(selectedRow.numResidents);
      }
    }, [selectedRow]);
  
    const handleSaveChanges = () => {
      const updatedRow = { ...selectedRow, roomName, status, area, numResidents };
      setRows(prevRows => {
        const rowIndex = prevRows.findIndex(row => row === selectedRow);
        if (rowIndex !== -1) {
          const updatedRows = [...prevRows];
          updatedRows[rowIndex] = updatedRow;
          return updatedRows;
        }
        return prevRows;
      });
      handleClose();
    };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Sửa thông tin phòng
        </Typography>
        <Box>
          <TextField
            label="Tên phòng"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="subtitle1" gutterBottom>
            Trạng thái
          </Typography>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            margin="normal"
          >
            <MenuItem value="">Chọn trạng thái</MenuItem>
            <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
            <MenuItem value="Ngừng hoạt động">Ngừng hoạt động</MenuItem>
          </Select>
          <TextField
            label="Số người"
            value={numResidents}
            onChange={(e) => setNumResidents(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Diện tích"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
        <ThemeProvider theme={theme}> 
            <Button variant="contained" onClick={handleSaveChanges}>
            Lưu 
            </Button>
        </ThemeProvider>
      </Box>
    </Modal>
  );
}

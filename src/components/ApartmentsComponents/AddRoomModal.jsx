import React, { useState } from 'react';
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

export default function AddRoomModal({ open, handleClose,handleAddRoom }) {
  const [roomName, setRoomName] = useState('');
  const [status, setStatus] = useState('');
  const [area, setArea] = useState('');
  const [numResidents, setNumResidents] = useState('');

  const resetFields = () => {
    setRoomName('');
    setStatus('');
    setArea('');
    setNumResidents('');
    handleClose();
  };

  const handleAddRoomModal = () => {
    const newRoom = { roomName, status, area, numResidents };
    handleAddRoom(newRoom);
    resetFields();
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
        <Typography id="modal-modal-title" variant="h6"  component="h2">
          Thêm phòng
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
        <br/>
        <ThemeProvider theme={theme}>
          <Button  variant="contained" onClick={() => handleAddRoomModal({ roomName, status, area, numResidents})}>
            Thêm phòng
          </Button>
        </ThemeProvider>
      </Box>
    </Modal>
  );
}

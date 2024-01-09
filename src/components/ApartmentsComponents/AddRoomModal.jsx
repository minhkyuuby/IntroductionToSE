import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';


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

export default function AddRoomModal({ onAddRoom }) {
  const [open, setOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ id: '', roomName: '', status: '', area: 0, numResidents: 0 });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddRoom = () => {
    // Your logic for adding a new room goes here
    onAddRoom(newRoom);
    setNewRoom({ id: '', roomName: '', status: '', area: 0, numResidents: 0 });
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button onClick={handleOpen} variant="contained" color="primary" startIcon={<AddIcon />}>
          Thêm phòng
        </Button>
      </ThemeProvider>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thêm phòng mới
          </Typography>
          <div>
            <TextField
              label="ID"
              value={newRoom.id}
              onChange={handleChange}
              fullWidth
              margin="normal"
              name="id"
            />
            <TextField
              label="Tên phòng"
              value={newRoom.roomName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              name="roomName"
            />
            <InputLabel id="status-label">Trạng thái</InputLabel>
            <Select
              labelId="status-label"
              value={newRoom.status}
              onChange={handleChange}
              fullWidth
              margin="normal"
              name="status"
            >
              {/* Tạo các MenuItem tương ứng với các tùy chọn */}
              <MenuItem value="Đang sử dụng">Đang sử dụng</MenuItem>
              <MenuItem value="Không sử dụng">Không sử dụng</MenuItem>
            </Select>
            <TextField
              label="Diện tích"
              value={newRoom.area}
              onChange={handleChange}
              fullWidth
              margin="normal"
              name="area"
              type="number"
            />
            <TextField
              label="Số cư dân"
              value={newRoom.numResidents}
              onChange={handleChange}
              fullWidth
              margin="normal"
              name="numResidents"
              type="number"
            />
          </div>
          <ThemeProvider theme={theme}>
            <Button onClick={handleAddRoom} variant="contained" color="primary">
              Thêm
            </Button>
          </ThemeProvider>
        </Box>
      </Modal>
    </div>
  );
}

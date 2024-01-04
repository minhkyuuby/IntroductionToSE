import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, Select, MenuItem } from '@mui/material';

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

export default function ChangeVehicleModal({ open, handleClose, handleChangeVehicle }) {
  const [vehicleRoom, setVehicleRoom] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [vehicleName, setVehicleName] = useState('');


  const resetFields = () => {
    setVehicleRoom('');
    setVehicleName('');
    setVehicleId('');
    handleClose();
  };

  const handleChangeVehicleModal = () => {
    const newVehicle = { vehicleRoom,vehicleName,vehicleId };
    handleChangeVehicle(newVehicle);
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Thêm xe
        </Typography>
        <Box>
        <TextField
            label="Tên phòng sở hưu xe "
            value={vehicleRoom}
            onChange={(e) => setVehicleRoom(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tên xe "
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="subtitle1" gutterBottom>
            Loại xe 
          </Typography>
          <Select
            value={vehicleName}
            onChange={(e) => setVehicleId(e.target.value)}
            fullWidth
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            margin="normal"
          >
            <MenuItem value="">Chọn loại xe </MenuItem>
            <MenuItem value="Xe đạp">Xe đạp </MenuItem>
            <MenuItem value="Xe máy">Xe máy  </MenuItem>
            <MenuItem value="Xe ô tô">Xe ô tô </MenuItem>
          </Select>
        </Box>
        <br />
        <Button variant="contained" onClick={() => handleChangeVehicleModal({ vehicleRoom,vehicleName,vehicleId})}>
          Thêm thông tin
        </Button>
      </Box>
    </Modal>
  );
}

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
  const [vehicleName, setVehicleName] = useState('');
  const [vehiclePrice, setVehiclePrice] = useState('');

  const resetFields = () => {
    setVehicleName('');
    setVehiclePrice('');
    handleClose();
  };

  const handleChangeVehicleModal = () => {
    const newVehicle = { vehicleName,vehiclePrice };
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
          Thêm dịch vụ
        </Typography>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Loại xe 
          </Typography>
          <Select
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
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
          <TextField
            label="Giá gửi xe"
            value={vehiclePrice}
            onChange={(e) => setVehiclePrice(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
        <br />
        <Button variant="contained" onClick={() => handleChangeVehicleModal({ vehicleName,vehiclePrice})}>
          Thêm thông tin
        </Button>
      </Box>
    </Modal>
  );
}

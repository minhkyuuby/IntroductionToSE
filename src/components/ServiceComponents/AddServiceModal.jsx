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

export default function AddServiceModal({ open, handleClose, handleAddService }) {
  const [serviceName, setServiceName] = useState('');
  const [status, setStatus] = useState(0);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState('');

  const resetFields = () => {
    setServiceName('');
    setStatus(0);
    setDescription('');
    setPrice(0);
    setUnit('');
    handleClose();
  };

  // handle inputs
  
  const handleChangeNumberField = (event) => {
    let value = event.target.value;

    // Check if the input is a positive number
    value = value.replace(/[^0-9]/g, '').replace(/^0+/, '');
    setPrice(Number(value));
    // If not a positive number, you can handle it in different ways,
    // such as showing an error message or preventing further input.
  };
  // end handle inputs

  const handleAddServiceModal = () => {
    const info = { status, description, price: price , unit }
    const newService = {name: serviceName, info };
    
    handleAddService(newService);
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
          Thêm dịch vụ 
        </Typography>
        <Box>
          <TextField
            label="Tên dịch vụ"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
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
            <MenuItem value={0}>Đang hoạt động</MenuItem>
            <MenuItem value={1}>Ngừng hoạt động</MenuItem>
          </Select>
          <TextField
            label="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Giá (nghìn đồng)"
            value={price}
            onChange={handleChangeNumberField}
            fullWidth
            margin="normal"
          />
          <Typography variant="subtitle1" gutterBottom>
            Đơn vị tính
          </Typography>
          <Select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            fullWidth
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            margin="normal"
          >
            <MenuItem value=""> Không có đơn vị</MenuItem>
            <MenuItem value="square-meter">square-meter (m²)</MenuItem>
            <MenuItem value="cubic-meter">cubic-meter (m³)</MenuItem>
            <MenuItem value="number">number - số</MenuItem>
            <MenuItem value="bike">bike (xe đạp)</MenuItem>
            <MenuItem value="moto">moto (xe máy)</MenuItem>
            <MenuItem value="car">car (ô tô)</MenuItem>
            {/* Thêm các đơn vị khác nếu cần */}
          </Select>
        </Box>
        <br/>
        <Button  variant="contained" onClick={() => handleAddServiceModal({ serviceName, status, description, price, unit })}>
           Thêm thông tin
        </Button>
      </Box>
    </Modal>
  );
}

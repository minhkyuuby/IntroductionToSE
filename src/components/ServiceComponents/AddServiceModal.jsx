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

export default function AddServiceModal({ open, handleClose,handleAddService }) {
  const [serviceName, setServiceName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');

  const resetFields = () => {
    setServiceName('');
    setStatus('');
    setDescription('');
    setPrice('');
    setUnit('');
    handleClose();
  };

  const handleAddServiceModal = () => {
    const newService = { serviceName, status, description, price, unit };
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
            <MenuItem value="">Chọn trạng thái</MenuItem>
            <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
            <MenuItem value="Ngừng hoạt động">Ngừng hoạt động</MenuItem>
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
            onChange={(e) => setPrice(e.target.value)}
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
            <MenuItem value="">Chọn đơn vị</MenuItem>
            <MenuItem value="Đơn vị 1">Đơn vị 1</MenuItem>
            <MenuItem value="Đơn vị 2">Đơn vị 2</MenuItem>
            <MenuItem value="Đơn vị 3">Đơn vị 3</MenuItem>
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

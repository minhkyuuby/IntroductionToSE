import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
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

export default function AddTemporaryResidenceModal({ open, handleClose, handleAddTemporaryResidence }) {
  const [paperId, setPaperId] = useState('');
  const [residentId, setResidentId] = useState('');
  const [residentName, setResidentName] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [reason, setReason] = useState('');

  const resetFields = () => {
    setPaperId('');
    setResidentId('');
    setResidentName('');
    setFromDate(null);
    setToDate(null);
    setReason('');
  };

  const handleAddTemporaryResidenceModal = () => {
    const formattedFromDate = fromDate ? fromDate.format('YYYY-MM-DD') : ''
    const formattedToDate = fromDate ? fromDate.format('YYYY-MM-DD') : ''


    const newTemporaryResidence = { paperId, residentId, residentName, fromDate:formattedFromDate, toDate:formattedToDate, reason };
    handleAddTemporaryResidence(newTemporaryResidence);
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
        {/* Form nhập thông tin tạm trú */}
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Thêm thông tin Tạm trú
        </Typography>
        <Box>
          <TextField label="Mã giấy" value={paperId} onChange={(e) => setPaperId(e.target.value)} fullWidth margin="normal" />
          <TextField label="Mã cư dân" value={residentId} onChange={(e) => setResidentId(e.target.value)} fullWidth margin="normal" />
          <TextField label="Tên cư dân" value={residentName} onChange={(e) => setResidentName(e.target.value)} fullWidth margin="normal" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Từ khi"
                value={fromDate}
                onChange={(date) => setFromDate(date)}
                fullWidth
                margin="normal"
                sx={{ width: '100%' }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Đến khi"
                value={toDate}
                onChange={(date) => setToDate(date)}
                fullWidth
                margin="normal"
                sx={{ width: '100%' }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {/* <TextField label="Đến khi" value={toDate} onChange={(e) => setToDate(e.target.value)} fullWidth margin="normal" /> */}
          <TextField label="Lý do" value={reason} onChange={(e) => setReason(e.target.value)} fullWidth margin="normal" />
        </Box>
        <Button variant="contained" onClick={handleAddTemporaryResidenceModal}>
          Thêm thông tin
        </Button>
      </Box>
    </Modal>
  );
}

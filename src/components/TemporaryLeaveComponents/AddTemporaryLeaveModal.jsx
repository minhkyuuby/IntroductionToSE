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

export default function AddTemporaryLeaveModal({ open, handleClose, handleAddTemporaryLeave }) {
  const [paperId, setPaperId] = useState('');
  const [residentId, setResidentId] = useState('');
  const [fullname, setResidentName] = useState('');
  const [start, setFromDate] = useState(null);
  const [end, setToDate] = useState(null);
  const [reason, setReason] = useState('');

  const resetFields = () => {
    setPaperId('');
    setResidentId('');
    setResidentName('');
    setFromDate(null);
    setToDate(null);
    setReason('');
    handleClose();
  };

  const handleAddTemporaryLeaveModal = () => {
    const formattedFromDate = start ? start.format('YYYY-MM-DD') : ''
    const formattedToDate = end ? end.format('YYYY-MM-DD') : ''
    const type = 0
    const newTemporaryLeave = { note: reason, paperId, residentId, fullname, start:formattedFromDate, end:formattedToDate, type };
    
    handleAddTemporaryLeave(newTemporaryLeave);
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
          Thêm thông tin Tạm vắng
        </Typography>
        <Box>
          <TextField label="Mã giấy" value={paperId} onChange={(e) => setPaperId(e.target.value)} fullWidth margin="normal" />
          <TextField label="Mã cư dân" value={residentId} onChange={(e) => setResidentId(e.target.value)} fullWidth margin="normal" />
          <TextField label="Tên cư dân" value={fullname} onChange={(e) => setResidentName(e.target.value)} fullWidth margin="normal" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Từ khi"
                value={start}
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
                value={end}
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
        <Button variant="contained" onClick={handleAddTemporaryLeaveModal}>
          Thêm thông tin
        </Button>
      </Box>
    </Modal>
  );
}

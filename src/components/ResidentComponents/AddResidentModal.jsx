import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

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

export default function AddResidentModal({ open, handleClose,handleAddResident }) {
  const [residentId, setResidentId] = useState('');
  const [nameResident, setNameResident] = useState('');
  const [birthdayResident, setBirthdayResident] = useState('');
  const [citizenshipResidentId, setCitizenshipResidentId] = useState('');
  

  const resetFields = () => {
    setResidentId('');
    setNameResident('');
    setBirthdayResident('');
    setCitizenshipResidentId('');
  };

  const handleAddResidentModal = () => {
    const newResident = { residentId,nameResident,birthdayResident,citizenshipResidentId };
    handleAddResident(newResident);
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
          Thêm cư dân 
        </Typography>
        <Box>
          <TextField
            label="Mã cư dân"
            value={residentId}
            onChange={(e) => setResidentId(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Họ tên"
            value={nameResident}
            onChange={(e) => setNameResident(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ngày sinh"
            value={birthdayResident}
            onChange={(e) => setBirthdayResident(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Căn cước công dân "
            value={citizenshipResidentId}
            onChange={(e) => setCitizenshipResidentId(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
        <br/>
        <Button  variant="contained" onClick={() => handleAddResidentModal({ residentId,nameResident,birthdayResident,citizenshipResidentId })}>
           Thêm thông tin
        </Button>
      </Box>
    </Modal>
  );
}

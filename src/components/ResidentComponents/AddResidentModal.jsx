import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, createTheme } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px transform #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
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


export default function AddResidentModal({ open, handleClose, handleAddResident, setRows }) {
  const [residentId, setResidentId] = useState('');
  const [fullname, setFullName] = useState('');
  const [birthdayResident, setBirthdayResident] = useState(null);
  const [identity, setIdentity] = useState('');

  const resetFields = () => {
    setResidentId('');
    setFullName('');
    setBirthdayResident(null);
    setIdentity('');
    handleClose();
  };

  const handleAddResidentModal = () => {
    const formattedBirthday = birthdayResident ? birthdayResident.format('YYYY-MM-DD') : ''
    const newResident = { 
      residentId: residentId, 
      fullname, 
      birthdayResident: formattedBirthday, 
      identity 
    };
    // console.log("create new resident here!")
    // console.log(newResident)
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
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
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Ngày sinh"
                value={dayjs(birthdayResident)}
                onChange={(date) => setBirthdayResident(date)}
                fullWidth
                margin="normal"
                sx={{ width: '100%' }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {/* <TextField
            label="Ngày sinh"
            value={birthdayResident}
            onChange={(e) => setBirthdayResident(e.target.value)}
            fullWidth
            margin="normal"
          /> */}
          <TextField
            label="Căn cước công dân "
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
        <br />
        <ThemeProvider theme={theme}>
          <Button variant="contained" onClick={() => handleAddResidentModal()}>
            Thêm thông tin
          </Button>
        </ThemeProvider>
      </Box>
    </Modal>
  );
}

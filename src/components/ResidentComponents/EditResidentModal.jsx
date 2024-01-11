import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import residentApi from '../../api/residentApi';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

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

export default function EditResidentModal({ open, handleClose, selectedRow, setRows }) {
  const [residentId, setResidentId] = useState('');
  const [fullname, setFullname] = useState('');
  const [birthdayResident, setBirthdayResident] = useState('');
  const [identity, setIdentity] = useState('');

  useEffect(() => {
    if (selectedRow) {
      setResidentId(selectedRow.residentId);
      setFullname(selectedRow.fullname);
      setBirthdayResident(selectedRow.birthdayResident);
      setIdentity(selectedRow.identity);
    }
  }, [selectedRow]);

  const handleEditResident = () => {
    const updatedResidentData = {
      info: {
        fullname: fullname,
        identity: identity,
        residentId: residentId,
        birthdayResident: dayjs(birthdayResident).format('YYYY-MM-DD'),
      }
    };

    residentApi.editResident(selectedRow.id, updatedResidentData)
      .then(() => {
        return residentApi.getAllResidents();
      })
      .then(response => {
        const updatedResidents = response.map(item => {
          const infoObject = JSON.parse(item.info);
          return {
            id: item.id,
            fullname: infoObject.fullname,
            birthdayResident: infoObject.birthdayResident,
            identity: infoObject.identity,
            residentId: infoObject.residentId,
          };
        });
        setRows(updatedResidents);
      })
      .catch(error => {
        console.error("Error editing resident or fetching updated residents:", error);
      })
      .finally(() => {
        handleClose();
      });
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
          Sửa thông tin cư dân
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
            label="Họ và tên"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            fullWidth
            margin="normal"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Ngày sinh"
                value={dayjs(birthdayResident)}
                onChange={(date) => setBirthdayResident(date.format('YYYY-MM-DD'))}
                fullWidth
                margin="normal"
                sx={{ width: '100%' }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            label="Căn cước công dân"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
        <ThemeProvider theme={theme}>
          <Button variant="contained" onClick={handleEditResident}>
            Lưu
          </Button>
        </ThemeProvider>
      </Box>
    </Modal>
  );
}

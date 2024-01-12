import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apartmentApi from '../../api/apartmentApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px #000',
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

export default function InformationModal({ open, handleClose, apartmentId }) {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    if (!open) return;
    apartmentApi.getApartmentPeople(apartmentId).then(response => {
      const parsedResidents = response.map(resident => {
        const infoObject = JSON.parse(resident.info);
        return {
          id: resident.id,
          fullname: infoObject.fullname,
          phone_number: infoObject.phone_number,
          cccd: infoObject.cccd,
          residentId: infoObject.residentId,
          birthdayResident: infoObject.birthdayResident,
        };
      });
      setResidents(parsedResidents);
    }).catch(error => {
      // Handle error
      console.error('Error fetching residents:', error);
    });
  }, [open, apartmentId]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cư dân trong căn hộ
        </Typography>
        <br />
        <Grid container spacing={2}>
          {residents.map(resident => (
            <Grid item key={resident.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {resident.fullname}
                  </Typography>
                  <Typography color="textSecondary">
                    Mã cư dân: {resident.residentId}
                  </Typography>
                  <Typography color="textSecondary">
                    Ngày sinh: {resident.birthdayResident}
                  </Typography>
                  <Typography color="textSecondary">
                    Căn cước công dân: {resident.cccd}
                  </Typography>
                  {/* Add other resident information here */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <br />
        <ThemeProvider theme={theme}>
          <Button
            sx={{
              backgroundColor: '#E8E8E8',
              color: '#2E2E2E',
              '&:hover': {
                backgroundColor: '#DCDCDC',
              },
            }}
            onClick={handleClose}
          >
            Hủy
          </Button>
        </ThemeProvider>
      </Box>
    </Modal>
  );
}

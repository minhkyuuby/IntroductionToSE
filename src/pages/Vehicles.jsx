import React, { useState } from 'react';
import { Container, Button,Typography, Box } from '@mui/material';
import ChangeVehicleModal from '../components/Vehicle.jsx/ChangeVehicleModal';
import VehicleTable from '../components/Vehicle.jsx/VehicleTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
const initialRows = [
  // Initial data for the table
];
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

export default function Vehicles() {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(initialRows);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  
  const handleChangeVehicle = (newVehicle) => {
  
    setRows([...rows, newVehicle]);
  };
  return (
    <Container component= "main" sx={{width: 1000}}>
      <Typography component="h1" variant="h6" 
        sx={{
          backgroundColor: '#DCF2F1',
          height: 40,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 4,
          boxShadow: 3,
          marginTop: 5,
          marginBottom: 2,
          }}>
          Danh sách cư dân 
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: 2,
            marginRight: 10
          }}>
      <ThemeProvider theme={theme}>
        <Button onClick={handleOpenModal} variant="contained" color="primary" startIcon={<AddIcon />}>Thêm xe mới </Button>
        </ThemeProvider>
      <ChangeVehicleModal open={openModal} handleClose={handleCloseModal} handleChangeVehicle={handleChangeVehicle}/>
      </Box>
      <hr />
      <VehicleTable rows={rows} />
    </Container>
  );
}
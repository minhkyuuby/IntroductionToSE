import React, { useState } from 'react';
import { Container, Button ,Box,Typography} from '@mui/material';
import ServiceTable from '../components/ServiceComponents/ServiceTable';
import AddServiceModal from '../components/ServiceComponents/AddServiceModal';
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
export default function Services() {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(initialRows);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to add a new service row to the table
  const handleAddService = (newService) => {
    setRows([...rows, newService]);
  };

  return (
    <Container component="main" sx={{ width: 1000 }}>
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
        Danh sách dịch vụ 
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
          <Button onClick={handleOpenModal} variant="contained" color="primary" startIcon={<AddIcon />}>Thêm dịch vụ mới</Button>
        </ThemeProvider>
        <AddServiceModal open={openModal} handleClose={handleCloseModal} handleAddService={handleAddService} />
      </Box>
      <hr />
      <ServiceTable rows={rows} />
    </Container>
  );
}

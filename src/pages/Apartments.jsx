import React, { useState } from 'react';
import { Container, Button ,Box,Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RoomTable from '../components/ApartmentsComponents/RoomTable';
import AddRoomModal from '../components/ApartmentsComponents/AddRoomModal';
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
export default function Apartments() {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(initialRows);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to add a new service row to the table
  const handleAddRoom = (newRoom) => {
    setRows([...rows, newRoom]);
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
        Danh sách phòng
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
          marginRight: 10
        }}>
        <ThemeProvider theme={theme}>
          <Button 
            onClick={handleOpenModal} 
            variant="contained" color="primary" 
            startIcon={<AddIcon /> }>
              Thêm phòng
            </Button>
        </ThemeProvider>
        <AddRoomModal open={openModal} handleClose={handleCloseModal} handleAddRoom={handleAddRoom} />
      </Box>
      <hr />
      <RoomTable rows={rows} setRows={setRows} />
    </Container>
  );
}

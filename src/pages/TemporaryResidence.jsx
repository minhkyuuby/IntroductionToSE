import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material'; // Thêm Box vào danh sách import
import AddTemporaryResidenceModal from '../components/TemporaryResidenceComponents/AddTemporaryResidenceModal';
import TemporaryResidenceTable from '../components/TemporaryResidenceComponents/TemporaryResidenceTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Layout from './lyaout/Layout.jsx';

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

export default function TemporaryResidence() {
  const [openModal, setOpenModal] = useState(false);
  const [temporaryResidenceData, setTemporaryResidenceData] = useState([]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddTemporaryResidence = (newTemporaryResidence) => {
    setTemporaryResidenceData([...temporaryResidenceData, newTemporaryResidence]);
  };
  return (
    <Layout page={"TemporaryResident"}>
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
          Quản lý Thông tin Tạm trú
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
            <Button onClick={handleOpenModal} variant="contained" color="primary" startIcon={<AddIcon />}>
              Thêm thông tin Tạm trú mới
            </Button>
          </ThemeProvider>
          <AddTemporaryResidenceModal open={openModal} handleClose={handleCloseModal} handleAddTemporaryResidence={handleAddTemporaryResidence} />

        </Box>
        <hr />
        <TemporaryResidenceTable data={temporaryResidenceData} />
      </Container >
    </Layout>
  );
}

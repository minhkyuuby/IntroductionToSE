import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import AddResidentModal from '../components/ResidentComponents/AddResidentModal';
import ResidentTable from '../components/ResidentComponents/ResidentTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import residentAPI from '../api/residentApi';
import Layout from './layout/Layout.jsx';

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

export default function Residents() {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(initialRows);

  useEffect(() => {
    residentAPI.getAllResidents().then(response => {

      const residents = response.map(item => {
        // Parse chuỗi JSON từ trường 'info'
        const infoObject = JSON.parse(item.info);
      
        return {
          id: item.id,
          residentId: infoObject.residentId,
          fullname: infoObject.fullname,
          birthdayResident: infoObject.birthdayResident,
          phone_number: infoObject.phone_number,
          identity: infoObject.identity,
        };
      });

      setRows(residents);

    }).catch(() => {
        setRows(initialRows)
    })
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to add a new Resident row to the table
  const handleAddResident = (newResident) => {
    const requestBody = {
      info: {
        fullname: newResident.fullname,
        phone_number: '', 
        identity: newResident.identity, 
        birthdayResident: newResident.birthdayResident,
        residentId: newResident.residentId
      },
    };
    

    residentAPI.createNewResident(requestBody).then(()=> {
      
      //re fresh lại bảng 
      residentAPI.getAllResidents().then(response => {

        const updatedRows = response.map(item => {
          // Parse chuỗi JSON từ trường 'info'
          const infoObject = JSON.parse(item.info);
        
          return {
            id: item.id,
            fullname: infoObject.fullname,
            phone_number: infoObject.phone_number,
            identity: infoObject.identity,
            birthdayResident: infoObject.birthdayResident, 
            residentId: infoObject.residentId,
          };
        });
  
        setRows(updatedRows);
      })

    }).catch((e) => {
      console.log("Thông báo cái gì đó ở đây là không tạo được resident!");
      console.log(e)
    })
  };

  return (
    <Layout page={"Resident"}>
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
        <Button onClick={handleOpenModal} variant="contained" color="primary" startIcon={<AddIcon />}>Thêm cư dân mới</Button>
        </ThemeProvider>
        <AddResidentModal
          open={openModal}
          handleClose={handleCloseModal} 
          handleAddResident={handleAddResident}
          // setRows={setRows} // Thêm prop setRows vào AddResidentModal
        />
        </Box>
        <hr />
        <ResidentTable rows={rows} setRows={setRows} />
      </Container>
    </Layout>
  )
}

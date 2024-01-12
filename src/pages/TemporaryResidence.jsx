import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material'; // Thêm Box vào danh sách import

import TemporaryLeaveTable from '../components/TemporaryLeaveComponents/TemporaryLeaveTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Layout from './layout/Layout.jsx';
import temporaryResidentAPI from '../api/temporaryResidenceAPI.js';
import AddTemporaryLeaveModal from '../components/TemporaryResidenceComponents/AddTemporaryResidenceModal.jsx';

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

export default function TemporaryLeave() {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(initialRows);

  useEffect(() => {
    temporaryResidentAPI.getAllTemporaryLeave().then(response => {

      const leaveCards = response.map(item => {
        // Parse chuỗi JSON từ trường 'info'
        const infoObject = JSON.parse(item.info);
      
        return {
          id: item.id,
          id_people: item.id_people,
          paperId: infoObject.paperId,
          residentId: infoObject.residentId,
          fullname: infoObject.fullname,
          start: item.start,
          end: item.end,
          reason: infoObject.note
        };
      });

      setRows(leaveCards);

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

  const handleAddTemporaryLeave = (newTemporaryLeave) => {
    const requestBody ={
      start: newTemporaryLeave.start,
      end: newTemporaryLeave.end,
      type: newTemporaryLeave.type,
      info: {
        note: newTemporaryLeave.note,
        residentId: newTemporaryLeave.residentId,
        fullname: newTemporaryLeave.fullname,
        paperId: newTemporaryLeave.paperId
      }
    }
    temporaryResidentAPI.createNewTemporaryLeaveCard(requestBody).then(()=> {
      
      //re fresh lại bảng 
      temporaryResidentAPI.getAllTemporaryLeave().then(response => {

        const leaveCards = response.map(item => {
          // Parse chuỗi JSON từ trường 'info'
          const infoObject = JSON.parse(item.info);
        
          return {
            id: item.id,
            id_people: item.id_people,
            paperId: infoObject.paperId,
            residentId: infoObject.residentId,
            fullname: infoObject.fullname,
            start: item.start,
            end: item.end,
            reason: infoObject.note
          };
        });
  
        setRows(leaveCards);
      })

    }).catch((e) => {
      console.log("Thông báo cái gì đó ở đây là không tạo được service!");
      console.log(e)
    })
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
          <AddTemporaryLeaveModal open={openModal} handleClose={handleCloseModal} handleAddTemporaryLeave={handleAddTemporaryLeave} />
        </Box>
        <hr />
        <TemporaryLeaveTable rows={rows} setRows={setRows}/>
      </Container >
    </Layout>
  );
}

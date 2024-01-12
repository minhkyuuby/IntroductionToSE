import React, { useState, useEffect } from 'react';
import { Container, Button ,Box,Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RoomTable from '../components/ApartmentsComponents/RoomTable';
import AddRoomModal from '../components/ApartmentsComponents/AddRoomModal';
import apartmentApi from '../api/apartmentApi.js';
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

export default function Apartments() {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(initialRows);

  useEffect(() => {
    apartmentApi.getAllApartments().then(response => {

      const rooms = response.map(item => {
        // Parse chuỗi JSON từ trường 'info'
        const infoObject = JSON.parse(item.info);
      
        return {
          id: item.id,
          name: item.name,
          status: infoObject.status === 0? "Đang hoạt động" : "Không hoạt động",
          area: infoObject.area,
        };
      });

      setRows(rooms);


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

  // Function to add a new service row to the table
  const handleAddRoom = (newRoom) => {
    apartmentApi.createNewRoom(newRoom).then(()=> {
      
      //re fresh lại bảng 
      apartmentApi.getAllApartments().then(response => {

        const rooms = response.map(item => {
          // Parse chuỗi JSON từ trường 'info'
          const infoObject = JSON.parse(item.info);
        
          return {
            id: item.id,
            name: item.name,
            status: infoObject.status === 0? "Đang hoạt động" : "Không hoạt động",
            area: infoObject.area,
          };
        });
  
        setRows(rooms);
      })

    }).catch((e) => {
      console.log("Thông báo cái gì đó ở đây là không tạo được service!");
      console.log(e)
    })
  };

  return (
    <Layout page = {"Apartment"}>
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
    </Layout> 
  );
}

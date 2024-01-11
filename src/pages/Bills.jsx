import React, { useState, useEffect } from 'react';
import { Container, Button ,Box,Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RoomTable from '../components/ApartmentsComponents/RoomTable';
import AddRoomModal from '../components/ApartmentsComponents/AddRoomModal';
import apartmentApi from '../api/apartmentApi.js';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Layout from './lyaout/Layout.jsx';
import SelectRoomBillModal from '../components/BillComponents/modals/SelectRoomBillModal.jsx';

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

export default function Bills() {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(initialRows);
  const [tab, setTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };


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
      console.log("Thông báo cái gì đó ở đây là không tạo được bill!");
    })
  };

  return (
    <Layout page='Bill'>
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
        Quản lý hóa đơn
      </Typography>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label="Chờ thanh toán" value="1" />
            <Tab label="Còn dư nợ" value="2" />
            <Tab label="Đã thanh toán" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
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
              Tạo phiếu thu
            </Button>
        </ThemeProvider>
        <SelectRoomBillModal open={openModal} handleClose={handleCloseModal} handleAddRoom={handleAddRoom} />
      </Box>
      <hr />
      <RoomTable rows={rows} setRows={setRows} />
        </TabPanel>
        <TabPanel value="2">Thanh toán một phần</TabPanel>
        <TabPanel value="3">Đã thanh toán</TabPanel>
      </TabContext>
    </Box>
      
    </Container>
    </Layout>
  );
}

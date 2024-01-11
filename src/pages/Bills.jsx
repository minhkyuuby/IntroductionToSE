import React, { useState, useEffect } from 'react';
import { Container, Button ,Box,Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Layout from './lyaout/Layout.jsx';
import SelectRoomBillModal from '../components/BillComponents/modals/SelectRoomBillModal.jsx';
import NewBillTable from '../components/BillComponents/NewBillTable.jsx';
import billApi from '../api/billApi.js';

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
  const [bills, setBills] = useState(initialRows);
  const [rows, setRows] = useState(initialRows);
  const [rows2, setRows2] = useState(initialRows);
  const [rows3, setRows3] = useState(initialRows);
  const [rooms, setRooms] = useState([]);
  const [tab, setTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

    useEffect(() => {

    billApi.getAllBills().then(response => {
      setBills(response);
      const bills = response.map(item => {
        // Parse chuỗi JSON từ trường 'info'
        const infoObject = JSON.parse(item.info);
      
        return {
          id: item.id,
          id_apartment: item.id_apartment,
          title: infoObject.title,
          roomName: infoObject.note,
          time_create: item.time_create,
          total: infoObject.total,
          paid: infoObject.paid,
          loan: infoObject.loan,
        };
      });

      const newBills = []
      const paidApartBills = []
      const completedBills = []
      bills.forEach((b) => {
        if(b.paid === 0) {
          newBills.push(b);
        } else if(b.paid < b.total) {
          paidApartBills.push(b)
        } else {
          completedBills.push(b)
        }
      })

      setRows(newBills);
      setRows2(paidApartBills);
      setRows3(completedBills);

    }).catch(() => {
        setRows(initialRows)
    })
  }, []);

  // modal methods

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // feature
  const resetDataOnDelete = () => {
    billApi.getAllBills().then(response => {

      const bills = response.map(item => {
        // Parse chuỗi JSON từ trường 'info'
        const infoObject = JSON.parse(item.info);
      
        return {
          id: item.id,
          id_apartment: item.id_apartment,
          title: infoObject.title,
          roomName: infoObject.note,
          time_create: item.time_create,
          total: infoObject.total
        };
      });



      setRows(bills);
      setRows2(bills);
      setRows3(bills);

    }).catch(() => {
        setRows(initialRows)
    })
  }

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
        <SelectRoomBillModal open={openModal} handleClose={handleCloseModal} />
      </Box>
      <hr />
      <NewBillTable rows={rows} setRows={setRows} resetDataOnDelete={resetDataOnDelete}/>
        </TabPanel>
        <TabPanel value="2">Thanh toán một phần</TabPanel>
        <TabPanel value="3">Đã thanh toán</TabPanel>
      </TabContext>
    </Box>
      
    </Container>
    </Layout>
  );
}

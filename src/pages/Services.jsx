import React, { useState, useEffect } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import ServiceTable from '../components/ServiceComponents/ServiceTable';
import AddServiceModal from '../components/ServiceComponents/AddServiceModal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import serviceApi from '../api/serviceApi.js';
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

export default function Services() {
  const [openModal, setOpenModal] = useState(false);
  const [services, setServices] = useState(initialRows);
  const [rows, setRows] = useState(initialRows);

  useEffect(() => {
    refreshData()
  }, []);

  const refreshData = () => {
    serviceApi.getAllServices().then(response => {
      setServices(response)
      const services = response.map(item => {
        // Parse chuỗi JSON từ trường 'info'
        const infoObject = JSON.parse(item.info);

        return {
          id: item.id,
          name: item.name,
          status: infoObject.status === 0 ? "hoạt động" : "không hoạt động",
          description: infoObject.description,
          price: infoObject.price,
          unit: infoObject.unit,
          // Thêm các thuộc tính khác nếu có
        };
      });

      setRows(services);


    }).catch(() => {
      setRows(initialRows)
    })
  }

  const handleServiceActiveToggle = (serviceId) => {
    const ser = services.find(service => service.id === serviceId)
    const infoObject = JSON.parse(ser.info)
    let status = 1 - infoObject.status
    const params = {
      ...ser,
      info: {
        ...infoObject,
        status: status
      }
    }
    console.log(params)
    serviceApi.updateService(serviceId, params).then(() => {
      refreshData()
    })
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to add a new service row to the table
  const handleAddService = (newService) => {
    serviceApi.createNewSevice(newService).then(() => {

      //re fresh lại bảng 
      serviceApi.getAllServices().then(response => {

        refreshData()
      })

    }).catch((e) => {
      console.log("Thông báo cái gì đó ở đây là không tạo được service!");
      console.log(e)
    })
  };

  return (
    <Layout page={"Service"}>
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
        <ServiceTable rows={rows} setRows={setRows} handleServiceActiveTogge={handleServiceActiveToggle} />
      </Container>
    </Layout>
  );
}

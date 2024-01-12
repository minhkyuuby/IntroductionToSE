import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';

import { Typography, Container, Paper, Grid } from '@mui/material';
import Layout from './lyaout/Layout.jsx';
import apartmentApi from '../api/apartmentApi.js';
import residentApi from '../api/residentApi.js';
import vehicleApi from '../api/vehicleApi.js';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  const[numApartment, setNumapartment] = useState(0)
  const[numResident, setNumResident] = useState(0)
  const[numVehicle, setNumVehicle] = useState (0)
  useEffect(() => {
    apartmentApi.getAllApartments().then(res => {
      setNumapartment(res.length)
    }).finally(()=> {
      residentApi.getAllResidents().then(res => {
        setNumResident(res.length)
      }).finally(() => {
        vehicleApi.getAllVehicles().then(res => {
          setNumVehicle(res.length)
        })
      })
    })
    
  }, [])

  return (
    <Layout>
      <Container>
        <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
          <Typography variant="h5">Apartment Management</Typography>
          <Typography>
            Đây là trang dashboard quản lý Tòa nhà
          </Typography>
        </Paper>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item style={{backgroundColor: "blue", color: "white"}}>Số căn hộ: {numApartment}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item style={{backgroundColor: "blue", color: "white"}}>Số cư dân: {numResident}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item style={{backgroundColor: "blue", color: "white"}}>Số phương tiện: {numVehicle}</Item>
          </Grid>
        </Grid>
        {/* Add more components and content for your dashboard here */}
      </Container>
    </Layout>
  )
}

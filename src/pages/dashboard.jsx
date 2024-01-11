import React from 'react'
import { Typography, Container, Paper } from '@mui/material';
import Layout from './lyaout/Layout.jsx';

export default function Dashboard() {
  return (
    <Layout>
      <Container>
        <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
          <Typography variant="h5">Apartment Management</Typography>
          <Typography>
            Đây là trang dashboard quản lý dự án BlueMoon
          </Typography>
        </Paper>
        {/* Add more components and content for your dashboard here */}
      </Container>
    </Layout>
  )
}

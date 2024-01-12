import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import ServiceCard from '../cards/ServiceCard';
import billApi from '../../../api/billApi';

const servicesData = [
  { id: 1, name: 'Service 1', price: 10, unit: "m", quantity: 0 },
  { id: 2, name: 'Service 2', price: 15, unit: "m", quantity: 0 },
  // Add more services as needed
];

export default function BillDetailModal({ open, onClose, billId, billData }) {
  const [billInfo, setBillInfo] = useState({
    title: 'Hóa đơn',
    createDate: new Date(),
    selectedServices: [],
    total: 0
    // Add more fields as needed
  });

  const [services, setServices] = useState([])

  useEffect(() => {
    if(!open) return;
    // billApi.getBilldetails(buillId).then((res)=> {
    //     setBillInfo(res)
    // })
    console.log(billData)
    setBillInfo(billData)
    setServices(billData.services)

  }, [open]);

  

  const handleClose = () => {
    setBillInfo({
      title: '',
      createDate: new Date(),
      selectedServices: [],
      total: 0
    })
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          width: 1000,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h6" component="div">
          Chi tiết hóa đơn: {billInfo.roomName}
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={billInfo.title}
        />
        <Typography variant="subtitle1" gutterBottom>
          Tạo phiếu lúc: {billInfo.time_create}
        </Typography>
        <br/>
        <Typography variant="subtitle1" gutterBottom>
          danh sách dịch vụ tính tiền:
        </Typography>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isDetail={true}
          />
        ))}
        <br />
        <Typography>
          Tổng tiền: {billInfo.total} (nghìn đồng)
        </Typography>
        <Typography>
          Đã thanh toán: {billInfo.paid ? billInfo.paid : 0} (nghìn đồng)
        </Typography>
        <Typography>
          Còn nợ: {billInfo.loan ? billInfo.loan : 0} (nghìn đồng)
        </Typography>
        <br />
        <Box sx={{ mt: 2 }}>
          <Button sx={{
            backgroundColor: '#E8E8E8',
            color: '#2E2E2E',
            '&:hover': {
              backgroundColor: '#DCDCDC',
            },
            ml: 2
          }} onClick={handleClose} >
            Đóng
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

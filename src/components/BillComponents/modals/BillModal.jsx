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
import serviceApi from "../../../api/serviceApi";

import billApi from '../../../api/billApi';
import vehicleApi from '../../../api/vehicleApi';


const servicesData = [
  { id: 1, name: 'Service 1', price: 10, unit: "m", quantity: 0 },
  { id: 2, name: 'Service 2', price: 15, unit: "m", quantity: 0 },
  // Add more services as needed
];

export default function BillModal({ open, onClose, roomData, onBillCreated }) {
  const [services, setServices] = useState(servicesData)

  const [roomVehicles, setRoomVehicles] = useState([])

  const [bikeNumber, setBikeNumber] = useState(0)
  const [motoNumber, setMotoNumber] = useState(0)
  const [carNumber, setCarNumber] = useState(0)

  const [billInfo, setBillInfo] = useState({
    title: 'Hóa đơn',
    createDate: new Date(),
    selectedServices: [],
    total: 0
    // Add more fields as needed
  });


  // use Effect ***************
  useEffect(() => {
    if(!open) return;
    let bikeNum =0, motoNum = 0, carNum = 0;
    vehicleApi.getVehiclesByApartment(roomData.id).then(res => {
      setRoomVehicles(res)
      res.forEach(vec => {
        const infoObject = JSON.parse(vec.info)

        if(infoObject.note === 'bike') bikeNum++;
        else if(infoObject.note === 'moto') motoNum++;
        else if(infoObject.note === 'car') carNum++;
      })

      setBikeNumber(bikeNum)
      setMotoNumber(motoNum)
      setCarNumber(carNum)

    }).finally(() => {
      serviceApi.getAllServices().then((res) => {
        const services = res.map((service) => {
          const infoObject = JSON.parse(service.info);
          let unit = infoObject.unit
          let quantity = 0;
          if (unit === "square-meter") {
            quantity = roomData.area
          } else if(unit === "bike") {
            quantity = bikeNum
          } else if(unit === 'moto') {
            quantity = motoNum
          }  else if(unit === 'car') {
            quantity = carNum
          }
          return {
            id: service.id,
            name: service.name,
            price: infoObject.price,
            unit: unit,
            quantity: quantity,
            status: infoObject.status
          }
        })
        setServices(services.filter(e => e.status === 0))
      })
    })


  }, [open]);
  //

  const handleInputChange = (e) => {
    setBillInfo({
      ...billInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceToggle = (serviceId) => {
    const isSelected = billInfo.selectedServices.includes(serviceId);
    const updatedServices = isSelected
      ? billInfo.selectedServices.filter((id) => id !== serviceId)
      : [...billInfo.selectedServices, serviceId];

    setBillInfo({
      ...billInfo,
      selectedServices: updatedServices,
    });
  };

  const onChangeServiceQuantity = (serviceId, quantity) => {
    const updatedArray = services.map((item) => {
      if (item.id === serviceId) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    setServices(updatedArray)

  }

  const calculateTotal = () => {
    let total = 0;

    billInfo.selectedServices.forEach((serviceId) => {
      const selectedService = services.find((service) => service.id === serviceId);
      if (selectedService) {
        total += selectedService.price * selectedService.quantity;
      }
    });

    setBillInfo({
      ...billInfo,
      total: total
    })
  };

  const handleSubmit = () => {
    // Add your logic to handle the submitted bill information
    const createDate = dayjs(billInfo.createDate)
    const formatteddate = createDate ? createDate.format('YYYY-MM-DD HH:mm:ss') : ''

    

    const selectedServices = services.filter(service =>  billInfo.selectedServices.includes(service.id));

    const billParams = {
      id_apartment: roomData.id,
      info: {
        title: billInfo.title,
        list_service: selectedServices,
        note: roomData.name,
        total: billInfo.total,
        paid: 0,
        loan: null,
      },
      time_create: formatteddate,
      
    }
    
    billApi.createNewBill(billParams).then(() => {
      onBillCreated()
      handleClose()
    }).finally(() => {

      // Close the modal
      handleClose()
    })
  };

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
          Tạo hóa đơn cho phòng: {roomData.name}
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={billInfo.title}
          onChange={handleInputChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Ngày tạo"
              value={dayjs(billInfo.createDate)}
              onChange={date => {
                setBillInfo({
                  ...billInfo,
                  createDate: date
                })
              }}
              fullWidth
              margin="normal"
              sx={{ width: '100%' }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <br/>
        <Typography variant="subtitle1" gutterBottom>
          các loại xe của phòng:
          <p>Xe đạp: {bikeNumber}, xe máy: {motoNumber}, ô tô: {carNumber}</p>
          
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          danh sách dịch vụ tính tiền:
        </Typography>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={billInfo.selectedServices?.includes(service.id)}
            onToggle={() => handleServiceToggle(service.id)}
            onQuantityChange={onChangeServiceQuantity}
          />
        ))}
        <br />
        <Typography>
          Tổng tiền: {billInfo.total} (nghìn đồng)
        </Typography>
        <br />
        <Button variant="contained" color="warning" onClick={calculateTotal}>
          Tính tổng tiền
        </Button>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} >
            Submit
          </Button>
          <Button sx={{
            backgroundColor: '#E8E8E8',
            color: '#2E2E2E',
            '&:hover': {
              backgroundColor: '#DCDCDC',
            },
            ml: 2
          }} onClick={handleClose} >
            Hủy
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

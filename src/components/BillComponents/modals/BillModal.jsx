import React, { useState } from 'react';
import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const servicesData = [
  { id: 1, label: 'Service 1', price: 10 },
  { id: 2, label: 'Service 2', price: 15 },
  // Add more services as needed
];

export default function BillModal({ open, onClose }) {
  const [billInfo, setBillInfo] = useState({
    title: '',
    amount: '',
    selectedServices: [],
    // Add more fields as needed
  });

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

  const calculateTotal = () => {
    // Calculate the total amount based on selected services and other inputs
    // You can customize this calculation based on your specific logic
    let total = parseFloat(billInfo.amount) || 0;

    billInfo.selectedServices.forEach((serviceId) => {
      const selectedService = servicesData.find((service) => service.id === serviceId);
      if (selectedService) {
        total += selectedService.price;
      }
    });

    return total;
  };

  const handleSubmit = () => {
    const totalAmount = calculateTotal();
    // Add your logic to handle the submitted bill information
    console.log('Submitted Bill Information:', {
      ...billInfo,
      totalAmount,
    });

    // Close the modal
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          width: 400,
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
          Add Bill Information
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={billInfo.title}
          onChange={handleInputChange}
        />
        <Typography variant="subtitle1" gutterBottom>
          Select Services:
        </Typography>
        {servicesData.map((service) => (
          <FormControlLabel
            key={service.id}
            control={
              <Checkbox
                checked={billInfo.selectedServices.includes(service.id)}
                onChange={() => handleServiceToggle(service.id)}
              />
            }
            label={`${service.label} (+$${service.price})`}
          />
        ))}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

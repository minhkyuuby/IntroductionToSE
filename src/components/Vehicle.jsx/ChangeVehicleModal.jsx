import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import apartmentApi from '../../api/apartmentApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px transform #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

export default function ChangeVehicleModal({ open, handleClose, handleChangeVehicle }) {
  const [apartmentId, setApartmentId] = useState('');
  const [apartmentName, setApartmentName] = useState('');
  const [vehicleId, setVehicleId] = useState('bike');
  const [vehicleName, setVehicleName] = useState('');
  const [apartments, setApartments] = useState([{id:'323', name: 's'}]);

  useEffect(() => {
    if(!open) return;
    apartmentApi.getAllApartments().then((res) => {
      setApartments(res)
      console.log("set apartments")
    })
  }, [open])

  const resetFields = () => {
    setApartmentId('');
    setVehicleName('');
    setVehicleId('bike');
    handleClose();
  };

  const handleOnchangeApartment = (apartmentId) => {
    setApartmentId(apartmentId); 
    setApartmentName(apartments.find((a) => a.id === apartmentId).name)

  }

  const handleChangeVehicleModal = () => {
    const newVehicle = {
      id_apartment: apartmentId,
      name: vehicleName,
      info: {
        note: vehicleId,
        apartment_name: apartmentName
      }
    };
    console.log(newVehicle)
    handleChangeVehicle(newVehicle);
    resetFields();
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Thêm xe
        </Typography>
        <Box>
        <Typography variant="subtitle1" gutterBottom>
            Căn hộ chủ xe
          </Typography>
        <Select
            value={apartmentId}
            onChange={(e) => handleOnchangeApartment(e.target.value)}
            fullWidth
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          > 
            {
              apartments.map((item) =>
                <MenuItem value={item.id} key={item.name}>{item.name}</MenuItem>
              )
            }
          </Select>
          
          <TextField
            label="Tên xe "
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="subtitle1" gutterBottom>
            Loại xe 
          </Typography>
          <Select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            fullWidth
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            margin="normal"
          >
            <MenuItem value="bike">Xe đạp </MenuItem>
            <MenuItem value="moto">Xe máy  </MenuItem>
            <MenuItem value="car">Xe ô tô </MenuItem>
          </Select>
        </Box>
        <br />
        <Button variant="contained" onClick={() => handleChangeVehicleModal()}>
          Thêm thông tin
        </Button>
      </Box>
    </Modal>
  );
}

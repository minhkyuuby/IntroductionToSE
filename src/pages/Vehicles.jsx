import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import ChangeVehicleModal from '../components/Vehicle.jsx/ChangeVehicleModal';
import VehicleTable from '../components/Vehicle.jsx/VehicleTable';

const initialRows = [
  // Initial data for the table
];

export default function Vehicles() {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(initialRows);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  
  const handleChangeVehicle = (newVehicle) => {
  
    setRows([...rows, newVehicle]);
  };
  return (
    <Container>
      <div >
        Bảng xe 
      </div>
      <div>
        <Button onClick={handleOpenModal} variant="outlined" size="small">Thêm xe mới </Button>
      </div>
      <ChangeVehicleModal open={openModal} handleClose={handleCloseModal} handleChangeVehicle={handleChangeVehicle}/>
      <hr />
      <VehicleTable rows={rows} />
    </Container>
  );
}

import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import ServiceTable from '../components/ServiceComponents/ServiceTable';
import AddServiceModal from '../components/ServiceComponents/AddServiceModal';

const initialRows = [
  // Initial data for the table
];

export default function Services() {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(initialRows);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to add a new service row to the table
  const handleAddService = (newService) => {
    setRows([...rows, newService]);
  };

  return (
    <Container>
      <div>
        Bảng dịch vụ 
      </div>
      <div>
        <Button onClick={handleOpenModal} variant="outlined">Thêm dịch vụ mới</Button>
      </div>
      <AddServiceModal open={openModal} handleClose={handleCloseModal} handleAddService={handleAddService}/>
      <hr />
      <ServiceTable rows={rows} />
    </Container>
  );
}

import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import AddResidentModal from '../components/ResidentComponents/AddResidentModal';
import ResidentTable from '../components/ResidentComponents/ResidentTable';
const initialRows = [
  // Initial data for the table
];


export default function Residents() {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(initialRows);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to add a new Resident row to the table
  const handleAddResident = (newResident) => {
    setRows([...rows, newResident]);
  };

  return (
    <Container>
      <div>
        Bảng cư dân
      </div>
      <div>
        <Button onClick={handleOpenModal} variant="outlined">Thêm cư dân mới</Button>
      </div>
      <AddResidentModal open={openModal} handleClose={handleCloseModal} handleAddResident={handleAddResident} />
      <hr />
      <ResidentTable rows={rows} />
    </Container>

  )
}

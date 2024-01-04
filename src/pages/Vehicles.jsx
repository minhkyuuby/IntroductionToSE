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
    const { vehicleName, vehiclePrice } = newVehicle;
  
    // Kiểm tra xem loại xe đã tồn tại trong rows chưa
    const existingVehicle = rows.find((row) => row.vehicleName === vehicleName);
  
    if (existingVehicle) {
      // Nếu loại xe đã tồn tại và giá gửi xe mới khác giá trị hiện tại
      if (existingVehicle.vehiclePrice !== vehiclePrice) {
        // Cập nhật giá gửi xe cho loại xe đã tồn tại
        const updatedRows = rows.map((row) =>
          row.vehicleName === vehicleName ? { ...row, vehiclePrice } : row
        );
        setRows(updatedRows);
      }
    } else {
      // Nếu loại xe chưa tồn tại, thêm loại xe mới vào rows
      setRows([...rows, newVehicle]);
    }
  
    handleCloseModal(); // Đóng modal sau khi xử lý thay đổi
  };
  // const handleChangeVehicle = (newVehicle) => {
  
  //   setRows([...rows, newVehicle]);
  // };
  return (
    <Container>
      <div >
        Bảng phí gửi xe 
      </div>
      <div>
        <Button onClick={handleOpenModal} variant="outlined" size="small">Cập nhật phí gửi xe </Button>
      </div>
      <ChangeVehicleModal open={openModal} handleClose={handleCloseModal} handleChangeVehicle={handleChangeVehicle}/>
      <hr />
      <VehicleTable rows={rows} />
    </Container>
  );
}

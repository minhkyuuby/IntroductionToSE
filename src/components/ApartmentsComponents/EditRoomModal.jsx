// EditRoomModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apartmentApi from '../../api/apartmentApi.js';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#7FC7D9',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  export default function EditRoomModal({ open, handleClose, selectedRow, setRows }) {
    const [roomName, setRoomName] = useState('');
    const [status, setStatus] = useState('');
    const [area, setArea] = useState('');
  
    useEffect(() => {
      if (selectedRow) {
        setRoomName(selectedRow.name);
        setStatus(selectedRow.status === "Đang hoạt động" ? "Đang hoạt động" : "Không hoạt động");
        setArea(selectedRow.area);
      }
    }, [selectedRow]);
  
    const handleEditRoom = () => {
      const updatedRoomData = {
        name: roomName,
        info: {
          status: status === "Đang hoạt động" ? 0 : 1,
          area: parseInt(area), 
        }
        
      };
  
      apartmentApi.editRoom(selectedRow.id, updatedRoomData)
        .then(() => {
          return apartmentApi.getAllApartments();
        })
        .then(response => {
          const updatedRooms = response.map(item => {
            const infoObject = JSON.parse(item.info);
            return {
              id: item.id,
              name: item.name,
              status: infoObject.status === 0 ? "Đang hoạt động" : "Không hoạt động",
              area: infoObject.area,
            };
          });
          setRows(updatedRooms);
        })
        .catch(error => {
          console.error("Error editing room or fetching updated rooms:", error);
        })
        .finally(() => {
          handleClose();
        });
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
          Sửa thông tin phòng
        </Typography>
        <Box>
          <TextField
            label="Tên phòng"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="subtitle1" gutterBottom>
            Trạng thái
          </Typography>
          <Select
            value={status === 0 ? 'Đang hoạt động' : 'Không hoạt động'}
            onChange={(e) => setStatus(e.target.value === 'Đang hoạt động' ? 0 : 1)}
            fullWidth
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            // margin="normal"
          >
            <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
            <MenuItem value="Không hoạt động">Không hoạt động</MenuItem>
          </Select>
          <TextField
            label="Diện tích"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
        <ThemeProvider theme={theme}> 
            <Button variant="contained" onClick={handleEditRoom}>
            Lưu 
            </Button>
        </ThemeProvider>
      </Box>
    </Modal>
  );
}

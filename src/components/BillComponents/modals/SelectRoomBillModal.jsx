import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import apartmentApi from '../../../api/apartmentApi';
import BillModal from './BillModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
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

export default function SelectRoomBillModal({ open, handleClose, onBillCreated }) {
  const [apartments, setApartments] = useState([]);
  const [openBill, setOpenBill] = useState(false);

  // room data
  const [room, setRoom] = useState({});

  useEffect(() => {
    if(!open) return;
    apartmentApi.getAllApartments().then(response => {

      const rooms = response.map(item => {
        // Parse chuỗi JSON từ trường 'info'
        const infoObject = JSON.parse(item.info);

        return {
          id: item.id,
          name: item.name,
          area: infoObject.area | 0,
          status: infoObject.status === 0 ? "Đang hoạt động" : "Không hoạt động",
          active: infoObject.status === 0,
        };
      });

      setApartments(rooms);

    }).catch(() => {

    })
  }, [open]);

  const handleCardClick = (card, isActive) => {
    if(!isActive) return;
    // Add your logic for handling card click, e.g., navigate to a different page
    console.log(`Clicked on card with id ${card.id}`);
    setRoom(card)
    setOpenBill(true);
  };

  const handleCloseBillModal = () => {
    setOpenBill(false);
  }

  return (
    <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Chọn phòng tạo phiếu
        </Typography>
        <br />
        <Grid container spacing={2}>
          {apartments.map((card) => (
            <Grid item key={card.id}>
              <Card
                variant="outlined"
                sx={{ borderColor: card.active ? 'green' : 'red', cursor: 'pointer' }}
                onClick={() => handleCardClick(card, card.active)}
              >
                <CardContent>
                    {card.name}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <br />
        <ThemeProvider theme={theme}>
          <Button sx={{
            backgroundColor: '#E8E8E8',
            color: '#2E2E2E',
            '&:hover': {
              backgroundColor: '#DCDCDC',
            },
          }} onClick={handleClose}>
            Hủy
          </Button>
        </ThemeProvider>
      </Box>
      
    </Modal>
    <BillModal open={openBill} onClose={handleCloseBillModal} onBillCreated={onBillCreated} roomData={room}></BillModal>
    </>
  );
}

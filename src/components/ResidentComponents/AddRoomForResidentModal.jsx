import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apartmentApi from '../../api/apartmentApi';
import pair_apartment_peopleAPI from '../../api/pairApartmentResidentAPI';

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

export default function AddRoomForResidentModal({ open, handleClose, residentId }) {
  const [apartments, setApartments] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    apartmentApi.getAllApartments().then(response => {

      const rooms = response.map(item => {
        // Parse chuỗi JSON từ trường 'info'
        const infoObject = JSON.parse(item.info);

        return {
          id: item.id,
          name: item.name,
          status: infoObject.status === 0 ? "Đang hoạt động" : "Không hoạt động",
          active: infoObject.status === 0,
        };
      });

      setApartments(rooms);

    }).catch(() => {

    });

    pair_apartment_peopleAPI.getAllPairs()
      .then(pairs => {
        const existingPair = pairs.find(pair => pair.id_people === residentId);
        if (existingPair) {
          setSelectedCardId(existingPair.id_apartment);
        }
      })
      .catch(error => {
        console.error('Error fetching pairs:', error);
      });
  }, [residentId]);

  const handleCardClick = (cardId, isActive) => {
    if (!isActive) return;
    setSelectedCardId(cardId);

    pair_apartment_peopleAPI.deletePair({
        id_people: residentId
      })
    .then(() => {
      // Add the new pair
      return pair_apartment_peopleAPI.createNewPair({
        id_apartment: cardId,
        id_people: residentId,
      });
    })
    .then(response => {
      // Handle the response if needed
    })
    .catch(error => {
      // Handle errors
      console.error('Error deleting old pair or creating new pair:', error);
    });
  };


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
          Chọn phòng 
        </Typography>
        <br />
        <Grid container spacing={2}>
          {apartments.map((card) => (
            <Grid item key={card.id}>
              <Card
                variant="outlined"
                sx={{ 
                  borderColor: card.active ? 'green' : 'red', 
                  cursor: card.active ? 'pointer' : 'not-allowed',
                  backgroundColor: selectedCardId === card.id ? '#4CAF50' : 'inherit', 
                  boxShadow: selectedCardId === card.id ? '0px 0px 5px 5px #4CAF50' : 'none',
                }}
                onClick={() => handleCardClick(card.id, card.active)}
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
    </>
  );
}

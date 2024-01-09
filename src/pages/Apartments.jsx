import RoomTable from '../components/ApartmentsComponents/RoomTable';
import { Container } from '@mui/material';
import Typography from "@mui/material/Typography";

export default function Apartments() {

  return (
    <Container component="main" sx={{ width: 1000 }}>
      <Typography component="h1" variant="h6"
        sx={{
          backgroundColor: '#DCF2F1',
          height: 40,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 4,
          boxShadow: 3,
          marginTop: 5,
          marginBottom: 2,
        }}>
        Danh sách phòng
      </Typography>

      <RoomTable />
    </Container>
  )
}

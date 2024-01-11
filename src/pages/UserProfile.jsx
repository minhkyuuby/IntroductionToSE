import React from 'react';
import { Container, Card, CardContent, Typography, Grid, AppBar, Toolbar, Chip, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
const MENU_STYLES = {
    color: 'white',
    bgcolor: 'transparent',
    border: 'none',
    px: '5px',
    borderRadius: '4px',
    '.MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover': {
        bgcolor: 'primary.50'
    }
}

export default function UserProfile() {
    return (
        <Container mt={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ width: 424, borderRadius: 6, backgroundColor: '#fff', mt: 2 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <div sx={{ ml: 3, width: '100%'  }}>
                        <AppBar position="static" sx={{ width: '100%', backgroundColor: '#7FC7D9', boxShadow: 'none', borderRadius: '4px' }}>
                            <Toolbar >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" sx={{  display: 'flex', alignItems: 'center' }}>
                                        <AccountCircleIcon sx={MENU_STYLES} />
                                        Profile
                                    </Typography>
                                    <Chip
                                        sx={MENU_STYLES}
                                        icon={<EditIcon />}
                                        label="Edit"
                                        onClick={() => { }}
                                    />
                                    <Chip
                                        sx={MENU_STYLES}
                                        icon={<LockIcon />}
                                        label="Change Password"
                                        onClick={() => { }}
                                    />
                                </Box>
                            </Toolbar>
                        </AppBar>
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={6}>
                                <div>
                                    <Typography variant="body2" color="textSecondary">Username</Typography>
                                    <Typography variant="body1" fontWeight={500}>Khoa </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <Typography variant="body2" color="textSecondary">Full Name</Typography>
                                    <Typography variant="body1" fontWeight={500}>Dinh Tri Khoa </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <Typography variant="body2" color="textSecondary">Birthday</Typography>
                                    <Typography variant="body1" fontWeight={500}>January 1, 1980</Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
};

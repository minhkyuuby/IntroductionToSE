import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

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

export default function PayModal({ isOpen, onClose = () => {}, onSubmit = () => {}, totalAmount = 0 }) {
    const [numberValue, setNumberValue] = useState(0);
    const [loanNumber, setloanNumber] = useState(totalAmount - numberValue);

    const handleInputChange = (event) => {
        let value = event.target.value;
        value = value.replace(/[^0-9]/g, '').replace(/^0+/, '');

        setNumberValue(value);
        setloanNumber(totalAmount-value);
    };

    const handleModalClose = () => {
        setNumberValue('');
        onClose()
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(numberValue, loanNumber);
        handleModalClose();
    };

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Nhập số tiền thanh toán
                    </Typography>
                    <br/>
                    <Typography component="h3">
                        Số tiền cần đóng: {totalAmount}
                    </Typography>
                    <br/>
                    <TextField
                            label="Enter a number"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={numberValue}
                            onChange={handleInputChange}
                        />
                    <Typography style={{marginTop: "25px"}}>
                        Số tiền nợ: {loanNumber}
                    </Typography>
                    <div>
                    <br/>
                        <Button
                            onClick={handleFormSubmit}
                            sx={{
                                border: 1,
                                marginRight: 2,
                            }}
                            autoFocus>
                            Xác nhận
                        </Button>
                        <Button
                            onClick={handleModalClose}
                            sx={{
                                backgroundColor: '#E8E8E8',
                                color: '#2E2E2E',
                                '&:hover': {
                                    backgroundColor: '#DCDCDC',
                                },
                            }}>
                            Hủy
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
import React, {useState, useEffect} from 'react';
import { Card, CardContent, Checkbox, FormControlLabel, TextField, Typography  } from '@mui/material';

const ServiceCard = ({ service, isSelected, onToggle, onQuantityChange, isDetail  }) => {

  const [quantity, setQuantity] = useState(service.quantity);

  // useEffect(() => {
  //   setQuantity(service.quantity)
  // }, [service])

  const handleQuantityChange = (e) => {
    if(isDetail) return;
    let value = e.target.value;

    // Check if the input is a positive number
    value = value.replace(/[^0-9]/g, '').replace(/^0+/, '');

    setQuantity(value)
    onQuantityChange(service.id, Number(value))
  }
  return (
    <Card key={service.id} variant="outlined" sx={{ mb: 1 }}>
      <CardContent>
        {isDetail? <Typography>{service.name}</Typography>
         : <FormControlLabel
          control={
            <Checkbox
              checked={isSelected}
              onChange={onToggle}
            />
          }
          label={`${service.name}`}
        />}
        <br/>
        + giá: {service.price} nghìn đồng/{service.unit}
        <TextField
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) =>  handleQuantityChange(e)}
          inputProps={{ min: 0 }}
          style={{ marginTop: '8px', marginLeft: '20px'}}
        />
      </CardContent>
      
    </Card>
  );
};

export default ServiceCard;
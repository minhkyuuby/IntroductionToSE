import React from 'react'
import ServiceTable from '../components/ServiceComponents/ServiceTable'
import { Button, Container } from '@mui/material'
import AddServiceModal from '../components/ServiceComponents/AddServiceModal.jsx'


export default function Services() {
  return (
    <Container>
      <div>
        Service Table
      </div>
      <AddServiceModal></AddServiceModal>
      <hr/>
    <ServiceTable/>
    </Container>
  )
}

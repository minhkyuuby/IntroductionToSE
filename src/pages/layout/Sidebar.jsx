import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router';


const sidebarItems = [
  { name: 'Dashboard', lable: 'Tổng quát', path: "/dashboard" }, 
  { name: 'Apartment', lable: 'Căn hộ', path: "/apartment" }, 
  { name: 'Service', lable: 'Dịch vụ', path: "/service" }, 
  { name: 'Resident', lable: 'Cư dân', path: "/resident" }, 
  { name: 'Vehicle', lable: 'Phương tiện', path: "/vehicle" }, 
  { name: 'Bill', lable: 'Hóa đơn', path: "/bill" },
  { name: 'TemporaryLeave', lable: 'Tạm vắng', path: "/temporaryLeaveTable"},
  { name: 'TemporaryResident', lable: 'Tạm trú', path: "/temporaryResidenceTable"}
]

const drawerWidth = 240;

const Sidebar = ({ highlightedItem = "Dashboard", onItemClick = ()=>{} }) => {
  const navigate = useNavigate();
  const handleOnClick = (item) => {
    navigate(item.path)
  }
  return (
    <Drawer variant="permanent" anchor="left" 
    sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}>
      <List style={{
        width: "90%"
      }}>
        {sidebarItems.map((item) => (
          <ListItem
            key={item.name}
            selected={highlightedItem === item.name}
            onClick={() => handleOnClick(item)}
            // style={{
            //   backgroundColor: "white",
            //   margin: "0.3em 0.5em",
            //   color: "black",
            //   borderRadius: "2em"
            // }}
          >
            <ListItemText primary={item.lable} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
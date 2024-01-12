
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
      <List>
        {sidebarItems.map((item) => (
          <ListItem
            key={item.name}
            selected={highlightedItem === item.name}
            onClick={() => handleOnClick(item)}
          >
            <ListItemText primary={item.lable} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
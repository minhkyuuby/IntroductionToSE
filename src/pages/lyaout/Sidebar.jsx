
import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';


const sidebarItems = ['Dashboard', 'Apartment', 'Service', 'Resident', 'Bill', ];

const drawerWidth = 240;

const Sidebar = ({ items = sidebarItems, highlightedItem = "Dashboard", onItemClick = ()=>{} }) => {
  return (
    <Drawer variant="permanent" anchor="left" 
    sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}>
      <List>
        {items.map((item) => (
          <ListItem
            key={item}
            selected={highlightedItem === item}
            onClick={() => onItemClick(item)}
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
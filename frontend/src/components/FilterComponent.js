import * as React from 'react';
import { useState, useEffect} from 'react';
import TuneIcon from '@mui/icons-material/Tune';

import {
  Box, 
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'

export default function FilterComponent({apartment, collection, setOrder}) {
  const filters = ['Overall Rating', 'Cleanliness', 'Proximity', 'Spaciousness', "Amenities", "Management"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [text, setText] = useState("Most Popular");
  const storageName = collection === "apartments" ? collection : `${collection}_${apartment}`;

  useEffect(() => {
    cacheFilters();
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    
  };


  const handleCloseNavMenu = (event) => {
    const filter = filterHelper(event.currentTarget.innerText);
    setText(filter);
    const obj = window.localStorage.getItem(`_${storageName}_${filter}`);
    setOrder(JSON.parse(obj));
    setAnchorElUser(null);
  };

  async function cacheFilters() {
    const promises = filters.map(async (filter) => {
      if (filter === "Overall Rating") {
        filter = "rating"
      }
      singleFilter(collection, filter.toLowerCase());
    });
    
    await Promise.all(promises);
  }

  async function singleFilter(collection, filter) {
    let apiCall = "";
    if (collection === "apartments") {
      apiCall = `https://${process.env.REACT_APP_HOSTNAME}/${collection}/${filter}`;
    } else {
      apiCall = `https://${process.env.REACT_APP_HOSTNAME}/${collection}/${apartment}/${filter}`;
    }

        await fetch(apiCall, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error();
          }
          return response.json();
        })
        .then((response) => {
            //if (window.localStorage.getItem(`_${storageName}_${filter}`) === null) {
              window.localStorage.setItem(`_${storageName}_${filter}`, JSON.stringify(response));
            //}
          })
        .catch((e) => {
          console.log(e);
        });
    }


  function filterHelper(filter) {
    //add error handler for invalid
    let lower = filter.toLowerCase();
    switch(lower) {
      case "overall rating": 
        lower = "rating";
        break;
      default:
        lower = filter.toLowerCase();
        break;
    }
    return lower;
  }

  return (
<Box sx={{ flexGrow: 0 }} marginTop={'12px'}>
  <Typography variant='body' style={{color: "#0495b2"}}>{text}</Typography>
  <Tooltip title="Open filters">
    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
      <TuneIcon style={{color: "#0495b2"}} fontSize="large"></TuneIcon>
    </IconButton>
  </Tooltip>
  <Menu
    sx={{ mt: '45px' }}
    id="menu-appbar"
    anchorEl={anchorElUser}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={Boolean(anchorElUser)}
    onClose={() => setAnchorElUser(null)}
  >
    {filters.map((filter) => (
      <MenuItem key={filter} sx={{backgroundColor: "#0495b2", color: 'white'}} onClick={handleCloseNavMenu}>
        <Typography textAlign="center">{filter}</Typography>
      </MenuItem>
    ))}
  </Menu>
</Box>
  );
}


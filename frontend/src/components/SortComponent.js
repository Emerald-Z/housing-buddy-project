import * as React from 'react';
import { useState } from 'react';
import SortIcon from '@mui/icons-material/Sort';

import {
  Box, 
  Tooltip,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Checkbox,
  Stack,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from '@mui/material'

export default function SortComponent({apartment, setOrder}) {
    let tagDefault = {
        cleanliness: false,
        management: false,
        parking: false,
        amenities: false,
        proximity: false,
        spaciousness: false
    }

  const tags = ['Cleanliness', 'Proximity', 'Spaciousness', "Amenities", "Management", "Parking"];
  const [tagValues, setTagValues] = useState(tagDefault);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [showTags, setShowTags] = useState([]);
  const [chipData, setChipData] = useState([]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.target);
    
  };


  const handleCloseNavMenu = (event) => {
    filterTags(showTags);
    setAnchorElUser(null);
  };

  const handleCheck = (event) => {
    const tag = event.target.id.toLowerCase();
    const prev = tagValues[tag]
    setTagValues({
        ...tagValues,
        [tag]: !prev
    });

    //set chips
    const obj = {key: `tag_${tag}`, label: tag};
    let curr = chipData;
    curr.push(obj);
    setChipData(curr);

    let selected = showTags;
    if (tagValues[tag] === false) {
        selected.push(tag)
    } else {
        var idx = selected.indexOf(tag);
        if (idx !== -1) {
            selected.splice(idx, 1)
        }
    }
    setShowTags(selected);
  }

  const handleDelete = (chipToDelete) => () => {
    let selected = showTags;
    var idx = selected.indexOf(chipToDelete.label);
    if (idx !== -1) {
        selected.splice(idx, 1)
    }
    setShowTags(selected);
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  async function filterTags(tags) {
    console.log(tags)
    if (tags === undefined || tags === "[]" || tags.length === 0) {
        tags = ['cleanliness', 'amenities', 'parking', 'spaciousness', 'rating', 'management'];
    }
    const stringTag = JSON.stringify(tags);
    const apiCall = `https://${process.env.REACT_APP_HOSTNAME}/review/${apartment}/tags/${stringTag}`;

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
            setOrder(response)
          })
        .catch((e) => {
          console.log(e);
        });
    }


  return (
<Box sx={{ flexGrow: 0 }} marginTop={'12px'}>
  <Tooltip title="Open filters">
  <IconButton onClick={handleOpenUserMenu}>
        <SortIcon sx={{ p: 0 }} style={{color: "#0495b2"}} fontSize="large"></SortIcon>
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
    onClose={handleCloseNavMenu}
    disableScrollLock
  >
    <MenuItem key="check_menu">
        <Stack>
            <Box sx={{display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',}}>
                {
                  (chipData !== undefined) &&(chipData.map((tag) => (
                    <Chip key={tag.key} id={tag.label} onDelete={handleDelete(tag)} sx={{color:"#0495b2", contrastText: "#0495b2"}} label={tag.label}/>
                )))
                }
            </Box>
            <Divider></Divider>
            <Box>
                <FormControl>
                <FormLabel>Tags</FormLabel>
                <FormGroup style={{overflow: 'auto'}}>
                {tags.map((tag) => (
                    <FormControlLabel
                        key={`check_${tag}`}
                        id={tag}
                        control={<Checkbox id={tag} key={tag} onClick={handleCheck} />}
                        label={tag}
                        labelPlacement='end'
                    />
                    ))}
                </FormGroup>
            </FormControl>

            </Box>
            <Button onClick={handleCloseNavMenu}>Save</Button>
        </Stack>
    </MenuItem>
  </Menu>
</Box>
  );
}


import React, { useEffect, useState } from "react";
import LayoutComponent from "../components/layout/LayoutComponent";
import {
    Grid,
    Button,
    Box,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Typography,
    FormControl,
    MenuItem,
    Select,
    Stack,
    InputLabel,
    FormHelperText,
    IconButton,
    CardActionArea,
} from "@mui/material"
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';


export default function ApartmentComparisonPage() {
    const stat_obj = {
        "rating": 0,
        "cleanliness": 0,
        "amenities": 0,
        "management": 0,
        "proximity": 0,
        "parking": 0,
        "spaciousness": 0,
    }

    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');
    const [stats1, setStats1] = useState(stat_obj);
    const [stats2, setStats2] = useState(stat_obj);
    const [stats3, setStats3] = useState(stat_obj);
    const [allApartments, setAllApartments] = useState([]);

    const [add, setAdd] = useState(false);

    const handleChange1 = (event) => {
        setFirst(event.target.value);
        getStats(event.target.value.toLowerCase(), 1);
    };

    const handleChange2 = (event) => {
        setSecond(event.target.value);
        getStats(event.target.value.toLowerCase(), 2);
    };

    const handleChange3 = (event) => {
        setThird(event.target.value);
        getStats(event.target.value.toLowerCase(), 3);
    };

    const navigate = useNavigate();

    useEffect(() => {
        getAllApartments();
    }, [])

    const navApartmentPage = (event) => {
        if (event.target.id !== '' || event.target.id !== undefined) {
            navigate(`/mainpage/${event.target.id.toLowerCase()}`);
        }
  
    }

    async function getAllApartments() {
        let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/apartments/name`;
    
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
            let appt = [];
            response.forEach((data) => {
                appt.push(data.name)
            })
              setAllApartments(appt);
            })
            .catch((e) => {
              console.log(e);
            });
        
        }

    async function getStats(name, number) {
        let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/${name}/stats`;
    
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
                if (number === 1) {
                    setStats1(response);
                } else if (number === 2) {
                    setStats2(response);
                } else {
                    setStats3(response);
                }
              })
            .catch((e) => {
              console.log(e);
            });

      }

      //move displays to render function only when first selected?
    
    const addThird = () => {
        setAdd(true);
    }

    const closeThird = () => {
        setAdd(false);
    }

    const display1 = Object.keys(stats1).map(stat => 
        <>
            <Typography key={`stat2_${stat}`} style={{ margin: 15 }} variant='h5'>{Number(stats1[stat]).toFixed(1)}</Typography>
            <Divider sx={{width: '100%', color: '#0495b2'}}></Divider>
        </>    )

    const display2 = Object.keys(stats2).map(stat => 
        <>
            <Typography key={`stat2_${stat}`} style={{ margin: 15 }} variant='h5'>{Number(stats2[stat]).toFixed(1)}</Typography>
            <Divider sx={{width: '100%', color: '#0495b2'}}></Divider>
        </>

    )

    const display3 = Object.keys(stats3).map(stat => 
        <>
            <Typography key={`stat2_${stat}`} style={{ margin: 15 }} variant='h5'>{Number(stats3[stat]).toFixed(1)}</Typography>
            <Divider sx={{width: '100%', color: '#0495b2'}}></Divider>
        </>    )
    
  return (
    <LayoutComponent>
        <Divider sx={{width:'100%', backgroundColor:'#0495b2', borderTopWidth: '2rem', top:0, marginBottom: '3rem'}}></Divider>
        <Grid container spacing={2}>
            <Grid item xs={3} display='flex' justifyContent='center'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div style={{ height: 50}}>
                            <Typography variant="h5" fontWeight={'bold'} color={'#0495b2'} display='flex' justifyContent={'center'} marginTop='115px'>Key Metrics</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent={'center'}>
                        <div style={{ height: 50, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" color={'#0495b2'} display='flex' justifyContent={'center'}>Overall Rating</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent={'center'}>
                        <div style={{ height: 50, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" color={'#0495b2'} display='flex'>Cleanliness</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent={'center'}>
                        <div style={{ height: 50, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" color={'#0495b2'} display='flex'>Amenities</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent={'center'}>
                        <div style={{ height: 42, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" color={'#0495b2'} display='flex'>Management</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent={'center'}>
                        <div style={{ height: 50, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" color={'#0495b2'} display='flex'>Proximity</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent={'center'}>
                        <div style={{ height: 42, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" color={'#0495b2'} display='flex'>Parking</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent={'center'}>
                        <div style={{ height: 50, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" color={'#0495b2'} display='flex'>Spaciousness</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12}><div style={{ height: 60}}></div></Grid>
                </Grid>
            </Grid>
            <Grid item xs={9} style={{ backgroundColor: '#F6F6F6' }}>
            <Grid container display='flex' justifyContent='center' alignItems='space-around'>
                    <Grid id="appt-1" display='flex' direction='column' justifyContent='center' item>
                        <FormControl sx={{ m: 1.5, minWidth: 140 }} >
                            <InputLabel id="demo-simple-0-disabled-label">Apartment 1</InputLabel>
                            <Select
                                labelId="demo-simple-select-disabled-label"
                                id="appt1select"
                                value={first}
                                label="First"
                                onChange={handleChange1}
                            >
                        
                        {
                            allApartments.map((name) => (
                                (name !== second) && (
                                    <MenuItem id={name} value={name}>{name}</MenuItem>
                            )
                            ))
                            
                        }
                            </Select>
                            <FormHelperText>Apartment 1</FormHelperText>
                        </FormControl>
                        {
                            (first !== '') ? (
                                <Card style={{backgroundColor:'white', marginLeft: '16px', marginRight: '16px', marginBottom:'10px', minWidth: '250px', borderRadius: '16px'}}>
                                <CardHeader
                                    title={<Typography fontSize={'1.7rem'} color='white' align='center' height={'1.5rem'} style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>{first}</Typography>}
                                    sx={{backgroundColor: '#0495b2', minHeight:'25px'}}
                                />
                                <CardContent style={{color: '#0495b2', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    {display1}
                                    <Button id={first} width='100%' align='center' sx={{marginTop: '10px', backgroundColor: '#0495b2', color: 'white'}} onClick={navApartmentPage}>Visit Page</Button>
    
                                </CardContent>
                            </Card>
                            ) : (
                                <Typography variant='body'>Please choose an apartment</Typography>
                            )
                        }
                    </Grid>
                    <Grid id="appt-2" display='flex' direction='column' justifyContent='flex-start' item>
                    <FormControl sx={{ m: 1.5, minWidth: 140 }}>
                        <InputLabel id="demo-simple-select-disabled-label">Apartment 2</InputLabel>
                        <Select
                        labelId="demo-simple-select-disabled-label"
                        id="appt2select"
                        value={second}
                        label="Second"
                        onChange={handleChange2}
                        >
                        {
                            allApartments.map((name) => (
                                (name !== first) && (
                                    <MenuItem id={name} value={name}>{name}</MenuItem>
                            )
                            ))
                            
                        }
                        </Select>
                        <FormHelperText>Apartment 2</FormHelperText>
                    </FormControl>
                    {
                            (second !== '') ? (
                                <Card style={{backgroundColor:'white', marginLeft: '16px', marginRight: '16px', marginBottom:'10px', minWidth: '250px', borderRadius: '16px'}}>
                                    <CardHeader
                                        title={<Typography fontSize={'1.7rem'} color='white' align='center' height={'1.5rem'} style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>{second}</Typography>}
                                        sx={{backgroundColor: '#0495b2', minHeight:'25px'}}
                                    />
                                    <CardContent style={{color: '#0495b2', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        {display2}
                                        <Button id={second} width='100%' align='center' sx={{marginTop: '10px', backgroundColor: '#0495b2', color: 'white'}} onClick={navApartmentPage}>Visit Page</Button>
        
                                    </CardContent>
                                </Card>
                            ) : (
                                <Typography variant='body'>Please choose an apartment</Typography>
                            )
                        }

                    </Grid>
                    <Grid item>
                        {
                            (add) ? (
                                <Stack direction='row'>
                                <Grid id="appt-3" item>
                                <FormControl sx={{ m: 1.5, minWidth: 140 }}>
                                    <InputLabel id="demo-simple-select-disabled-label">Apartment 3</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-disabled-label"
                                    id="appt3select"
                                    value={third}
                                    label="Third"
                                    onChange={handleChange3}
                                    >
                                    {
                                        allApartments.map((name) => (
                                            (name !== first && name !== second) && (
                                                <MenuItem id={name} value={name}>{name}</MenuItem>
                                        )
                                        ))
                                        
                                    }
                                    </Select>
                                    <FormHelperText>Apartment 3</FormHelperText>
                                </FormControl>

                                    <Card style={{backgroundColor:'white', marginRight: '16px', marginBottom:'10px', minWidth: '250px', borderRadius: '16px'}}>
                                        <CardHeader
                                            title={<Typography fontSize={'1.7rem'} color='white' align='center' height={'1.5rem'} style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>{third}</Typography>}
                                            sx={{backgroundColor: '#0495b2', minHeight: '25px'}}
                                        />
                                        <CardContent style={{color: '#0495b2', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>   
                                            {display3}
                                            <Button id={third} width='100%' align='center' sx={{marginTop: '10px', backgroundColor: '#0495b2', color: 'white'}} onClick={navApartmentPage}>Visit Page</Button>

                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item marginTop={'15px'}>
                                    <IconButton>
                                        <CloseIcon style={{color: "#0495b2"}} fontSize="large" onClick={closeThird} />
                                    </IconButton>
                                </Grid>
                                </Stack>
                            ) : (
                                <IconButton>
                                    <AddIcon style={{color: "#0495b2"}} fontSize="large" onClick={addThird}></AddIcon>
                                </IconButton>

                            )
                        }
                    </Grid>
                    
                </Grid>
            </Grid>
        </Grid>
    </LayoutComponent>
  );
}
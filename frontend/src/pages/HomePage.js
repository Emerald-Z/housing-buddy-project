import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import ListApartmentComponent from "../components/ListApartmentComponent";
import AddApartmentModal from "../components/AddApartmentModal";
import FilterComponent from "../components/FilterComponent";
import LayoutComponent from "../components/layout/LayoutComponent";
import { shadows } from '@mui/system';

import {
    Box,
    Card,
    Grid,
    Link,
    Divider,
    Stack,
    IconButton,
    CardActionArea,
    Button
} from "@mui/material"

import AddIcon from '@mui/icons-material/Add';

import { useNavigate } from "react-router-dom";

const StyleBox = styled.div` 
  display: flex;
  justify-content: 'center';
  margin-left: 10%;
  margin-right: 10%,
  padding: auto;
  margin-top: 2%;
  margin-bottom: 4%;
  overflow: 'hidden';
  position: 'relative';
`;

export default function AllApartments() {
    const navigate = useNavigate();

    const [allApartments, setAllApartments] = useState([]);
    //const [order, setOrder] = useState([]); //default order

    useEffect(() => {
        getAllApartments();
        //setOrder(allApartments);
    }, []);

    const navApartmentPage = (event) => {
      navigate(`/mainpage/${event.target.id.toLowerCase()}`); //bugs out for cards

    }

    async function getAllApartments() {
        let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/apartments/rating`;
    
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
                let apartments = [];
                response.forEach((data) => {apartments.push(data)})
                setAllApartments(apartments);
              })
            .catch((e) => {
              console.log(e);
            });
        }

const nineCards = allApartments.slice(0, 9);
  
return (
  <LayoutComponent>
      <Card
        sx={{
            position: 'relative',
            color: '#0495B2',
            mb: 0,
            backgroundSize: 'cover',
            width: '100%',
            height: '50rem',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${process.env.PUBLIC_URL}/final_home_pg.jpg)`,
        }}>
        <CardActionArea>
            <Button sx={{marginLeft: '5rem', marginTop: '40rem', width: '30%', backgroundColor: '#0495b2', color: 'white'}}
              onClick={() => navigate('/allapartments')}>View All Apartments</Button>
        </CardActionArea>
      </Card>
        {/* Increase the priority of the hero background image */}
        {/*<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />*/} 
        {/* <img src='/final_home_pg.jpg' height='100%' width='100%' alt="bg-img"></img> */}
        <Grid display='flex' justifyContent='center' height='5rem'>
        <Stack sx={{border: 1, borderColor: 'white', borderRadius: 5, width: '85%', height: '100%', boxShadow: 8,}} direction="row" container alignItems='center' justifyContent="space-between">
          <AddApartmentModal txt="Apartment Request Form"/>
          <FilterComponent collection="apartments" setOrder={setAllApartments}></FilterComponent>
        </Stack>
        </Grid>
        <Divider color="#0495b2" sx={{ borderBottomWidth: 15 }}></Divider>

        <Box sx={{marginTop: '20px', marginBottom: '20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={false} sm={1}/>
            <Grid item xs={12} sm={10}>
              <Grid container spacing={3}>
                  {nineCards.map((obj) => (
                      <ListApartmentComponent
                        key={obj.name}    
                        name={obj.name}  
                        handleOnClick={navApartmentPage}
                        backgroundImage={obj.img_link} 
                      />
                    ))}
              </Grid>
            </Grid>
            <Grid item xs={false} sm={1}/>
            </Grid>
        </Box>
      <Grid justifyContent={'center'} display='flex' marginBottom='5rem' marginTop='2rem' item>
          <Link href='/allapartments' color={'#0495B2'}>View All Apartments</Link>
      </Grid>
  </LayoutComponent>

);
}
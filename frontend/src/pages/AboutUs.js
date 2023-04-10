import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import ListApartmentComponent from "../components/ListApartmentComponent";
import AddApartmentModal from "../components/AddApartmentModal";
import FilterComponent from "../components/FilterComponent";
import LayoutComponent from "../components/layout/LayoutComponent";
import Logo from "../logo.png"
import {
    Box,
    Grid,
    Link,
    Divider,
    Stack,
    Typography,
    Button,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material"

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useNavigate } from "react-router-dom";


export default function AboutUs() {
    const navigate = useNavigate();
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);

return (
  <LayoutComponent>
        <Grid display="flex"
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          rows={{ sm: 1, md: 2}}
          >
          <Grid width='50%' margin='20px' display="flex" sm={12} md={6}
                flexDirection='column' item>
                  <Typography variant="h4" fontWeight={'bold'} color={'#0495b2'} align='center'>About Us</Typography>
                  <Typography color={'#0495b2'} variant="body1" paragraph={true} sx={{margin: 10, marginLeft: "10%"}}>
                  Housing Buddy is a one stop solution for helping UT students find accessible West Campus housing that meets their needs. As housing becomes more expensive and the timeframe of being able to secure top quality housing shrinks from year to year, students needed a place to be able to quickly compare the pros and cons of each apartment choice to make a final decision effectively and quickly. Thus, Housing Buddy serves to be a place where students can review apartment buildings that they've stayed in and learn more about their prospective homes for the future.
                  </Typography>
                  <Button variant="contained" href="mailto:housingbuddy@gmail.com" style={{backgroundColor: '#0495B2', fontWeight:'bold', fontFamily:'sans-serif', height: 60, width: "70%", marginLeft: "15%"}} color="primary">Contact Us</Button>

          </Grid>
          <Grid width='50%' margin='20px' display="flex" sm={12} md={6}
                flexDirection='column' item>
                  <img src={Logo} style = {{margin: 10, marginTop: 50}} />
          </Grid>
          
        </Grid>
        <Grid
          direction="row"
          alignItems="center"
          marginTop="20px"
          sx={{backgroundColor: "#EEEEEE"}}>
          <Grid  display="flex"
                flexDirection='column' alignItems="center" item>
                  <Typography variant="h4" margin="20px" fontWeight={'bold'} color={'#0495b2'} align='center'>Frequently Asked Questions</Typography>

          
      <div style = {{width: "80%", margin: 10}}>
      <Accordion  rounded sx={{
        width: "100%",
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
      }}>
        <AccordionSummary
          expandIcon={<AddIcon sx={{color: "#0495b2"}} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5" fontWeight={'bold'} color={'#0495b2'} align='center'>How do I add a review to Housing Buddy?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Navigate to the specific apartment page using the search feature or the All Apartments list and click the create review button to add your experience. Note: Only 1 review is allowed per apartment per user.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion  rounded  sx={{
        width: "100%",
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
      }}>
        <AccordionSummary
          expandIcon={<AddIcon sx={{color: "#0495b2"}} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h5" fontWeight={'bold'} color={'#0495b2'} align='center'>If I lived in an apartment not listed, how can I add a review?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            On the home page, click the Apartment Request Form button to submit a new apartment request. In 5-7 business days, the team will approve and allocate a new page for you to add your review.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion  rounded sx={{
        width: "100%",
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
      }}>
        <AccordionSummary
          expandIcon={<AddIcon sx={{color: "#0495b2"}} />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography variant="h5" fontWeight={'bold'} color={'#0495b2'} align='center'>How can I filter through the apartments and reviews across Housing Buddy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          On the home page, use the filters related to the apartments popularity on different metrics to see what apartments are best reviewed. On the individual apartment pages, you can filter by the content of the reviews based on what the review was tagged with.         
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
          </Grid>
       

        </Grid>

  </LayoutComponent>

);
}
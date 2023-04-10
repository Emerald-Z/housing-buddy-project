import {
    Grid,
    Card,
    Button,
    Typography,
    CardContent,
    CardActionArea
} from "@mui/material"
//import './fonts.css';
import { shadows } from '@mui/system';
import { useNavigate } from "react-router-dom";

export default function ListApartmentComponent({name, handleOnClick, backgroundImage}) {

    return (
    <Grid sx={{display: 'flex', justifyContent: 'center', mb: 2}} item xs={4} sm={6} md={4}>
        <Card id={name} sx={{
            width: '80%',
            height: '110%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'content-box',
            textAlign: 'center',
            overflow: 'hidden',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            borderRadius: '25px',
            boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.3)',
        }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography component='h3' variant="h3" color='white' fontWeight={'bold'} sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1)', marginTop:'2rem'}}>
                    {name}
                </Typography>
            </CardContent>
            <CardActionArea sx={{margin: '10px'}}>
                <Button id={name} variant="contained" onClick={handleOnClick} sx={{ backgroundColor: '#0495b2', mt: 2 }}>
                    Visit Page
                </Button>
            </CardActionArea>
        </Card>
    </Grid>
  );
}
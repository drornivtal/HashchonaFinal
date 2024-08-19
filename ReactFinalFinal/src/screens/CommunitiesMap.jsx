
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CommunityContext } from "../contexts/CommunityContextProvider";

import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import IconLocation from '../components/IconLocation.jsx'; 

import LogoHashcuna_Black from "../components/LogoHashcuna_Black";

export default function CommunitiesMap() {

    const { communities } = useContext(CommunityContext);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const filteredCommunities = communities.filter((community) =>
        community.name.includes(searchTerm)
    );

    const MyIconIconLocationHtml = renderToStaticMarkup(<IconLocation style={{ width: '30px', height: '30px' }} />);
    const customIcon = L.divIcon({
        html: MyIconIconLocationHtml,
        iconSize: [30, 30], 
        className: 'custom-leaflet-icon', 
      });

    const NewComButtonStyleNewCommunity= {

        backgroundColor: '#EBD5A0',
        color: 'black',
        width: '60vw', 
        height: '50px', 
        fontWeight: 500,
        fontSize: 15, 
       borderRadius: '30px', 
        textTransform: 'none', // Prevents text from being capitalized
           '&:hover': {
        backgroundColor: '#EBD5A0', // Keeps the same background color on hover
           },
           '&:active': {
        backgroundColor: '#EBD5A0', // Keeps the same background color on click
        boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.5)', // Moi click effect (white fade)
           },
           '&:focus': {
       backgroundColor: '#EBD5A0', // Keeps the same background color when focused
           },                                         
    };  

    let regularRegisterObj = {
        isManager: false,
        inpCssClass: 'inpYellow',
        selectCssClass: 'selectYellow',
        imgInputColor: '#DABB80',
        btnCssId: 'btnToRegYellow',
        inpAboutCssId: 'inpAboutYellow',

        bgColor:'#EBD5A0',
        btnText: 'הרשמה'
    };
    
    let managerRegisterObj = {
        isManager: true,
        inpCssClass: 'inpPurple',
        selectCssClass: 'selectPurple',
        imgInputColor: '#9274B2',
        btnCssId: 'btnToNextLevelPurple',
        inpAboutCssId: 'inpAboutPurple',
        
        bgColor:'#BAA1D4',
        btnText: 'לשלב הבא'
    };
    const selectExistCommunity = (communityId) => {
        navigate('/Register', { state: { ...regularRegisterObj, communityId: communityId } });
    };

    return (
        <Container
            sx={{ height: '90vh', width: '80vw', display: 'flex', flexDirection: 'column' }}>

                      {/* Logo Svg Box */}
                      <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: '14vh',
                            }}>
                            <LogoHashcuna_Black  sx={{height:'14vh', width: '35vw'}} />
             </Box> 
    
            {/* searchTerm Box */}
            <Box
                sx={{ height: '7vh', width: '100%', display: 'flex', flexDirection: 'column',
                      alignItems: 'center',marginTop:'1vh'}}
            >
                <TextField

                    // label="מצא קהילה באזור"
                    // variant="outlined" 
                    // className="inpPurple"

                    variant="standard"
                    placeholder="מצא קהילה באזור"
                    value={searchTerm}
                    // color="secondary"                    
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ direction: 'rtl', }}
                />
            </Box>

            {/* map display Box */}
            <Box sx={{ height: '56vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <MapContainer center={[31.801447, 34.643497]} zoom={7} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {filteredCommunities.map((community) => (
                        <Marker
                            key={community.communityId}
                            icon={customIcon}
                            position={
                                [community.coordinates.latitude, community.coordinates.longitude]}
                        >
                            <Popup >
                                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                    <Typography variant="h1" sx={{ fontSize: 16,textAlign: 'center'}}>{community.name}</Typography>
                                     <Avatar 
                                    sx={{ backgroundColor: '#EBD5A0', width: 45, height: 45 ,color:'black',marginTop:'1.5vh'}}
                                    src={community.primaryPic||'A'}
                                    /> 


                                    <Button
                                        sx={{
                                            border: '1px solid black',
                                             color: "black",
                                            borderRadius: 10,
                                            marginTop: '10%',
                                            height: '4vh'
                                        }}
                                        onClick={() => selectExistCommunity(community.communityId)}
                                    >בחירת קהילה</Button>
                                </Box>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Box>

            {/* newCommunity btn Box */}
            <Box
                sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4vh' }}
            >
                <Button
                    variant='contained'
                    type='button'
                    // id='btnNewCommunity'
                    sx={NewComButtonStyleNewCommunity}
                    onClick={() => (navigate('/Register', { state: managerRegisterObj }))}
                >
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <Typography variant="body1" sx={{ fontSize: 15}}>{'?אין קהילה באזורך'}</Typography>
                    <Typography variant="body1" sx={{ fontSize: 15}}>{'לפתיחת קהילה חדשה'}</Typography>
                    </Box>

                </Button>
            </Box>
        </Container>
    );
};


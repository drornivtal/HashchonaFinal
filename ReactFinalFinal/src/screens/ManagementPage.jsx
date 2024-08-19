

import React, { useState, useEffect} from 'react';
// import { CommunityContext } from '../contexts/CommunityContextProvider';
import {
  Drawer, List, ListItem, ListItemText, Avatar, Box, Typography, IconButton, ListItemIcon,
  Divider,
  Skeleton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import UsersPending from './UsersPending';
import UsersInCommunity from './UsersInCommunity';
import CommunityDetails from './CommunityDetails';
import { getReqAllCommunities } from '../utilities/ApiUtilities';
import LogoHashcuna_Black from '../components/LogoHashcuna_Black';

const CommunityDrawer = () => {


  const managerCommunity = JSON.parse(localStorage.getItem('userCommunityId'));
  const managerDetails = JSON.parse(localStorage.getItem('user'));

  const [communityDetails, setCommunityDetails] = useState(null);


  const [selectedOption, setSelectedOption] = useState('');
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  async function fetchAndSetCommunities() {
      try {  
          const fetchedCommunities = await getReqAllCommunities();
          setCommunityDetails(fetchedCommunities.find((community) => community.communityId === managerCommunity) || null)
      } catch (error) {
          console.error('Error fetching communities:', error.message);
      }finally {
        setTimeout(() => {
            setLoading(false);
        }, 1000)  
    }
  }
    fetchAndSetCommunities();
}, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setTimeout(() => setOpen(false), 100);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'join':
        return <UsersPending/>
      case 'members':
        return <UsersInCommunity/>
      case 'details':
        return <CommunityDetails />
    }
  };

  return (
    loading? 
    <>
      <Box sx={{direction: 'rtl',position: 'absolute', top: 20, right: 90 }}>
                          <Skeleton variant="rounded" width={120} height={40} animation="wave" sx={{borderRadius:'10px',marginTop:'2vh',marginRight:'-5vh'}}/>

                          <Skeleton variant="circular" width={55} height={55} animation="wave" sx={{marginTop:'6.5vh'}}/>
                          
                          <Skeleton variant="rounded" width={50} height={12} animation="wave" sx={{borderRadius:'10px',marginTop:'3vh'}}/>
                          <Skeleton variant="rounded" width={80} height={12} animation="wave" sx={{borderRadius:'10px',marginTop:'1vh',marginRight:'-2vh'}}/>
                          <Skeleton variant="rounded" width={110} height={12} animation="wave" sx={{borderRadius:'10px',marginTop:'1vh',marginRight:'-4vh'}}/>
                          
                          <Skeleton variant="rounded" width={130} height={28} animation="wave" sx={{borderRadius:'10px',marginTop:'10vh',marginRight:'-5.5vh'}}/>
                          <Skeleton variant="rounded" width={130} height={28} animation="wave" sx={{borderRadius:'10px',marginTop:'2vh',marginRight:'-5.5vh'}}/>
                          <Skeleton variant="rounded" width={130} height={28} animation="wave" sx={{borderRadius:'10px',marginTop:'2vh',marginRight:'-5.5vh'}}/>
                          <Skeleton variant="rounded" width={130} height={28} animation="wave" sx={{borderRadius:'10px',marginTop:'2vh',marginRight:'-5.5vh'}}/>
                          <Skeleton variant="rounded" width={130} height={28} animation="wave" sx={{borderRadius:'10px',marginTop:'2vh',marginRight:'-5.5vh'}}/>
      </Box>                    
      <Box sx={{direction: 'rtl',position: 'absolute', top: -20, left: 0 }}>
                             <Skeleton variant="rounded" width={130} height={685} animation="wave" sx={{borderRadius:'10px',marginTop:'2vh',marginRight:'-5.5vh'}}/>
      </Box>                    
                  
    </>
    :<Box sx={{ Height: '90vh',width:'80vw' }}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setOpen(true)}
        sx={{ position: 'absolute', top: 16, right: 16 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          BackdropProps: {
            sx: {
            //   backgroundColor: '#708DD3',
              backgroundColor: '#90A9DF',
              
            },
          },
        }}
        sx={{
          '& .MuiDrawer-paper': {
            // width: 240,
            width:'64vw',
            fontSize: 14,
            borderTopLeftRadius:'25px',
            borderBottomLeftRadius:'25px'
          },
        }}
      >
         {/* Logo Svg Box */}
            <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: '10vh',
                                marginTop: '4vh',
                            }}>
                            <LogoHashcuna_Black  sx={{height:'10vh', width: '30vw'}} />
            </Box> 
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right', padding: 2 }}>

           
            {/* Details Box */}
            <Box sx={{ display: 'flex', flexDirection: 'column',
                alignItems: 'center', textAlign: 'center',
                height: '25vh',width:'55vw'}}>
                 
                 <Avatar alt="Community" src={communityDetails?communityDetails.primaryPic:''} sx={{ height:75,width:75,marginTop:'0.2vh' }} />

                 <Box sx={{ display: 'flex', flexDirection: 'column',alignItems: 'center', textAlign:'center',
                             height: '12vh',width:'50vw',marginTop:'1.8vh'   
                  }}>
                    <Typography variant='body2' sx={{ fontSize: 16,width:'100%',  }}>
                        {' ,שלום'}
                    </Typography>    
                    <Typography variant='body1' sx={{ fontSize: 16,width:'100%',  }}>
                        {/* {'אלי אליהו יעקובוביץ'} */}
                        {/* {'ניב אסרף'} */}
                        {managerDetails.user.firstName+' '+managerDetails.user.lastName}
                    </Typography>    
                    <Typography variant='body2' sx={{ fontSize: 15.5,width:'100%', color:'grey',marginTop:'0.5vh'}}>
                     {/* {`מנהל קהילה: אשדודים רובע יא`} */}
                     {'מנהל קהילה: '+(communityDetails?communityDetails.name:'')}
                    </Typography>    
                </Box>
            </Box>
               
                <Divider sx={{ borderColor: '#90A9DF', width: '100%', marginBottom:'3vh',marginTop:'2vh'}} />
                
          
          <List sx={{marginRight:'5.5vw'}} >
            {/* -------------------------------------- */}
            <ListItem
            //   button
              onClick={() => handleOptionClick('join')}
              sx={{
                color: selectedOption === 'join' ? 'white' : 'black',
                backgroundColor: selectedOption === 'join' ? '#90A9DF' : 'transparent',
                display: 'flex',
                flexDirection: 'row', 
                direction:'rtl',
                textAlign:'right',
                alignItems: 'center',
                borderRadius:'8px',
                boxShadow: selectedOption === 'join' ?'0px 4px 8px rgba(0, 0, 0, 0.1)':'',

                '&:hover': {
                  backgroundColor: '#4A6EBB',
                  transition: 'background-color 0.1s',
                },
              }}
            >
              <ListItemIcon sx={{ color: selectedOption === 'join' ? 'white' : 'black',marginLeft:-2.8 }}>
                <PersonAddIcon />
              </ListItemIcon>              
            <ListItemText
            primary="ממתינים לאישור"
            primaryTypographyProps={{
            sx: {fontSize: 14}
            }} />
            </ListItem>
            {/* -------------------------------------- */}
            <ListItem
            //   button
              onClick={() => handleOptionClick('members')}
              sx={{
                display: 'flex',
                flexDirection: 'row', 
                direction:'rtl',
                textAlign:'right',
                alignItems: 'center',
                borderRadius:'8px',
                boxShadow: selectedOption === 'members' ?'0px 4px 8px rgba(0, 0, 0, 0.1)':'',
                color: selectedOption === 'members' ? 'white' : 'black',
                // backgroundColor: selectedOption === 'members' ? '#708DD3' : 'transparent',
                backgroundColor: selectedOption === 'members' ? '#90A9DF' : 'transparent',
                '&:hover': {
                  backgroundColor: '#4A6EBB',
                  transition: 'background-color 0.1s',
                },
              }}
            >
              <ListItemIcon sx={{ color: selectedOption === 'members' ? 'white' : 'black',marginLeft:-2.8 }}>
                <GroupIcon />
              </ListItemIcon>
             
              <ListItemText
            primary="חברי הקהילה"
            primaryTypographyProps={{
            sx: {
                fontSize: 14}
            }} />
            </ListItem>
            {/* -------------------------------------- */}
            <ListItem
            //   button
              onClick={() => handleOptionClick('details')}
              sx={{
                color: selectedOption === 'details' ? 'white' : 'black',
                backgroundColor: selectedOption === 'details' ? '#90A9DF' : 'transparent',
                display: 'flex',
                flexDirection: 'row', 
                direction:'rtl',
                textAlign:'right',
                alignItems: 'center',
                borderRadius:'8px',
                boxShadow: selectedOption === 'details' ?'0px 4px 8px rgba(0, 0, 0, 0.1)':'',

                '&:hover': {
                  backgroundColor: '#4A6EBB',
                  transition: 'background-color 0.1s',
                },
              }}
            >
              <ListItemIcon sx={{ color: selectedOption === 'details' ? 'white' : 'black',marginLeft:-2.8 }}>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText
            primary="פרטי הקהילה"
            primaryTypographyProps={{
            sx: {
                fontSize: 14
            }
            }} />
            </ListItem>
            {/* -------------------------------------- */}
          </List>

          <Box sx={{marginTop:'2vh',marginRight:'5.5vh'}}><Link to="/Profile" 
          color="inherit"
          underline="always" rel="noopenernoreferrer" 
          
          >חזרה לפרופיל האישי</Link>
        </Box>
        </Box>
      </Drawer>

      <Box
        sx={{
          backgroundColor: open ? 'rgba(112, 141, 211, 0.5)' : 'transparent',
          transition: 'background-color 0.3s',
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default CommunityDrawer;

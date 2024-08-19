
import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, TextField, IconButton, Paper, Container, Divider, Button, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { getReqAllCommunities, postAndPutReqFunction } from '../utilities/ApiUtilities';
import { createSnackbar, handleFileChangeGeneral } from '../utilities/FunctionsUtilities';
import { useNavigate } from 'react-router-dom';


 export default function CommunityDetails() {

  const editApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/Communities/UpdateCommunityDetails`;

  const navigate = useNavigate();

  const [communityDetails, setCommunityDetails] = useState(null);
  const managerCommunity = JSON.parse(localStorage.getItem('userCommunityId'));

  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [snackHideDuration, setSnackHideDuration] = useState(4000);

   // Original states
   const [originalImage, setOriginalImage] = useState('');
   const [originalDescription, setOriginalDescription] = useState('');
 
   // Temporary states for editing
   const [tempImage, setTempImage] = useState('');
   const [tempDescription, setTempDescription] = useState('');
 
   const handleUpdateDetails = () => {
    if ((tempImage !== originalImage && tempImage!== null)|| (tempDescription !== originalDescription)) {
      console.log("I am on the server");
      EditCommunityDetails();
    } 
  };

  useEffect(() => {
      async function fetchAndSetCommunities() {
        try {
          const fetchedCommunities = await getReqAllCommunities();
          const community = fetchedCommunities.find(community => community.communityId === managerCommunity) || null;
          setCommunityDetails(community);
          
          if (community) {
            setOriginalImage(community.primaryPic);
            setOriginalDescription(community.description);
            setTempImage(community.primaryPic);
            setTempDescription(community.description);
          }
          
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch communities:', error);
        }
      }

      fetchAndSetCommunities();
    }, [managerCommunity]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    if (tempDescription.length < 10 ) {
      setErrorMessage('יש להזין לפחות 10 תווים');
      return;
    }
    setEditMode(false);
    setErrorMessage('');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      let tempUrl=handleFileChangeGeneral(file,setTempImage);
    }
  };

  const handleFocus = (e) => {
    const len = e.target.value.length;
    e.target.setSelectionRange(len, len);
  };
  
  const EditCommunityDetails= async ()=>{

    setLoadingButton(true);

    let jsonObjToPutForEdit = {
      "communityId": managerCommunity,
      "name": communityDetails.name,
      "city": communityDetails.city,
      "location": communityDetails.location,
      "description": tempDescription,
      "primaryPic": tempImage,
      "status": communityDetails.status
    };
    try {
        console.log({jsonObjToPutForEdit});
        let response = await postAndPutReqFunction(jsonObjToPutForEdit, editApi, 'PUT');

        if (response){
          setTimeout(() => {
                   setOriginalImage(tempImage);
                  setOriginalDescription(tempDescription);
                  setLoadingButton(false);
                  setOpenSnackbar(true);
                  setSnackbarMessage('!הפרטים עודכנו בהצלחה');
                  setSnackbarSeverity('success');
                  setSnackHideDuration(2000);
                }, 1000) 
        }
    } catch (error) {
      setTimeout(() => {
        setLoadingButton(false);
        console.error('Error in fetch:', error.message);
        setOpenSnackbar(true);
        setSnackbarMessage('אופס! משהו השתבש... נסו שנית מאוחר יותר');
        setSnackbarSeverity('error');
        setSnackHideDuration(2000);
      }, 1000)
    }
  };

  return (
    <Container sx={{display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width:'80vw',height:'90vh'}}>

          {/* Hader Box --8-- */}
        <Box sx={{display: 'flex', flexDirection: 'column',alignItems:'center', 
                  height: '3vh', width:'100%',marginTop:'5vh'}}>
                      <Typography
                              variant="body1"
                              sx={{textAlign: 'center', fontSize:16.5}}>
                                  {'פרטי הקהילה'} 
                          </Typography> 
        </Box>
        
        {/* Details Paper */}
        <Paper 
          elevation={3}
          sx={{ pr: 1, pl:1, bgcolor: '#f2f2f2', width:'100%', height:'76vh', marginTop:'6vh',
                display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius:'12px',
              }}>

                  {/* Paper --> Img Box */}
                  <Box position="relative" sx={{with:'100%',height:'21vh', backgroundColor:''}}>
                      <Avatar
                        src={tempImage}
                        sx={{ width: 100, height: 100, marginTop:'5vh'}}
                      />
                      <IconButton
                        component="label"
                        sx={{
                          position: 'absolute',
                          top: 117,
                          right: 6.5,
                          color: 'black',
                          padding: 0,
                          zIndex: 1,
                        }}
                      >
                        <CameraAltIcon sx={{ fontSize: 18 }} />
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={handleImageChange}
                        />
                      </IconButton>
                  </Box>
                  
                  {/* Paper --> CommunityName Box */}
                  <Box sx={{ with:'100%',height:'10vh',marginTop:'3vh',backgroundColor:'' }}>
                    <Typography variant="h1" sx={{fontSize:17,marginBottom:'1vh'}}>שם הקהילה</Typography>
                    <Typography variant="body2"sx={{fontSize:16}}>{communityDetails?communityDetails.name:''} </Typography>
                  </Box>

                  {/* Paper --> CommunityAddress Box */} 
                  <Box sx={{ with:'100%',height:'10vh',marginTop:'1vh',backgroundColor:'' }}>
                    <Typography variant="h1" sx={{fontSize:17,marginBottom:'1vh'}}>כתובת</Typography>
                    <Typography variant="body2"sx={{fontSize:16}}>{communityDetails?communityDetails.location:''}</Typography>
                  </Box>
                  <Divider sx={{ borderColor:'GrayText', width: '70%', marginTop:'1vh'}} />

                  {/* Paper --> CommunityDescription paper */} 
                  <Paper
                    sx={{
                      width: '100%',
                      height:'20vh',
                      p: (editMode?0:2),
                      marginTop:'1vh',
                      position: 'relative',
                      backgroundColor:'#f2f2f2',
                      border:'1px solid #f2f2f2',
                      borderRadius:'10px'
                    }}
                    elevation={editMode ? 4 : 0}
                  >
                    <Typography variant="h1" sx={{fontSize:17,marginBottom:'2vh'}}>תיאור</Typography>
                    {editMode ? (
                      <>
                      <TextField
                        variant="outlined"
                        fullWidth   
                        value={tempDescription}
                        onChange={(e) => setTempDescription(e.target.value)}
                        autoFocus
                        multiline
                        minRows={1}
                        maxRows={3}
                        onFocus={handleFocus}
                        inputProps={{ maxLength: 100,with:'80%' }}
                        sx={{
                          textAlign:'right',
                          backgroundColor:'#f2f2f2',
                          border: 'none',
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                          direction: 'rtl',
                          fontSize:12,
                          justifyContent:'initial'
                        }}
                      />
                    
                      {errorMessage && tempDescription.length<10 &&<Typography variant='body1' color="error" sx={{ textAlign: 'center', marginTop: '0vh', fontSize:13.5}}>{errorMessage}</Typography>}
                      </>
                    ) : (
                        <Typography variant="body2" sx={{fontSize:15.5}}>{tempDescription}</Typography>
  
                    )}
                    <IconButton
                      onClick={editMode ? handleSaveClick : handleEditClick}
                      sx={{ position: 'absolute', top: 8, left: 8 }}
                    >
                      {editMode ? <SaveIcon sx={{fontSize:21,color:'black'}}/> : <EditIcon sx={{fontSize:21,color:'black'}}/>}
                    </IconButton>
                  </Paper>
                  
                  {/* Paper --> Edit Button */} 
                  <Box sx={{ with:'80%',height:'9vh',marginTop:'5vh',marginBottom:'0vh',backgroundColor:'' }}>

                  {loadingButton?<CircularProgress color="inherit" size={24} sx={{width:'100%'}} />:
                  <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateDetails}
                        sx={{height:'5vh',borderRadius:'10px'}}
                      >
                     <Typography variant="body1" sx={{fontSize:15}}>{'עדכון פרטים'}</Typography>
                 </Button>}
                   </Box>
        </Paper>

        {
                createSnackbar({
                    open: openSnackbar,
                    message: snackbarMessage,
                    severity: snackbarSeverity,
                    onClose: () => setOpenSnackbar(false),
                    autoHideDuration:snackHideDuration
                })
            }

    </Container>
  );
};




import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Box, Button, CircularProgress, Container, Divider, Grid, IconButton, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";

import { newCommunitySchema } from '../utilities/YupSchemas';

import { citiesList } from "../utilities/ListsUtilities";

import { postAndPutReqFunction } from "../utilities/ApiUtilities";
import { createSnackbar, handleFileChange } from "../utilities/FunctionsUtilities";
import { PhotoCamera } from "@mui/icons-material";
import LogoHashcuna_Black from "../components/LogoHashcuna_Black";

const apiNewCommunity = 'https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/Communities/InsertNewCommunity';

export default function NewCommunity() {

    const navigate = useNavigate();
    const { state } = useLocation();
    let dataObjToRegister = state;
    let userManager = dataObjToRegister.userToRegister;

    //Check if userobj arrived!
    console.log(userManager);

    const [loadingButton, setLoadingButton] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [snackHideDuration, setSnackHideDuration] = useState(4000);

    async function handleFormSubmit (values, actions) {

        let community = {
            name: values.communityName,
            city: values.city,
            location: values.street,
            description: values.description,
            primaryPic: values.imageUri,
            status: ""
        };

        let newCommunityWithUser = { userManager, community };

        //Check if newCommunityWithUser arrived to this page!
        console.log(newCommunityWithUser);

            try {
                setLoadingButton(true);
                const response = await postAndPutReqFunction(newCommunityWithUser, apiNewCommunity, 'POST');
                
                setSnackbarMessage('פרטיך נקלטו בהצלחה! מנהלי המערכת בוחנים את בקשתך');
                setSnackbarSeverity('success');
                setSnackHideDuration(3000);
                
                setTimeout(() => {
                    setLoadingButton(false);
                    actions.resetForm();
                    setOpenSnackbar(true);
                }, 1000);
                setTimeout(() => {
                    navigate('/');
                }, 3000);

              }
               catch (error) {
                console.error('Login error:', error);
                setSnackbarMessage('...אופס! משהו השתבש, נסו שנית מאוחר יותר');
                setSnackbarSeverity('error');
                setSnackHideDuration(2000);
                
                setTimeout(() => {
                    setLoadingButton(false);
                    setOpenSnackbar(true);
                }, 1000);
            }
    };

    return (
        <Container
            sx={{ height: '90vh', width: '80vw', display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX:'hidden'}}>

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

            {/* Header Box */}
            <Box sx={{display: 'flex', flexDirection: 'column',alignItems:'center',marginTop:'2vh'}}>
              <Typography
                    variant="h2"
                    sx={{
                        textAlign: 'center',
                        fontSize:16
                    }}>
                       {'יצירת קהילה חדשה'}
                </Typography>             
            </Box> 

            {/* Form Box */}
            <Box sx={{ backgroundColor: '#ffffff', height: '66vh',width:'100%',marginTop:'5vh'}}>
                <Formik
                    initialValues={{ imageUri: '', communityName: '', city: '', street: '', description: '' }}
                    validationSchema={newCommunitySchema}
                    onSubmit={(values, actions) => {
                        console.log('Submitted!');
                        handleFormSubmit(values, actions);
                    }}
                >
                    {formikProps => (
                        <Form style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Grid container rowSpacing={4} justifyContent='center'>

                                {/* --- Input: imageUri--- */}
                                <Grid item xs={12} >
                                    <Box>

                                        <input
                                            label="תמונת פרופיל:"
                                            type='file'
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="upload-button"
                                            onChange={(e) => {
                                                let imgFile = e.target.files[0];
                                                handleFileChange(imgFile, formikProps.setFieldValue);
                                            }}
                                            onBlur={formikProps.handleBlur('imageUri')}
                                            error={formikProps.errors.imageUri}

                                        />
                                        <label htmlFor="upload-button">
                                            <IconButton component="span">
                                                <Avatar
                                                    src={formikProps.values.imageUri}
                                                    sx={{
                                                        width: 80, height: 80,
                                                        // bgcolor: "#9274B2"
                                                        bgcolor: "#BAA1D4"
                                                    }}
                                                >
                                                    {!formikProps.values.imageUri && <PhotoCamera sx={{color:'black'}} />}
                                                </Avatar>
                                            </IconButton>
                                        </label>

                                        {formikProps.touched.imageUri && formikProps.errors.imageUri && (
                                               <Box sx={{ marginTop: '1%'}}>
                                               <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                            {formikProps.errors.imageUri}
                                              </Typography>
                                             </Box>
                                        )}

                                    </Box>
                                </Grid>

                                {/* city field */}
                                <Grid item xs={12} >
                                    <Box>
                                    <InputLabel sx={{marginLeft:'20vw'}} id="labelCityRegister" > 
                                         <Typography variant="body1" sx={{ fontSize: '0.9rem',color:'black'}}>{':עיר'}</Typography>
                                        </InputLabel>

                                        <Select
                                            id='selectCityNewCommunity'
                                            variant="outlined"
                                            sx={dataObjToRegister.textFieldStyle}
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        direction: 'rtl', // Ensure the direction of the dropdown menu
                                                        textAlign: 'right', // Align text in the dropdown menu           
                                                    },
                                                },
                                            }}

                                            onChange={e => formikProps.setFieldValue("city", e.target.value)}
                                            value={formikProps.values.city}
                                            onBlur={formikProps.handleBlur('city')}
                                            error={Boolean(formikProps.errors.city)}
                                        >
                                            <MenuItem value="">
                                                <em>יש לבחור מהרשימה</em>
                                            </MenuItem>
                                            {
                                                citiesList.map((city) => (
                                                    <MenuItem key={city.key} value={city.value}>
                                                        {city.value}
                                                    </MenuItem>
                                                ))
                                            }

                                        </Select>

                                        {formikProps.touched.city && formikProps.errors.city && (
                                              <Box >
                                              <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                           {formikProps.errors.city}
                                             </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>

                                {/* communityName field */}
                                <Grid item xs={12} >
                                    <Box>
                                        <TextField
                                            label=":שם קהילה"
                                            type='text'
                                            id="tfComNameNewCommunity"
                                            variant="outlined"
                                            sx={dataObjToRegister.textFieldStyle}
                                            onChange={e => {
                                                formikProps.setFieldValue('communityName', e.target.value);
                                            }}
                                            value={formikProps.values.communityName}
                                            onBlur={formikProps.handleBlur('communityName')}
                                            error={Boolean(formikProps.errors.communityName)}
                                        />

                                        {formikProps.touched.communityName && formikProps.errors.communityName && (
                                              <Box >
                                              <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                           {formikProps.errors.communityName}
                                             </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>

                                {/* street field--- */}
                                <Grid item xs={12} >
                                    <Box>
                                        <TextField
                                            // variant='standard'
                                            // className="inpPurple"
                                            label=":רחוב"
                                            type='text'
                                            id="tfStreetNewCommunity"
                                            variant="outlined"
                                            sx={dataObjToRegister.textFieldStyle}
                                            onChange={e => {
                                                formikProps.setFieldValue('street', e.target.value);
                                            }}
                                            value={formikProps.values.street}
                                            onBlur={formikProps.handleBlur('street')}
                                            error={Boolean(formikProps.errors.street)}
                                        />

                                        {formikProps.touched.street && formikProps.errors.street && (
                                               <Box >
                                               <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                            {formikProps.errors.street}
                                              </Typography>
                                             </Box>
                                        )}
                                    </Box>
                                </Grid>

                                {/* description field */}
                                <Grid item xs={12} >
                                    <Box>          
                                            <textarea
                                            id='teComDescriptionNewCommunity'
                                            placeholder='ספר בקצרה על הקהילה...'
                                            onChange={e => {
                                                formikProps.setFieldValue('description', e.target.value);
                                            }}
                                            value={formikProps.values.description}
                                            onBlur={formikProps.handleBlur('description')}
                                            // error={Boolean(formikProps.errors.about)}
                                            maxLength={100}
                                            rows={3}
                                            style={dataObjToRegister.TextAreaStyle}
                                            ></textarea>

                                        {formikProps.touched.description && formikProps.errors.description && (
                                            <Box >
                                            <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                         {formikProps.errors.description}
                                           </Typography>
                                          </Box>
                                        )}
                                    </Box>
                                </Grid>
                                
                                {/* List Grid */}
                                <Grid item xs={12}>

                                <Divider sx={{ borderColor: '#333333', width: '70%',marginLeft:'15%', marginTop:'0vh',marginBottom:'2vh'}} />
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
                                    <Typography variant="body1" sx={{ fontSize: 15, color: 'black' }}>
                                    {'!חשוב לדעת'}
                                    </Typography>

                                    <List sx={{ width: '60%', textAlign: 'center'}}>
                                    <ListItem sx={{ display: 'list-item', padding: 0, marginBottom: '1vh',textAlign:'center' }}>
                                        <Typography variant="body2" sx={{ fontSize: 14, color: 'black' }}>
                                        {'לאחר אישור יצירת הקהילה, אתה המנהל הבלעדי שלה'}
                                        </Typography>
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item', padding: 0 ,textAlign:'center'}}>
                                        <Typography variant="body2" sx={{ fontSize: 14, color: 'black' }}>
                                        {'משתמש יכול לנהל קהילה אחת בלבד'}
                                        </Typography>
                                    </ListItem>
                                    </List>
                                </Box>
                                </Grid>



                            {/* ------------------------------------------------------ */} 

                                <Grid item xs={12} sx={{marginBottom:'2vh'}} >
                                {loadingButton?<CircularProgress color="inherit" sx={{fontSize:30}} />
                                        :<Button
                                        // id='btnCreateCommunity'
                                        id="btnCreateComNewCommunity"
                                        sx={dataObjToRegister.ButtonStyle}
                                        type='button'
                                        onClick={formikProps.handleSubmit}
                                    >יצירת קהילה
                                    </Button>}
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>

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
}

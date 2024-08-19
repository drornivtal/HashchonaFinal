
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import dayjs from 'dayjs';

import { Formik, Form } from 'formik';

import { Box, Button, Container, Grid, TextField, Select, MenuItem, InputLabel, IconButton, Avatar, Typography, CircularProgress } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { citiesList, gendersList } from '../utilities/ListsUtilities';
import { registerSchema } from '../utilities/YupSchemas';
import { postAndPutReqFunction } from '../utilities/ApiUtilities';

import LogoHashcuna_Black from "../components/LogoHashcuna_Black";

import { createSnackbar, handleFileChange } from '../utilities/FunctionsUtilities';

export default function Register() {

    const navigate = useNavigate();
    const { state } = useLocation();
    let registerObj = state;

    //for check!
    console.log(registerObj);

    let isManager = registerObj.isManager;
    const [loadingButton, setLoadingButton] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [snackHideDuration, setSnackHideDuration] = useState(4000);

    const RegisterTextFieldStyle = {
        backgroundColor: 'grey.200', // MUI's default gray background color for text fields
        borderRadius: '10px',
        width: '50vw', // Width of the text field
        fontWeight:500,
        fontSize:14,
        marginRight: 0, // Align the text field to the right
        '& .MuiInputBase-input': {
            textAlign: 'right', // Align text to the right
            direction: 'rtl', // Ensure cursor and text alignment are correct for Hebrew
            paddingRight: '10px', // Avoid text touching the right border
            paddingLeft: '10px', // Ensure there’s padding on the left as well
        },
        '& .MuiInputLabel-root': {
            right: '10px', // Attach the label to the right corner
            left: 'auto', // Prevent overflow to the left
            color: '#333333', // Label color in normal state
            transformOrigin: 'right', // Ensure label movement is smooth in RTL
            paddingRight: '10px', // Keep label within the text field
            fontSize: '0.90rem', // Smaller font size for label in normal state
            transition: 'font-size 0.2s ease-in-out, transform 0.2s ease-in-out', // Smooth transition for font size and transform
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#333333', // Ensure label color remains black when focused
        },
        '& .MuiInputLabel-shrink': {
            transform: 'translate(0, -1.5em) scale(0.75)', // Position when the label shrinks
            right: '10px', // Ensure the label stays attached to the right corner
            fontSize: '1rem', // Adjust label size when it shrinks
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none', // No border (remove default MUI underline)
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none', // Ensure no border on hover
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none', // No border when focused
        },
        '& .MuiOutlinedInput-root': {
            paddingLeft: '10px', // Add padding inside the input to avoid text touching the border
            paddingRight: '30px', // Extra padding for the arrow
        },
        '& .MuiInputBase-input::placeholder': {
            textAlign: 'right', // Align placeholder text to the right
        },
        '& .MuiFormLabel-root.Mui-error': {
            color: 'crimson', // Label color in error state
        },
        '& .MuiSelect-icon': {
            left: '10px', // Position the arrow on the left
            right: 'auto', // Prevent the arrow from appearing on the right
            top: '50%', // Center the arrow vertically
            transform: 'translateY(-50%)', // Center the arrow vertically
        },
        '& .MuiMenu-paper': {
            direction: 'rtl', // Set the direction of the options list to RTL
            textAlign: 'right', // Align text in the options list to the right
        },
        '& .MuiSelect-select': {
            textAlign: 'right', // Ensure the selected text is aligned to the right
            paddingRight: '10px', // Adjust padding to move text closer to the right edge
        },
    }; 

    const RegisterTextAreaStyle = {
        width: '50vw',
        // border: '2px solid #EBD5A0',
        border: `2px solid ${registerObj.bgColor}`,
        borderRadius: '10px',
        textAlign: 'right',
        direction: 'rtl',
        paddingRight: '2vw',
        paddingTop: '10px',
        fontSize: 15,
        fontWeight:500,
        color: 'black',
        resize: 'none',
        overflowY: 'auto',
        maxHeight: '80px', // This controls the max height to 3 lines
    };

    const RegisterButtonStyle= {
    //  backgroundColor: '#EBD5A0', // Base color
     backgroundColor: registerObj.bgColor,
     color: 'black',
     width: '30vw', // Adjust width as needed
     height: '40px', // Adjust height as needed
     fontWeight: 500,
     fontSize: 15, // Adjust font size as needed
     borderRadius: '8px', // Adjust border radius as needed
     textTransform: 'none', // Prevents text from being capitalized
        '&:hover': {
     backgroundColor: registerObj.bgColor, // Keeps the same background color on hover
        },
        '&:active': {
     backgroundColor: registerObj.bgColor, // Keeps the same background color on click
     boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.5)', // Moi click effect (white fade)
        },
        '&:focus': {
    backgroundColor: registerObj.bgColor, // Keeps the same background color when focused
        },                                         
    };  

    const apiNewUser = 'https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/Users/InsertNewUser';

    async function handleFormSubmit (values, actions) {

        let userToRegister = {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNum: values.phoneNumber,
            password: values.password,
            gender: values.gender,
            city: values.city,
            street: values.street,
            homeNum: values.homeNumber,
            birthDate: values.birthDate.toISOString(),
            description: values.about,
            isActive: 'f',
            profilePicture: values.imageUri 
        };

        if (!isManager) {

            try {
                setLoadingButton(true);
                let newUser = { userToRegister, communityId: registerObj.communityId };
                console.log("this is a regular user: ");
                console.log(newUser);

                const response = await postAndPutReqFunction(newUser, apiNewUser, 'POST');
                
                setSnackbarMessage('פרטיך נקלטו בהצלחה! מנהלי הקהילה בוחנים את בקשתך');
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

        }

        else {
            console.log("this is a manager user: ");
            console.log(userToRegister);

            let dataObjToRegister = { userToRegister, textFieldStyle: RegisterTextFieldStyle,
                                      TextAreaStyle: RegisterTextAreaStyle, ButtonStyle: RegisterButtonStyle};
                   
            console.log(dataObjToRegister);
            navigate('/NewCommunity', { state: dataObjToRegister});
            actions.resetForm();
        }
    };


    return (
        <Container maxWidth="lg" style={{ height: '90vh', width: '80vw', display: 'flex', flexDirection: 'column',
            overflowY: 'auto',
            overflowX:'hidden'
         }}>

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
                       {'יצירת חשבון'}
                </Typography>             
            </Box> 
            
             {/* Form Box */}
            <Box sx={{ backgroundColor: '#ffffff', height: '68vh',width:'100%',marginTop:'3vh'}}>
                
                <Formik
                    initialValues={{
                        imageUri: '',
                        firstName: '', lastName: '', gender: '',
                        birthDate: dayjs(), // --- today date for defaulte value ---
                        phoneNumber: '', password: '', city: '',
                        street: '', homeNumber: '', about: ''
                    }}
                    validationSchema={registerSchema}
                    onSubmit={(values, actions) => {
                        handleFormSubmit(values, actions);
                    }}
                >
                    {formikProps => (
                        <Form style={{ height: '100%',width:'100%'}}>

                            <Grid container rowSpacing={3} justifyContent='center'>

                                {/* Profile Image field */}
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
                                                        bgcolor: registerObj.bgColor,
                                                    }}
                                                >
                                                    {!formikProps.values.imageUri && <PhotoCamera sx={{color:'black'}} />}
                                                </Avatar>
                                            </IconButton>
                                        </label>

                                        {formikProps.touched.imageUri && formikProps.errors.imageUri && (
                                                 <Box >
                                                 <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                              {formikProps.errors.imageUri}
                                                </Typography>
                                               </Box>
                                        )}

                                    </Box>
                                </Grid>
                                
                                {/* First Name field */}
                                <Grid item xs={12}  >
                                    <Box>

                                        <TextField
                                             // type='text'
                                             // variant='standard'
                                            label=":שם פרטי"
                                            id="TFFirstNameRegister"
                                            variant="outlined"
                                            sx={RegisterTextFieldStyle}
                                            // className={registerObj.inpCssClass}
                                            onChange={e => {
                                                formikProps.setFieldValue('firstName', e.target.value);
                                            }}
                                            value={formikProps.values.firstName}
                                            onBlur={formikProps.handleBlur('firstName')}
                                            error={Boolean(formikProps.errors.firstName)}

                                        />

                                        {formikProps.touched.firstName && formikProps.errors.firstName && (
                                             <Box >
                                             <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                          {formikProps.errors.firstName}
                                            </Typography>
                                           </Box>
                                        )}
                                    
                                    </Box>
                                </Grid>

                                {/* Last Name field */}
                                <Grid item xs={12} >
                                    <Box>
                                        <TextField
                                            id="tfLastNameRegister" 
                                            label=":שם משפחה"
                                            type='text'
                                            variant="outlined"
                                            sx={RegisterTextFieldStyle}
                                            // className={registerObj.inpCssClass}
                                            onChange={e => {
                                                formikProps.setFieldValue('lastName', e.target.value);
                                            }}
                                            value={formikProps.values.lastName}
                                            onBlur={formikProps.handleBlur('lastName')}
                                            error={Boolean(formikProps.errors.lastName)}
                                        />

                                        {formikProps.touched.lastName && formikProps.errors.lastName && (
                                              <Box >
                                              <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                           {formikProps.errors.lastName}
                                             </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>

                                {/* Gender field --> Select*/}
                                <Grid item xs={12} >
                                    <Box>
                                        <InputLabel sx={{marginLeft:'20vw'}} id="labelCityRegister" > 
                                        <Typography variant="body1" sx={{ fontSize: '0.9rem',color:'black'}}>{':מגדר'}</Typography>
                                        </InputLabel>

                                        <Select
                                            // variant='standard'
                                            // className={registerObj.selectCssClass}
                                            id='selectGenderRegister'
                                            variant="outlined"
                                            sx={RegisterTextFieldStyle}
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        direction: 'rtl', // Ensure the direction of the dropdown menu
                                                        textAlign: 'right', // Align text in the dropdown menu           
                                                    },
                                                },
                                            }}
                                            onChange={e => formikProps.setFieldValue("gender", e.target.value)}
                                            value={formikProps.values.gender}
                                            onBlur={formikProps.handleBlur('gender')}
                                            error={Boolean(formikProps.errors.gender)}
                                        >
                                            <MenuItem value="">
                                                <em>יש לבחור מהרשימה</em>
                                            </MenuItem>

                                            {
                                                gendersList.map((gender) => (
                                                    <MenuItem  key={gender.key} value={gender.finalValue}>
                                                        {gender.value}
                                                    </MenuItem>
                                                ))
                                            }

                                        </Select>

                                        {formikProps.touched.gender && formikProps.errors.gender && (
                                              <Box >
                                              <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                           {formikProps.errors.gender}
                                             </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>

                                {/* BirthDate field --> DatePicker*/}
                                <Grid item xs={12} >
                                    <Box>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                id='dpBirthDateRegister'
                                                label=":תאריך לידה"
                                                format='DD/MM/YYYY'
                                                // variant='standard'
                                                // className='inpYellow'
                                                variant="outlined"
                                                sx={RegisterTextFieldStyle}
                                                value={formikProps.values.birthDate}
                                                onChange={userDate => {
                                                    formikProps.setFieldValue('birthDate', userDate);
                                                }}
                                                onBlur={formikProps.handleBlur('birthDate')}
                                                error={Boolean(formikProps.errors.birthDate)}
                                            />
                                        </LocalizationProvider>

                                        {formikProps.touched.birthDate && formikProps.errors.birthDate && (
                                             <Box >
                                             <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                          {formikProps.errors.birthDate}
                                            </Typography>
                                           </Box>
                                        )}
                                    </Box>
                                </Grid>

                                {/* Phone number field */}                      
                                <Grid item xs={12} >
                                    <Box>
                                        <TextField
                                            // className={registerObj.inpCssClass}
                                            id="tfPhoneNumberRegister"
                                            label=":טלפון נייד"
                                            type='tel'
                                            variant="outlined"
                                            sx={RegisterTextFieldStyle}
                                            onChange={e => {
                                                formikProps.setFieldValue('phoneNumber', e.target.value);
                                            }}
                                            value={formikProps.values.phoneNumber}
                                            onBlur={formikProps.handleBlur('phoneNumber')}
                                            error={Boolean(formikProps.errors.phoneNumber)}
                                            inputProps={{ maxLength: 10 }}
                                        />

                                        {formikProps.touched.phoneNumber && formikProps.errors.phoneNumber && (
                                            <Box >
                                            <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                         {formikProps.errors.phoneNumber}
                                           </Typography>
                                          </Box>
                                        )}
                                    </Box>
                                </Grid>
                                
                                {/* Password field */}                      
                                <Grid item xs={12} >
                                    <Box>
                                        <TextField
                                            id="TFPasswordRegister"
                                            label=":סיסמא"
                                            type='password'
                                            // variant='standard'
                                            // className={registerObj.inpCssClass}
                                            variant="outlined"
                                            sx={RegisterTextFieldStyle}
                                            onChange={e => {
                                                formikProps.setFieldValue('password', e.target.value);
                                            }}
                                            value={formikProps.values.password}
                                            onBlur={formikProps.handleBlur('password')}
                                            error={Boolean(formikProps.errors.password)}
                                            inputProps={{ maxLength: 10 }}
                                        />

                                        {formikProps.touched.password && formikProps.errors.password && (
                                                <Box >
                                                <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                             {formikProps.errors.password}
                                               </Typography>
                                              </Box>
                                        )}
                                    </Box>
                                </Grid>

                                {/* city field  ---> Select */}
                                <Grid item xs={12}>
                                    <Box>
                                    <InputLabel sx={{marginLeft:'20vw'}} id="labelCityRegister" > 
                                        <Typography variant="body1" sx={{ fontSize: '0.9rem',color:'black'}}>{':עיר'}</Typography>
                                        </InputLabel>

                                        <Select
                                            // variant='standard'
                                            // className={registerObj.selectCssClass}
                                            id='selectCityRegister'
                                            variant="outlined"
                                            sx={RegisterTextFieldStyle}
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

                                {/* street field */}
                                <Grid item xs={12} >
                                    <Box>
                                        <TextField
                                            id="tfStreetRegister"
                                            label=":רחוב"
                                            type='text'
                                            // variant='standard'
                                            // className={registerObj.inpCssClass}
                                            variant="outlined"
                                            sx={RegisterTextFieldStyle}
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

                                {/* HomeNumber field */}
                                <Grid item xs={12} >
                                    <Box>
                                        <TextField
                                            id="tfHomeNumberRegister"
                                            label=":מספר בית"
                                            type='text'
                                            // variant='standard'
                                            // className={registerObj.inpCssClass}
                                            variant="outlined"
                                            sx={RegisterTextFieldStyle}
                                            onChange={e => {
                                                formikProps.setFieldValue('homeNumber', e.target.value);
                                            }}
                                            value={formikProps.values.homeNumber}
                                            onBlur={formikProps.handleBlur('homeNumber')}
                                            error={Boolean(formikProps.errors.homeNumber)}
                                        />

                                        {formikProps.touched.homeNumber && formikProps.errors.homeNumber && (
                                             <Box >
                                             <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                          {formikProps.errors.homeNumber}
                                            </Typography>
                                           </Box>
                                        )}
                                    </Box>
                                </Grid>
        
                                 {/* About field */}
                                <Grid item xs={12}>
                                    <Box>
                                        <textarea
                                            id='teAboutRegister'
                                            placeholder='קצת על עצמך...'
                                            onChange={e => {
                                                formikProps.setFieldValue('about', e.target.value);
                                            }}
                                            value={formikProps.values.about}
                                            onBlur={formikProps.handleBlur('about')}
                                            // error={Boolean(formikProps.errors.about)}
                                            maxLength={100}
                                            rows={3}
                                            style={RegisterTextAreaStyle}
                                    
                                    ></textarea>
                                        {formikProps.touched.about && formikProps.errors.about && (
                                                  <Box >
                                                  <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                               {formikProps.errors.about}
                                                 </Typography>
                                                </Box>
                                            )}
                                    </Box>
                                </Grid>
                                
                                 {/* Register Button */}
                                <Grid item xs={12} sx={{marginBottom:'10vh'}} >
                                    {loadingButton?<CircularProgress color="inherit" sx={{fontSize:30}} />
                                    :<Button
                                        // id={registerObj.btnCssId}
                                        id='btnToRegisterRegister'
                                        sx={RegisterButtonStyle}
                                        type='button'
                                        onClick={formikProps.handleSubmit}
                                    > 
                                    {registerObj.btnText}
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




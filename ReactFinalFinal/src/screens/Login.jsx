
import { useContext, useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik, Form } from 'formik';

import { Box, Button, Container, Grid, TextField, InputLabel, Select, MenuItem, Typography } from '@mui/material';

import { CommunityContext } from '../contexts/CommunityContextProvider';
import { postAndPutReqFunction } from '../utilities/ApiUtilities';
import { loginSchema } from '../utilities/YupSchemas';
import { createSnackbar } from '../utilities/FunctionsUtilities';

import LogoHashcuna_Black from '../components/LogoHashcuna_Black';
import LoadingLogo from '../components/LoadingLogo';


export default function Login() {

    
    const {communities } = useContext(CommunityContext);
    const apiForLogin = 'https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/Users/Login';
    const [user, setUser] = useState(localStorage.getItem('user')===''?null: JSON.parse(localStorage.getItem('user')));
    
    
    //  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
     
    const navigate = useNavigate();
  
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [snackHideDuration, setSnackHideDuration] = useState(4000);
    const [showLoadingLogo, setShowLoadingLogo] = useState(false);
    

    useEffect(() => {
        if (user !== null) {
            navigate('/Home');
        }
    }, [])

    async function handlePostLogin(loginDetails) {
        try {
            const response = await postAndPutReqFunction(loginDetails, apiForLogin, 'POST');

            if (response && response.user.userId) {
                // User connected successfully
                
                setShowLoadingLogo(true);
                localStorage.setItem('user', JSON.stringify(response));
                setUser(response);
    
         
                setTimeout(() => {
                    navigate('/Home');
                }, 3000);

              } 

        } catch (error) {
            console.error('Login error:', error);
            
                setOpenSnackbar(true);
                setSnackbarMessage('הפרטים לא מופיעים במערכת, נסו שנית');
                setSnackbarSeverity('error');
                setSnackHideDuration(4000);
        }
    }

    const handleFormSubmit = (values, actions) => {

        let userToLogin = {
            communityID: values.community,
            phoneNum: values.phoneNumber,
            password: values.password
        }
        localStorage.setItem('userCommunityId', JSON.stringify(values.community));
        handlePostLogin(userToLogin);

        actions.resetForm();
    };

    const getToMapCommunityPage = () => {
        navigate("/CommunitiesMap",{ state: NewUserButtonStyleLogin});
    };

    const LoginTextFieldStyle = {
        
        backgroundColor: '#BAA1D4',
        // borderRadius: '18px',
        // borderRadius: '10px',
        borderRadius: '30px',
        width: '50vw', // Width of the text field
        fontWeight:500,
        fontSize:14,
        marginRight: 0, // Align the text field to the right
        // height:'54px',
        '& .MuiInputBase-input': {
            textAlign: 'right', // Align text to the right
            direction: 'rtl', // Ensure cursor and text alignment are correct for Hebrew
            paddingRight: '10px', // Avoid text touching the right border
            paddingLeft: '10px', // Ensure there’s padding on the left as well
        },
        '& .MuiInputLabel-root': {
            right: '25px', // Attach the label to the right corner
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

    const LoginButtonStyleLogin= {
         backgroundColor: '#9274B2',
         color: 'white',
         width: '25vw', 
         height: '37px', 
         fontWeight: 500,
         fontSize: 15, 
        //  borderRadius: '8px', 
         borderRadius: '30px', 
         textTransform: 'none', // Prevents text from being capitalized
            '&:hover': {
         backgroundColor: '#9274B2', // Keeps the same background color on hover
            },
            '&:active': {
         backgroundColor: '#9274B2', // Keeps the same background color on click
         boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.5)', // Moi click effect (white fade)
            },
            '&:focus': {
        backgroundColor: '#9274B2', // Keeps the same background color when focused
            },                                         
    };

    const NewUserButtonStyleLogin= {

         backgroundColor: '#EBD5A0',
         color: 'black',
         width: '60vw', 
         height: '35px', 
         fontWeight: 500,
         fontSize: 15, 
        //  borderRadius: '8px',
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

    return (
        showLoadingLogo?<LoadingLogo/>:
        <Container maxWidth="lg" style={{ height: '90vh', width: '80vw', display: 'flex', flexDirection: 'column' }}>

             {/* Logo Svg Box */}
             <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: '20vh',
                            }}>
                            <LogoHashcuna_Black  sx={{height:'20vh', width: '50vw'}} />
             </Box> 

            {/* Form Box */}
            <Box sx={{ backgroundColor: '#ffffff', height: '70vh', width: '100%' ,marginTop:'2vh'}}> 
                <Formik
                    initialValues={{ community: '', phoneNumber: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={(values, actions) => {
                        if(values.phoneNumber==='0500000000' && values.password==='Admin1'){
                        setShowLoadingLogo(true);    
                        console.log(' Admin Logedin!!!');

                      

                        actions.resetForm();
                        setTimeout(() => {
                            window.location.replace('https://proj.ruppin.ac.il/cgroup62/test2/tar2/Admin/Pages/admin.html');
                          }, 3000);

                        }else 
                            {handleFormSubmit(values, actions);}
                    }}
                >
                    {formikProps => (
                        <Form style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Grid container rowSpacing={4} justifyContent='center'>

                                {/* Community field --> Select */}
                                <Grid item xs={12}>
                                    <Box>
                                        <InputLabel sx={{marginLeft:'8vw'}} id="labelCommunityLogin" > 
                                        <Typography variant="body1" sx={{ fontSize: '0.9rem',color:'black'}}>{':קהילה'}</Typography>
                                        </InputLabel>
                                        <Select
                

                                            id='selectCommunityLogin'
                                            variant="outlined"
                                            sx={LoginTextFieldStyle}
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        direction: 'rtl', // Ensure the direction of the dropdown menu
                                                        textAlign: 'right', // Align text in the dropdown menu           
                                                    },
                                                },
                                            }}
                                            onChange={e => formikProps.setFieldValue("community", e.target.value)}
                                            value={formikProps.values.community}
                                            onBlur={formikProps.handleBlur('community')}
                                            error={Boolean(formikProps.errors.community)}
                                        >
                                            <MenuItem value="">
                                                <em>יש לבחור מהרשימה</em>
                                            </MenuItem>

                                            {
                                                communities.map((community) => (
                                                    <MenuItem key={community.communityId} value={community.communityId}>
                                                        {community.name}
                                                    </MenuItem>
                                                ))
                                            }

                                        </Select>

                                        {formikProps.touched.community && formikProps.errors.community && (
                                      
                                      <Box>
                                      <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                   {formikProps.errors.community}
                                     </Typography>
                                    </Box>
                                        )}
                                    </Box>
                                </Grid>
                                
                                {/* Phone number field  */}
                                <Grid item xs={12} >
                                    <Box>
                                        <TextField

                                            label=":טלפון נייד"
                                            type='tel'
                                            id="TFPhoneNumberLogin"
                                            variant="outlined"
                                            sx={LoginTextFieldStyle}
                                            onChange={e => {
                                                formikProps.setFieldValue('phoneNumber', e.target.value);
                                            }}
                                            value={formikProps.values.phoneNumber}
                                            onBlur={formikProps.handleBlur('phoneNumber')}
                                            error={Boolean(formikProps.errors.phoneNumber)}
                                            inputProps={{ maxLength: 10 }}
                                        />

                                        {formikProps.touched.phoneNumber && formikProps.errors.phoneNumber && (
                                                <Box>
                                                 <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                              {formikProps.errors.phoneNumber}
                                                </Typography>
                                               </Box>
                                        )}
                                    </Box>
                                </Grid>
                                
                                {/* Password field  */}
                                <Grid item xs={12} >
                                    <Box>
                                        <TextField
                                            id="TFPasswordLogin"
                                            variant="outlined"
                                            sx={LoginTextFieldStyle}
                                            label=":סיסמא"
                                            type='password'
                                            onChange={e => {
                                                formikProps.setFieldValue('password', e.target.value);
                                            }}
                                            value={formikProps.values.password}
                                            onBlur={formikProps.handleBlur('password')}
                                            error={Boolean(formikProps.errors.password)}
                                            inputProps={{ maxLength: 10 }}
                                        />

                                        {formikProps.touched.password && formikProps.errors.password && (

                                            <Box>
                                                 <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                              {formikProps.errors.password}
                                                </Typography>
                                               </Box>
                                        )}
                                    </Box>
                                </Grid>
                                
                                {/* Login Button  */}
                                <Grid item xs={12}>
                                    <Button
                                        variant='contained'
                                        id='BtnLoginLogin'
                                        type='button'
                                        sx={LoginButtonStyleLogin}
                                        onClick={formikProps.handleSubmit}
                                    >התחברות</Button>
                                </Grid>

                                {/* New user Button  */}
                                <Grid item xs={12}>
                                    <Button 
                                        variant='contained'
                                        type='button'
                                        id='BtnNewUserLogin'
                                        sx={NewUserButtonStyleLogin}
                                        onClick={getToMapCommunityPage}
                                    >עדיין לא חבר בשכונה? לחץ כאן</Button>
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




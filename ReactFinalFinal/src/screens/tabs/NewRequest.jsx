
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {Box, Button, Container, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Formik, Form } from "formik";

import { newRequestSchema } from "../../utilities/YupSchemas";
import { postAndPutReqFunction } from "../../utilities/ApiUtilities";
import { createSnackbar, isAtLeast30MinutesAhead, isFutureDateTime } from "../../utilities/FunctionsUtilities";

import '../../styles/NewRequestStyles.css';
import '../../styles/RegisterStyles.css';


import LogoHashcuna_Black from "../../components/LogoHashcuna_Black";
import { CategoriesContext } from "../../contexts/CategoriesContextProvider";
import { iconMapping } from "../../utilities/ListsUtilities";

import {createOrUpdateSystemChat} from '../../utilities/FirebaseUtilities'



export default function NewRequest() {

    const {allCategories} = useContext(CategoriesContext);
    const user = JSON.parse(localStorage.getItem('user'));
    const communityId = JSON.parse(localStorage.getItem('userCommunityId'));

    const navigate = useNavigate();

    const { state } = useLocation();
    const editModeObj = state || {
        backForEdit: false,
        bgColor: '#9274B2',
        inpCssId: 'inpRequestDiscription',
        btnCssId: 'btnCreateNewRequest',
        // btnText: 'פרסום',
        
        color: 'white',
        res: null
    };

    const apiNewReq = 'https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/postNewReq';
    const apiUpdateReq = 'https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/updateReqDeatails';

    const [selectedCategory, setSelectedCategory] = useState(editModeObj.backForEdit ? editModeObj.res.categoryId : null);

    const [initialValues, setInitialValues] = useState({
        category: editModeObj.backForEdit ? editModeObj.res.categoryId : null,
        dueDate: editModeObj.backForEdit ? dayjs(editModeObj.res.dueDate) : null,
        dueTime: editModeObj.backForEdit ? dayjs(editModeObj.res.dueTime, 'hh:mm') : null,
        description: editModeObj.backForEdit ? (editModeObj.res.description) : '' 
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [snackHideDuration, setSnackHideDuration] = useState(4000);

    useEffect(() => {
        setSelectedCategory(editModeObj.backForEdit ? editModeObj.res.categoryId : null);
        setInitialValues(
            {
                category: editModeObj.backForEdit ? editModeObj.res.categoryId : null,
                dueDate: editModeObj.backForEdit ? dayjs(editModeObj.res.dueDate) : null,
                dueTime: editModeObj.backForEdit ? dayjs(editModeObj.res.dueTime, 'hh:mm') : null,
                description: editModeObj.backForEdit ? (editModeObj.res.description) : '' 
            }
        )
    }, [editModeObj]);

    const handleIconClick = (category, formikProps) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
            formikProps.setFieldValue('category', null);
        } else {
            setSelectedCategory(category);
            formikProps.setFieldValue('category', category);
        }
    };
    const handleFormSubmit = async (values,actions) => {

        let dueDate = new Date(values.dueDate);
        let dueTime = new Date(values.dueTime);
        dueDate.setHours(dueTime.getHours(), dueTime.getMinutes());

        if (!isFutureDateTime(dueDate)) {
            setSnackbarMessage('תאריך ושעת היעד עברו! יש להזין תאריך ושעה עתידיים');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return;
          }
        if (!isAtLeast30MinutesAhead(dueDate)){
            setSnackbarMessage('תנו לחברים שלכם זמן להתכונן... פרסום בקשה ייעשה לפחות 30 דק מראש');
            setSnackbarSeverity('warning');
            setSnackHideDuration(5000)
            setOpenSnackbar(true);
            return;
        }  
        dueDate.setHours(dueTime.getHours(), dueTime.getMinutes()+180);

        const requestPayload = {
            reqID: editModeObj.backForEdit ? editModeObj.res.reqID : 0,
            categoryId: values.category,
            dueDate: dueDate.toISOString(),
            dueTime: "string",
            postDate: "2024-05-22T18:32:43.906Z",
            postTime: "string",
            description: values.description,
            gotHelp: false,
            userReqID: user.user.userId,
            communityID: communityId
        };
        try {
            let response;
            if (editModeObj.backForEdit) {
                if (
                    values.category === initialValues.category &&
                    values.dueDate.isSame(initialValues.dueDate) &&
                    values.dueTime.isSame(initialValues.dueTime) &&
                    values.description === initialValues.description
                ) {
                    setSnackbarMessage('אופס! אין שינוי בבקשה שלך. יש לשנות לפחות שדה אחד מהנתונים כדי לעדכן את הבקשה');
                    setSnackbarSeverity('warning');
                    setOpenSnackbar(true);
                    return;
                }
                response = await postAndPutReqFunction(requestPayload, apiUpdateReq, 'PUT');
            } else {
                response = await postAndPutReqFunction(requestPayload, apiNewReq, 'POST');
            }

            if (response) {
                console.log('succeeded');
                createOrUpdateSystemChat(response );
                
                setSnackbarMessage(editModeObj.backForEdit ? '!הבקשה נערכה ופורסמה מחדש' : 'הבקשה פורסמה בהצלחה!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate('/Profile');
                }, 2500);
                
            } else {
                setSnackbarMessage('אופס! משהו השתבש... יש לנסות שוב');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSnackbarMessage('אופס! משהו השתבש... יש לבדוק את חיבור האינטרנט שלך או לנסות שוב מאוחר יותר');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            // setOpenSnackbar(true);
        }
    };
    
    return (

        <Container sx={{ display: 'flex', flexDirection: 'column', height: '90vh', width: '80vw' }}>           

                  {/* Logo Svg Box */}
                  <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: '14vh',
                            }}>
                            <LogoHashcuna_Black  sx={{height:'10vh', width: '30vw'}} />
                   </Box> 

             {/* Form Box */}
            <Box sx={{ height: '69vh', width: '100%' }} >
                <Formik 
                    initialValues={{   
                        category: initialValues.category,
                        dueDate: initialValues.dueDate,
                        dueTime: initialValues.dueTime,
                        description: initialValues.description
                    }}
                    validationSchema={newRequestSchema}
                    enableReinitialize
                    onSubmit={(values, actions) => {
                        handleFormSubmit(values, actions,initialValues);
                    }}
                >
                    {formikProps => (

                        <Form>
                            <Box
                                sx={{
                                    borderBottom:'3px solid #ebebeb',
                                    marginBottom: '6%',
                                    height: '10%',
                                    width: '100%',
                                    display: 'flex',
                                    overflowX: 'auto',
                                    whiteSpace: 'nowrap',  // Ensure the children stay in a single line
                                    direction: 'rtl',
                                    '&::-webkit-scrollbar': {
                                        display: 'none',  //  hide scrollbar for Webkit browsers
                                    },
                                }}>

                                {
                                    allCategories.map((category) => {
                                        const IconComponent = iconMapping[category.iconName];
                                        const isSelected = selectedCategory === category.categroyID;

                                        return (

                                            <Button
                                                key={category.categroyID}
                                                onClick={() => handleIconClick(category.categroyID, formikProps)}
                                                sx={{
                                                    // bgcolor: '#9274B2',
                                                    // bgcolor: isSelected?'#7A6093':'#A88BC8',
                                                    // bgcolor: isSelected?'#9274B2':'#BAA1D4', // NewRequest
                                                    // bgcolor: isSelected?'#DABB80':'#EBD5A0', // EditRequest
                                                    // opacity: isSelected ? 1 : 0.6,
                                                    // opacity: isSelected ? 1 : 1,
                                                    margin: '3%',
                                                    bgcolor: editModeObj.bgColor,
                                                    bgcolor: isSelected?editModeObj.bgColor:(editModeObj.backForEdit?'#EBD5A0':'#BAA1D4'),
                                                    borderRadius: 15,
                                                    width: '50px',
                                                    height: '50px',
                                                    minWidth: '50px',
                                                    padding: '0',
                                                }}

                                            >
                                                {IconComponent ? (
                                                    <IconComponent id={category.categroyID} sx={{ color: editModeObj.color, fontSize: '28px' }} />

                                                ) : null}
                                            </Button>
                                    );})
                                }

                            </Box>

                            <Grid container rowSpacing={4} justifyContent='center'  paddingTop={1} >

                                <Grid item xs={7} md={12} >

                                    <Box>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                // sx={{ backgroundColor: editModeObj.bgColor}}
                                                sx={{ backgroundColor:(editModeObj.backForEdit?'#EBD5A0':'#BAA1D4')}}
                                                // label="תאריך"
                                                label={<Typography variant="h2" sx={{fontSize:15}}>תאריך</Typography>}
                                                variant='standard'
                                                format='DD/MM/YY'
                                                // className='selectPurple'
                                                value={formikProps.values.dueDate}
                                                onChange={userDate => {
                                                    formikProps.setFieldValue('dueDate', userDate);
                                                }}
                                                onBlur={formikProps.handleBlur('dueDate')}
                                                error={Boolean(formikProps.errors.dueDate)}
                                            />
                                        </LocalizationProvider>

                                        {formikProps.touched.dueDate && formikProps.errors.dueDate && (
                                              <Box sx={{ marginTop: '1%'}}>
                                              <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                           {formikProps.errors.dueDate}
                                             </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>

                                <Grid item xs={4} md={12} >
                                    <Box>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                // sx={{ backgroundColor: editModeObj.bgColor }}
                                                sx={{ backgroundColor:(editModeObj.backForEdit?'#EBD5A0':'#BAA1D4')}}
                                                // label="שעה"
                                                label={<Typography variant="h2" sx={{fontSize:15}}>שעה</Typography>}
                                                variant='standard'
                                                format='hh:mm'
                                                // className='inpYellow'
                                                value={formikProps.values.dueTime}
                                                onChange={userDate => {
                                                    formikProps.setFieldValue('dueTime', userDate);
                                                }}
                                                onBlur={formikProps.handleBlur('dueTime')}
                                                error={Boolean(formikProps.errors.dueTime)}
                                            />
                                        </LocalizationProvider>

                                        {formikProps.touched.dueTime && formikProps.errors.dueTime && (
                                              <Box sx={{ marginTop: '1%'}}>
                                              <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                           {formikProps.errors.dueTime}
                                             </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>

                                {/* ---Input: description--- */}
                                <Grid item xs={12} >
                                    <Box>
                                        <TextField
                                        // sx={{fontFamily:'Rubik',fontSize:14}}
                                            multiline
                                            maxRows={4}
                                            // id="inpRequestDiscription"
                                            id={editModeObj.inpCssId}
                                            placeholder="תאר בקצרה את הסיוע שאתה זקוק לו"            
                                            type='text'
                                            variant='standard'
                                            className="inpAboutClass"
                                            onChange={e => {
                                                formikProps.setFieldValue('description', e.target.value);
                                            }}
                                            value={formikProps.values.description}
                                            onBlur={formikProps.handleBlur('description')}
                                            error={Boolean(formikProps.errors.description)}
                                            inputProps={{ maxLength: 90 }}

                                        // sx={{ marginTop: '15%', height: '70px', width: '60%', textAlign: 'center' }}
                                        />

                                        {formikProps.touched.description && formikProps.errors.description && (
                                      <Box sx={{ marginTop: '1%'}}>
                                      <Typography variant="body1" sx={{fontSize:13,color: 'crimson' }}> 
                                                   {formikProps.errors.description}
                                     </Typography>
                                    </Box>
                                        )}
                                        {formikProps.touched.category && formikProps.errors.category && (
                                            // className="errorMessage"
                                            <Box sx={{ marginTop: '1%'}}>
                                                <Typography variant="body1"  sx={{fontSize:13,color: 'crimson' }}> 
                                                             {formikProps.errors.category}
                                               </Typography>
                                            </Box>
                                        )}

                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={10} md={8} >
                                    <Button
                                        // id="btnCreateNewRequest"
                                        id={editModeObj.btnCssId}
                                        type='button'
                                        onClick={formikProps.handleSubmit}
                                    > 
                                    {editModeObj.backForEdit?'עדכון':'פרסום'}
                                    {/* {'סתם בדיקה'} */}
                                    </Button>
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
    )
}

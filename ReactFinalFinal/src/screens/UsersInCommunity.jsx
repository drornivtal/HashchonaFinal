
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Typography,
  Avatar,
  Container,
  Button,
  Divider,
  Rating,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonIcon from '@mui/icons-material/Person';

import { RemoveCircleOutline } from '@mui/icons-material'; 
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import { getReqFunction, postAndPutReqFunction } from '../utilities/ApiUtilities';
import { calculateAge } from '../utilities/FunctionsUtilities';


export default function UsersInCommunity() {
  
  const managerCommunity = JSON.parse(localStorage.getItem('userCommunityId'));
  const managerDetails = JSON.parse(localStorage.getItem('user'));
  const managerId = managerDetails.user.userId;
  const allUsersApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/Users/ReadAllApprovedUsersForCommunity?CommunityID=${managerCommunity}`;
  const cancelApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/Users/UpdateUserApproval`;

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState({});
  const [openDialog, setOpenDialog] =useState(false);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedUserId, setselectedUserId] = useState(null);
  const [selectedUserGender, setselectedUserGender] = useState('');


  useEffect(() => {
    const fetchUsersInCommunity = async () => {
        try {
            const fetchedUsers = await getReqFunction(allUsersApi);
            setUsers(fetchedUsers);
        } catch (err) {
            console.log(err.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000)  
        }
    };    
    fetchUsersInCommunity();
  }, []);

  const handleToggle = (id) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  
  const removeUserFromList = (id) => {
    let newUsersList = users.filter((user) => (user.userId !== id));
    setUsers(newUsersList);
  };
  const handleDeleteUserDialog = (userId,userName,userGender) => {
    setSelectedUserName(userName);
    setselectedUserId(userId);
    setselectedUserGender(userGender);
    setOpenDialog(true);
  };

  const deleteUserFunction= async ()=>{
    if(selectedUserId===null) 
      return;
    removeUserFromList(selectedUserId);
    
    let jsonObjToPutForCancel = {
        "userId": selectedUserId,
        "communityID": managerCommunity,
        "approvalStatus": 'Rejected'
    }; 
    try {
        console.log({jsonObjToPutForCancel});
        let response = await postAndPutReqFunction(jsonObjToPutForCancel, cancelApi, 'PUT');
    } catch (error) {
        console.error('Error in fetch:', error.message);
    };
    setOpenDialog(false);
    setselectedUserId(null);
  };

  return (
    <>
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'Center', width:'80vw',height:'90vh'}}>

        {/* Hader Box */}
        <Box sx={{display: 'flex', flexDirection: 'column',alignItems:'center', height: '3vh', width:'100%',marginTop:'5vh'}}>
                    <Typography
                            variant="body1"
                            sx={{
                                textAlign: 'center',
                                fontSize:16, 
                            }}>
                                {'חברי הקהילה'} 
                        </Typography> 
            
        </Box>

        {loading? (
            <Box sx={{ display: 'flex', flexDirection: 'column',alignItems:'center', marginTop:'12vh'}}>
              <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl', marginTop: '10%' }}>
              <Skeleton variant="circular" width={50} height={50} animation="wave" sx={{marginLeft:'10px'}}/>
              <Skeleton variant="rounded" width={200} height={50} animation="wave" sx={{marginBottom:'15px',borderRadius:'10px'}}/>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl', marginTop: '1%' }}>
              <Skeleton variant="circular" width={50} height={50} animation="wave" sx={{marginLeft:'10px'}}/>
              <Skeleton variant="rounded" width={200} height={50} animation="wave" sx={{marginBottom:'15px',borderRadius:'10px'}}/>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl', marginTop: '1%' }}>
              <Skeleton variant="circular" width={50} height={50} animation="wave" sx={{marginLeft:'10px'}}/>
              <Skeleton variant="rounded" width={200} height={50} animation="wave" sx={{marginBottom:'15px',borderRadius:'10px'}}/>
              </Box>
            </Box>)

        : <TableContainer sx={{ width:'100%',height:'77vh',marginTop:'5vh'}}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell align='center' sx={{ width:'20%'}}><Typography variant='h2' sx={{ fontSize: 15}}>{'פרטים נוספים'}</Typography> </TableCell>
                <TableCell align='center' sx={{ width:'70%'}}><Typography variant='h2' sx={{ fontSize: 15}}>{'שם מלא'}</Typography>  </TableCell>
                  <TableCell align='center' sx={{ width:'10%'}}> 
                  <PersonIcon sx={{fontSize:32,marginTop:'0.5vh'}}/>                 
                 </TableCell>
            </TableRow>
            </TableHead>
                
            <TableBody>
            {users.map((user) => (
                <React.Fragment key={user.userId}>
                <TableRow >
                
                    <TableCell align="center" sx={{ width:'20%'}}>
                    <Box  sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>  
                    {/* <PersonRemoveIcon sx={{fontSize:21, color:'black',marginRight:'0vw'}}/> */}
                  {user.userId===managerId?(user.gender==='m'?'מנהל':'מנהלת')+' הקהילה':<IconButton onClick={()=>handleDeleteUserDialog(user.userId,user.firstName+' '+user.lastName,user.gender)}>
                  <RemoveCircleOutline sx={{fontSize:22, color:'red',marginRight:'2vw'}} />
                  </IconButton>}
                    <IconButton onClick={() => handleToggle(user.userId)}>
                        {open[user.userId] ? <ExpandLessIcon sx={{fontSize:21}} /> : <ExpandMoreIcon sx={{fontSize:21}} />}
                    </IconButton>
                    </Box>
                    </TableCell>
                          
                    <TableCell align="right" sx={{ width:'70%'}}><Typography variant="h2" sx={{fontSize: 14.5}}>{user.firstName+' '+user.lastName}</Typography></TableCell>
                    <TableCell align="center" sx={{ width:'10%'}} >
                    <Avatar src={user.profilePicture} sx={{width:40, height:40}} />
                    </TableCell>
                </TableRow>


                  {/* More details Row*/}
                <TableRow>
                  <TableCell align="right" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open[user.userId]} timeout="auto" unmountOnExit>
                      <Box margin={1.5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', direction: 'rtl', textAlign: 'right'}}>

                        {/* Age */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginBottom: 1,marginTop:2 }}>
                          <Typography variant="h2" sx={{ fontSize: 14.5,marginTop:0.15 }}>גיל:</Typography>
                          <Typography variant="body2" sx={{ marginRight: 1, marginTop:0, fontSize: 15}}>{calculateAge(user.birthDate)}</Typography>
                        </Box>

                        {/* Address */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginBottom: 1 }}>
                          <Typography variant="h2" sx={{ fontSize: 14.5 ,marginTop:0.15}}>כתובת:</Typography>
                          <Typography variant="body2" sx={{ marginRight: 1, marginTop:0, fontSize: 15}}>{user.street + ', ' + user.homeNum + ', ' + user.city}</Typography>
                        </Box>

                        {/* Phone */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginBottom: 1 }}>
                          <Typography variant="h2" sx={{ fontSize: 14.5 ,marginTop:0.15}}>טלפון:</Typography>
                          <Typography variant="body2" sx={{ marginRight: 1, marginTop:0, fontSize: 15}}>{user.phoneNum}</Typography>
                        </Box>

                        <Divider sx={{ borderColor:'grey', width: '100%', marginBottom:'1vh', marginTop:'1vh' ,borderWidth: '1.5px'}} />

                        {/* Description */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginBottom: 1,marginTop:1}}>
                          <Typography variant="h2" sx={{ fontSize: 14.5,marginTop:0.15}}>תיאור:</Typography>
                          <Typography variant="body2" sx={{ marginRight: 1, marginTop:0, fontSize: 15 }}>
                          {user.description}
                          </Typography>
                        </Box>

                        {/* Rating */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginBottom: 1,marginTop:1 }}>
                          <Typography variant="h2" sx={{ fontSize: 14.5 ,marginTop:0.2}}>דירוג:</Typography>
                          <Rating
                            value= {parseFloat(user.rating.toFixed(1))}
                            // value= {4.5}
                            readOnly
                            precision={0.1}
                            size="small"
                            sx={{
                                direction: 'ltr',
                                paddingLeft: 1,
                                transform: 'scaleX(-1)' 
                                }} />
                        </Box>
                      

                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
                </React.Fragment>
            ))}
            </TableBody>

        </Table>
          </TableContainer>}
          {/* <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'center', marginTop:'0vh'}}> 
                  <Typography
                            variant="body2"
                            sx={{
                              textAlign: 'center',
                              fontSize:14, 
                              marginTop:'1vh'
                            }}>
                                {users.length} 
                  </Typography>
                  <PersonIcon sx={{fontSize:28}}/>
            </Box> */}

    </Container>
    
    <React.Fragment>   
    <Dialog 
      open={openDialog}
      keepMounted
      onClose={()=>setOpenDialog(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      {/* <DialogTitle>{"בחרת להסיר משתמש מהקהילה"}</DialogTitle> */}

      <DialogContent>
        <DialogContentText sx={{textAlign:'right'}}>     
        </DialogContentText>
        
        <Box sx={{ display: 'flex', flexDirection: 'column',textAlign:'right'}}>
        <Typography variant='h1' sx={{ fontSize: 16, marginTop:'0vh',marginBottom:'2vh'}}>{"בחרת להסיר משתמש מהקהילה"}</Typography>
        <Typography variant='body2' sx={{ fontSize: 15}}>{'אצלנו בשכונה מקבלים את כל מי שעומד בתנאי הקהילה'}</Typography>
        <Typography variant='body1' sx={{ fontSize: 15}}>{'האם'+(managerDetails.user.gender==='m'?' אתה בטוח':' את בטוחה')+' שהתכוונת להסיר את '}</Typography>
        <Typography variant='body1' sx={{ fontSize: 15, marginTop:'0.1vh'}}>{'? '+selectedUserName}</Typography>
        </Box>

      </DialogContent>

      <DialogActions >
        <Button onClick={()=>deleteUserFunction()} sx={{color:'black'}}>{(managerDetails.user.gender==='m'?' כן, בטוח':' כן, בטוחה')}</Button>
        <Button onClick={()=>setOpenDialog(false)} sx={{}}>לא, טעות</Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
  </>
  );
};


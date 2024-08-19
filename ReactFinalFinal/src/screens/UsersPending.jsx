

import UserPendingCard from '../components/UserPendingCard'
import { Box, CircularProgress, Container, Grid, Skeleton, Typography } from '@mui/material'
import { getReqFunction, postAndPutReqFunction } from '../utilities/ApiUtilities';
import { useEffect, useState } from 'react';
import { calculateAge } from '../utilities/FunctionsUtilities';

export default function UsersPending() {

    const managerCommunity = JSON.parse(localStorage.getItem('userCommunityId'));
    const allPendingUsersApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/Users/ReadAllPendingUsers?CommunityID=${managerCommunity}`;
    const acceptAndCancelApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/Users/UpdateUserApproval`;

    const [loading, setLoading] = useState(true);
    const [usersPending, setUsersPending] = useState([]);

    useEffect(() => {
        const fetchUsersPending = async () => {
            try {
                const fetchedPendingUsers = await getReqFunction(allPendingUsersApi);
                setUsersPending(fetchedPendingUsers);
            } catch (err) {
                // setError(err.message);
                console.log(err.message);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000)  
            }
        };    
        fetchUsersPending();
    }, []);

    const removeUserFromList = (id) => {
        let newUsersList = usersPending.filter((user) => (user.userId !== id));
        setUsersPending(newUsersList);
    };

    const acceptAndcancelUserFunction= async (userId,status,setStatesFunction)=>{
        setStatesFunction({loading: true,regular: false});
        status==='Rejected'?removeUserFromList(userId):'';

        let jsonObjToPutForCancel = {
            "userId": userId,
            "communityID": managerCommunity,
            "approvalStatus": status
        };
        
        try {
            console.log({jsonObjToPutForCancel});
            let response = await postAndPutReqFunction(jsonObjToPutForCancel, acceptAndCancelApi, 'PUT');
            status==='Approved'?setStatesFunction({approved: true}):'';
        } catch (error) {
            // Handle error
            console.error('Error in fetch:', error.message);
        }finally {
            setTimeout(() => {
            setStatesFunction({loading: false});  
            }, 1000)  
        }
    };

  return (
    <Container 
    sx={{ display: 'flex', flexDirection: 'column',height: '90vh', width: '80vw', padding: '0px',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar for Webkit browsers
        },
        msOverflowStyle: 'none', // Hide scrollbar
       alignItems: 'center',
     }}>
          
          {/* Hader Box */}
           <Box sx={{display: 'flex', flexDirection: 'column',alignItems:'center', height: '3vh', width:'100%',marginTop:'5vh'}}>
                    <Typography
                            variant="body1"
                            sx={{
                                textAlign: 'center',
                                fontSize:16, 
                            }}>
                                {'מעוניינים להצטרף לקהילה'} 
                        </Typography>             
            </Box>        
        
          {/* All UserCards Box */}
            <Box
                sx={{
                    marginTop:'6vh',
                    height: '76vh',
                    width: '100%', 
                    display: 'flex', flexDirection: 'column',alignItems:'center',
                }}
            >
                {loading?
                        <Grid container rowSpacing={3.5} columnSpacing={0} >
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                            <Skeleton variant="rounded" width={'135px'} height={'135px'} animation="wave" sx={{borderRadius:'8px'}}/>             
                            </Grid>                          
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                            <Skeleton variant="rounded" width={'135px'} height={'135px'} animation="wave" sx={{borderRadius:'8px'}}/>             
                            </Grid>                          
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                            <Skeleton variant="rounded" width={'135px'} height={'135px'} animation="wave" sx={{borderRadius:'8px'}}/>             
                            </Grid>                          
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                            <Skeleton variant="rounded" width={'135px'} height={'135px'} animation="wave" sx={{borderRadius:'8px'}}/>             
                            </Grid>                          
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                            <Skeleton variant="rounded" width={'135px'} height={'135px'} animation="wave" sx={{borderRadius:'8px'}}/>             
                            </Grid>                          
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                            <Skeleton variant="rounded" width={'135px'} height={'135px'} animation="wave" sx={{borderRadius:'8px'}}/>             
                            </Grid>                          
                                    
                                         
                        </Grid>
                    : <Grid container rowSpacing={3.5} columnSpacing={0} >
                        {usersPending.length === 0? 
                                                             <Grid item xs={12} sx={{marginTop:'5px'}}> <Typography variant="body1" sx={{ fontSize: 14,color:'grey'}} gutterBottom > 
                                                            {'אין בקשות להצטרפות'}
                                                            </Typography>  </Grid>
                                :usersPending.map((user) => (
                                    <Grid item xs={6} sm={4} md={3} lg={2} key={user.userId }>
                                        <UserPendingCard 
                                            UserId={user.userId}
                                            FullName={user.firstName+' '+user.lastName}
                                            ProfileImg={user.profilePicture}
                                            Age={calculateAge(user.birthDate)}     
                                            Address={user.street+', '+user.homeNum+', ' + user.city}
                                            Description={user.description}
                                            CancleFunction={(setStatesFunction)=>acceptAndcancelUserFunction(user.userId,"Rejected",setStatesFunction)}
                                            AcceptFunction={(setStatesFunction)=>acceptAndcancelUserFunction(user.userId,"Approved",setStatesFunction)}
                                        />     
                                    </Grid>
                                ))}                   
                     </Grid>}
                
            </Box>
    </Container>
  )
}


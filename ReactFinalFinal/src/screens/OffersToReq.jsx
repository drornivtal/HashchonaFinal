
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Avatar, Box, Container, Grid, IconButton, Skeleton,Typography } from "@mui/material";
import { getReqFunction, postAndPutReqFunction } from "../utilities/ApiUtilities";
import {iconMapping } from "../utilities/ListsUtilities";

import OfferToHelp from "../components/OfferToHelp";
import SdCardAlertOutlinedIcon from '@mui/icons-material/SdCardAlertOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {createOrUpdateChat} from '../utilities/FirebaseUtilities'
import LogoHashcuna_Black from "../components/LogoHashcuna_Black";
import { CategoriesContext } from "../contexts/CategoriesContextProvider";


export default function OffersToReq() {

  const {allCategories} = useContext(CategoriesContext);
  const { state } = useLocation();
  const reqObj=state;

  const navigate = useNavigate();

  const allPendingOffersApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/AllWantToAssistPending?reqID=${reqObj.reqId}`;
  const allMyOffersApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/GetActiveRequestsByUserInProgress?communityID=${reqObj.comId}&UserID=${reqObj.userId}`;
  const acceptAndCancelApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/updateUserStatusToReq`;

  const [offersPending, setOffersPending] = useState([]);
  const [myOffers, setMyOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const getIconByCategoryId = (categoryId) => {
    let category = allCategories.find(cat => cat.categroyID === categoryId);
    return category ? iconMapping[category.iconName] : null;
    };   
  const removeOfferFromList = (id) => {
        let newOffersList = offersPending.filter((offer) => (offer.userId !== id));
        setOffersPending(newOffersList);
    };  
  const acceptOfferFunction = async (userID, FullName) => {
        let jsonObjToPostForAccept = {
            "userID": userID,
            "requestForHelpID": reqObj.reqId,
            "statusApproval": "accepted"
        };
        
        try {
            let response = await postAndPutReqFunction(jsonObjToPostForAccept, acceptAndCancelApi, 'PUT');

            createOrUpdateChat(userID, JSON.parse(localStorage.getItem('user')).user.userId,reqObj.reqId, FullName)

        } catch (error) {
            // Handle error
            console.error('Error in fetch:', error.message);
        }
    }; 

    const cancelOfferFunction = async (userID) => {
      removeOfferFromList(userID);
      let jsonObjToPostForCancel = {
        "userID": userID,
        "requestForHelpID": reqObj.reqId,
        "statusApproval": "Rejected"
    };
    
    try {
        console.log({jsonObjToPostForCancel});
        let response = await postAndPutReqFunction(jsonObjToPostForCancel, acceptAndCancelApi, 'PUT');
    } catch (error) {
        // Handle error
        console.error('Error in fetch:', error.message);
    }
    }; 
    const IconComponent = getIconByCategoryId(reqObj.catId);

    const backToProfilePage=()=>{
        navigate('/Profile');
    };
    const goToDisplayProfilePage = (userId) => {
        navigate('/Profile',{state:userId});
    };

    useEffect(() => {
        
        const fetchReqOffers = async () => {
            
            try {
                const fetchedOffers = await getReqFunction(allPendingOffersApi);
            setOffersPending(fetchedOffers);
            console.log('דף צהוב');
            console.log(fetchedOffers);
        } catch (err) {
            setError(err.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000)  
        }
    };
    const fetchMyReqOffers = async () => {

        try {
            const fetchedMyOffers = await getReqFunction(allMyOffersApi);
            setMyOffers(fetchedMyOffers);
            console.log('דף כחול');
            console.log(fetchedMyOffers);
        } catch (err) {
            setError(err.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000)  
        }
    };

    reqObj.myOffer?fetchMyReqOffers() :fetchReqOffers();
    console.log('print all offers!');
    reqObj.myOffer? console.log(myOffers):console.log(offersPending);   
    }, []);
   
 return (
    <Container
            sx={{
                display: 'flex', flexDirection: 'column',
                height: '90vh', width: '80vw', padding: '0px'
            }}>
             <IconButton
              onClick={()=>(backToProfilePage())}
              sx={{
              position: 'absolute',
              right:0,
              top: 0,
              color:"black"
              }}>
                <ChevronRightIcon fontSize="large" />
              </IconButton>

             {/* Logo Svg Box */}
             <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: '15vh',
                                // marginTop: -2
                            }}>
                            <LogoHashcuna_Black  sx={{height:'10vh', width: '30vw'}} />
               </Box> 
           
            {/* Display offers Box */}

            {/* Header Box */}
              <Box sx={{display: 'flex', flexDirection: 'column',alignItems:'center'}}>
              <Typography
                    variant="h2"
                    sx={{
                        textAlign: 'center',
                        fontSize:16
                    }}>
                        {reqObj.myOffer?'ההצעות שלי למבקשי עזרה':'חברים שמעוניינים לעזור לי'} 
                </Typography>             
              </Box>
              
              {/* Icon Category Box */}
              { reqObj.myOffer?<Box sx={{height:'35px'}}></Box>
                    :<Box sx={{display: 'flex', flexDirection: 'column',alignItems:'center'}} >
                <Avatar
                    sx={{
                    width: 50,
                    height: 50,
                    bgcolor: '#EBD5A0',
                    color:'black',
                    marginTop:3,
                    marginBottom: 3 }}>
                        {IconComponent? <IconComponent sx={{ color: 'black', fontSize: '30px' }}/>: 
                        <SdCardAlertOutlinedIcon />}
                </Avatar>
                    </Box>}
            
            {/* All requests Box */}
                <Box
                sx={{
                    height: '66vh',
                    height: (reqObj.myOffer?'66vh':'65vh'),
                    width: '100%',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none', // Hide scrollbar for Webkit browsers
                    },
                    msOverflowStyle: 'none', // Hide scrollbar
                    marginTop:(reqObj.myOffer?'0vh':'1vh')

                }}
            >

                <Grid container rowSpacing={2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginBottom:'3%',
                    }}>

                      {loading?
                   
                          <>
                          <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl', marginTop: '8%' }}>
                          <Skeleton variant="circular" width={50} height={50} animation="wave" sx={{marginLeft:'10px'}}/>
                          <Skeleton variant="rounded" width={220} height={50} animation="wave" sx={{marginBottom:'15px',borderRadius:'10px'}}/>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl', marginTop: '1%' }}>
                          <Skeleton variant="circular" width={50} height={50} animation="wave" sx={{marginLeft:'10px'}}/>
                          <Skeleton variant="rounded" width={220} height={50} animation="wave" sx={{marginBottom:'15px',borderRadius:'10px'}}/>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl', marginTop: '1%' }}>
                          <Skeleton variant="circular" width={50} height={50} animation="wave" sx={{marginLeft:'10px'}}/>
                          <Skeleton variant="rounded" width={220} height={50} animation="wave" sx={{marginBottom:'15px',borderRadius:'10px'}}/>
                          </Box>
                          </>
                      : 
                        ( reqObj.myOffer? myOffers.map((offerObj) => (
                           <Grid item xs={12} key={offerObj.request.reqID}>
                             <OfferToHelp 
                                MyOffer={reqObj.myOffer}
                                ReqCategory={offerObj.request.categoryId}
                                OfferStatus={offerObj.status}
                                ProfileImg={offerObj.profilePicture}

                                FullName={offerObj.fullNameOfReq}
                                UserId={offerObj.request.userReqID}
                                DueDate={offerObj.request.dueDate}
                                DueTime={offerObj.request.dueTime}
                                // DueDateHebrewDay={''}
                                PostDate={offerObj.request.postDate}
                                PostTime={offerObj.request.postTime}
                                Description={offerObj.request.description}
                                GoToUserProfile={goToDisplayProfilePage}
                                />     
                            </Grid>
                        ))
                            :(offersPending.length === 0? <Typography variant="body1" sx={{ fontSize: 14,marginTop:'5vh',color:'grey'}}
                                                                           gutterBottom > 
                                                            {'אין הצעות לסיוע'}
                                                        </Typography>
                                :offersPending.map((offer) => (
                            <Grid item xs={12} key={offer.userId}>
                                <OfferToHelp 
                                     UserId={offer.userId}
                                     FullName={offer.firstName+' '+offer.lastName}
                                     ProfileImg={offer.profilePicture}
                                     CancleFunction={cancelOfferFunction}
                                     AcceptFunction={acceptOfferFunction}
                                     CloseAcceptMessage={removeOfferFromList}
                                     MyOffer={reqObj.myOffer}
                                     GoToUserProfile={goToDisplayProfilePage}
                                />     
                            </Grid>
                        )))
                    )
                    }
                </Grid>
                </Box>
        </Container>
  )
}

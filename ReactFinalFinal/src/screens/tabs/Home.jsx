
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, Divider, Grid, Skeleton, Typography } from "@mui/material";

import RequestDisplay from "../../components/RequestDisplay";
import { getReqFunction, postAndPutReqFunction } from "../../utilities/ApiUtilities";
import RatingModal from "../RatingModal";
import { createSnackbar } from "../../utilities/FunctionsUtilities";
import LogoHashcuna_Black from "../../components/LogoHashcuna_Black";

import { CategoriesContext } from "../../contexts/CategoriesContextProvider";
import { iconMapping } from "../../utilities/ListsUtilities";

import LogoutIcon from '@mui/icons-material/Logout';
import IconFacebookMessenger from '../../components/IconFacebookMessenger';


export default function Home() {

    const {allCategories} = useContext(CategoriesContext);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [allRequests, setAllRequests] = useState([]);

    const [offers, setOffers] = useState([]);
    const [currentOffer, setCurrentOffer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] =useState(false);

    const userDetails = JSON.parse(localStorage.getItem('user'));
    const userCommunity = JSON.parse(localStorage.getItem('userCommunityId'));

    const apiAllRequests = 'https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/ActiveReqByCommunityByUser';
    const apiAllOffersToRank = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/GetAllNeedToRate?UserID=${userDetails.user.userId}&CommunityID=${userCommunity}`;
 

    // component did mount
    useEffect(() => {
        async function fetchAndSetRequest() {
            try {
                const jsonObjToPost = {
                    "CommunityID": userCommunity,
                    "UserID": userDetails.user.userId
                };
                const fetchedRequests = await postAndPutReqFunction(jsonObjToPost, apiAllRequests, 'POST');

                if (fetchedRequests) {
                    setAllRequests(fetchedRequests);
                    console.log(fetchedRequests);
                }

            } catch (error) {
                // Handle error
                console.error('Error fetching communities:', error.message);
            }finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000)  
            }
        }; 

        const fetchOffersToRank = async () => {
            
            try {
                const fetchedOffersToRank = await getReqFunction(apiAllOffersToRank);
                if (fetchedOffersToRank){
                    setOffers(fetchedOffersToRank);
                    console.log(fetchedOffersToRank);
                }
            } catch (err) {
                setError(err.message);
            } 
        };

        fetchAndSetRequest();
        fetchOffersToRank();
    }, []);

    useEffect(() => {
        if (offers.length > 0) {
          showNextModal();
        }
    }, [offers]);

    const showNextModal = () => {
        if (offers.length > 0) {
          const nextOffer = offers[0];
          setCurrentOffer(nextOffer); 
          setShowModal(true);
   }
    };
    const goToNewRequestPage = () => {
        console.log('check!');
        navigate('/NewRequest');
    };
    const goToChats = () => {
        navigate('/AllChats');
    };
    const handleLogout = () => {
        setOpenDialog(true);
    };

    const LogOutUser = () => {
        console.log("User logged out");
        setOpenDialog(false);
        localStorage.setItem('user', '');
        navigate('/'); 
    };
    const goToDisplayProfilePage = (userId) => {
        navigate('/Profile',{state:userId});
    };
    const handleIconClick = (category) => {
        setSelectedCategories(prevSelected => {
            if (prevSelected.includes(category)) {
                return prevSelected.filter(c => c !== category);
            } else {
                return [...prevSelected, category];
            }
        });
    };

    const filteredRequests = allRequests.filter(requestObj => requestObj.request.userReqID !== userDetails.user.userId)
        .filter(requestObj => selectedCategories.length === 0 || selectedCategories.includes(requestObj.request.categoryId));

    // if(loading) return (<CircularProgress color="inherit"  />)
    // else 
    return (
        <>
        {currentOffer &&
        <RatingModal 
        ShowModalFunc={setShowModal} 
        SetOffersFunc={setOffers}
        SetOpenSnackBarFunc={setOpenSnackbar}
        OffersList={offers}
        ShowModal={showModal}
        ReqId={currentOffer.reqID}
        UserId={currentOffer.assistantUserID}
        FullName={currentOffer.assistantFullName}
        Gender={currentOffer.gender}
        CategoryName={currentOffer.categoryName}
        DueDate={currentOffer.dueDateReq}
        ProfileImg={currentOffer.profilePic}
        />}
        <Container sx={{ display: 'flex', flexDirection: 'column', height: '90vh', width: '80vw', padding: '0px' }}>
 
         {/* Icons Box in the upper right corner */}
         <Box sx={{
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'flex-start',
             marginTop:'-1vh',
             marginBottom: '1vh',
             marginRight:-2,
             borderBottom:'3px solid #ebebeb',
            }}>

         <Box sx={{
             display: 'flex',
             flexDirection: 'row',
             justifyContent: 'flex-start',
             alignItems: 'center',
             marginBottom: '0.5vh',
            }}>

                  
                    <Box sx={{ marginRight: 1 }} onClick={goToChats}>
                    <IconFacebookMessenger sx={{ fontSize: 25, cursor: 'pointer', color: 'black' }} />
                  
                    </Box>

                
                    <Box onClick={handleLogout}>
                        <LogoutIcon sx={{ fontSize: 22, cursor: 'pointer', color: 'black' }} />
                    </Box>
                
         </Box>
         </Box >
       
            {/* Logo Svg Box */}
           <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: '12vh',
                            }}>
                            <LogoHashcuna_Black  sx={{height:'10vh', width: '30vw'}} />
           </Box> 


            {/* Categories Box */}
            <Box
                sx={{
                    borderBottom:'3px solid #ebebeb',
                    height: '10vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    whiteSpace: 'nowrap',  // Ensure the children stay in a single line
                    direction: 'rtl',
                    '&::-webkit-scrollbar': {
                        display: 'none',  //  hide scrollbar for Webkit browsers
                    },
                    marginTop:'-2%'
                }}>

                {
                    allCategories.map((category) => {
                        const IconComponent = iconMapping[category.iconName];
                        const isSelected = selectedCategories.includes(category.categroyID);
                        return (

                            <Button
                                key={category.categroyID}
                                onClick={() => handleIconClick(category.categroyID)}
                                sx={{
                                    margin: '3%',
                                    bgcolor: '#708DD3', //LIght blue
                                    // bgcolor: isSelected ? '#708DD3' : '#556cd6',
                                    bgcolor: isSelected ? '#556cd6' : '#708DD3',
                                    borderRadius: 15,
                                    width: '50px',
                                    height: '50px',
                                    minWidth: '50px',
                                }} >
                                {IconComponent ? (
                                    <IconComponent id={category.categroyID} sx={{ color: 'white', fontSize: '28px' }} />
                                ) : null}
                            </Button>
                        );
                    })
                }

            </Box>

            {/* Display Request Box */}
            <Box>
                <Typography
                    variant="body1"
                    sx={{
                        paddingRight: 1,
                        textAlign: 'right', 
                        marginTop:'5%',
                        fontSize:14
                    }}>
                    בקשות בקהילה
                </Typography>
            <Box
                sx={{
                    height: '53vh',
                    width: '100%',
                    paddingTop: '4%',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none', // Hide scrollbar for Webkit browsers
                    },
                    msOverflowStyle: 'none', // Hide scrollbar
                }}
            >
                <Grid container rowSpacing={2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginBottom:'3%'
                    }}>

                    { 
                       loading?   
                        <>
                        <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl', marginTop: '20px' }}>
                        <Skeleton variant="circular" width={50} height={50} animation="wave" sx={{marginLeft:'10px',marginTop:'18px'}}/>
                        <Skeleton variant="rounded" width={220} height={90} animation="wave" sx={{marginBottom:'15px',borderRadius:'10px'}}/>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl', marginTop: '5px' }}>
                        <Skeleton variant="circular" width={50} height={50} animation="wave" sx={{marginLeft:'10px',marginTop:'18px'}}/>
                        <Skeleton variant="rounded" width={220} height={90} animation="wave" sx={{marginBottom:'15px',borderRadius:'10px'}}/>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl', marginTop: '5px' }}>
                        <Skeleton variant="circular" width={50} height={50} animation="wave" sx={{marginLeft:'10px',marginTop:'18px'}}/>
                        <Skeleton variant="rounded" width={220} height={90} animation="wave" sx={{marginBottom:'15px',borderRadius:'10px'}}/>
                        </Box>
                        </> 
    
                        
                    :(filteredRequests.length===0? <Typography variant="body1" sx={{ fontSize: 14,marginRight:'0vh',marginTop:'5vh',color:'grey'}}
                                                                        gutterBottom > 
                                                        {'אין בקשות בקהילה'}
                                                    </Typography>
                  
                        :filteredRequests.map((requestObj) => (
                            <Grid item xs={12} key={requestObj.request.reqID}>
                                <RequestDisplay
                                    ReqId={requestObj.request.reqID}
                                    UserName={requestObj.fullNameOfReq} //~ need to fix in server ~ 
                                    UserID={requestObj.request.userReqID} //~ need to fix in server ~ 
                                    DueDate={requestObj.request.dueDate}
                                    DueTime={requestObj.request.dueTime}
                                    DueDateHebrewDay={requestObj.request.dueDate}
                                    PostDate={requestObj.request.postDate}
                                    PostTime={requestObj.request.postTime}
                                    Description={requestObj.request.description}
                                    profileImg={requestObj.profilePicture}
                                    GoToUserProfile={goToDisplayProfilePage}
                                    onlyDisplayProfile={false}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
            </Box>
            {
                createSnackbar({
                    open: openSnackbar,
                    message: 'אופס! משהו השתבש, נסה שנית מאוחר יותר',
                    severity: 'error',
                    onClose: () => setOpenSnackbar(false),
                    autoHideDuration:3000
                })
            } 
        </Container >
        <Dialog 
                    
                    open={openDialog}
                    keepMounted
                    onClose={()=>setOpenDialog(false)}
                    >
                    <DialogContent>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column',textAlign:'right'}}>
                        <Typography variant='h1' sx={{ fontSize: 16, marginTop:'0vh',marginBottom:'2vh'}}>{"בחרת לצאת מהמערכת"}</Typography>
                        <Typography variant='body1' sx={{ fontSize: 15}}>{'?האם'+(userDetails.user.gender==='m'?' אתה בטוח':' את בטוחה')+' שהתכוונת להתנתק'}</Typography>
                        </Box>

                    </DialogContent>

                    <DialogActions >
                        <Button onClick={()=>LogOutUser()} sx={{color:'black'}}>{(userDetails.user.gender==='m'?' כן, בטוח':' כן, בטוחה')}</Button>
                        <Button onClick={()=>setOpenDialog(false)} sx={{}}>לא, טעות</Button>
                    </DialogActions>
                </Dialog>
        </>
    );
}

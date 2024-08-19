
import {  useContext, useEffect, useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";


import { Avatar, Box, Button, ButtonBase, Container, Dialog, DialogActions, DialogContent, Divider, Grid, IconButton, Rating, Skeleton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import RequestDisplay from "../../components/RequestDisplay";

import '../../styles/ProfileStyles.css';
import { deleteRequestFunction, getReqFunction } from "../../utilities/ApiUtilities";
import LogoHashcuna_Black from "../../components/LogoHashcuna_Black";
import { CategoriesContext } from "../../contexts/CategoriesContextProvider";
import { iconMapping } from "../../utilities/ListsUtilities";
import CategoriesModal from "../CategoriesModal";
import { createSnackbar } from "../../utilities/FunctionsUtilities";


export default function Profile(props) {

    const {allCategories} = useContext(CategoriesContext);

    const navigate = useNavigate();
    const { state } = useLocation();
    const userId = state;

    const handleBackClick = () => {
        navigate(-1);
    };

    const userDetails = JSON.parse(localStorage.getItem('user'));
    const userCommunity = JSON.parse(localStorage.getItem('userCommunityId'));
    const [userToDisplay, setUserToDisplay] = useState(null);

    const [userCategories, setUserCategories] = useState([]); 
    
    const [allUserRequests, setAllUserRequests] = useState([]);
    const [allUserAssistants, setAllUserAssistants] = useState([]);

    const [userDetailsLoading, setUserDetailsLoading] = useState(true);
    const [requestsLoading, setRequestsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [onlyDisplayProfile, setOnlyDisplayProfile] = useState(false);
    const [activeSection, setActiveSection] = useState("assistance");
    const [openCategoriesModal, setOpenCategoriesModal] = useState(false);
    const [openDialog, setOpenDialog] =useState(false);
    const [reqToDelete, setReqToDelete] =useState(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [snackHideDuration, setSnackHideDuration] = useState(4000);


    useEffect(() => {

     const fetchUserDetails = async () => { 

            let api = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/Users/GetSpecificUser?UserID=${userId}`;
            try {
                const fetchedDetails = await getReqFunction(api);
                setUserToDisplay(fetchedDetails);
                setUserCategories(fetchedDetails.categories.map((category) => category.categroyID));
            } catch (err) {
                setError(err.message);
            } finally {
                setTimeout(() => {
                    setUserDetailsLoading(false);
                }, 1000)  
            }
     };

    const fetchUserRequests = async () => { 

            let tempUserId=(!userId? userDetails.user.userId: userId);

            let api = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/GetAllUserRequestsByCommunity?UserID=${tempUserId}&CommunityID=${userCommunity}`;
            try {
                const fetchedRequests = await getReqFunction(api);
                const reversedRequests = fetchedRequests.reverse();
                setAllUserRequests(reversedRequests);
            } catch (err) {
                setError(err.message);
            } finally {
                setTimeout(() => {
                    setRequestsLoading(false);
                }, 1000)  
            }
    };

    const fetchUserAssistants = async () => { 

            let api = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/GetAllTheReqThatUserHelped?UserID=${userId}`;
            try {
                const fetchedAssistants = await getReqFunction(api);
               setAllUserAssistants(fetchedAssistants);
            } catch (err) {
                setError(err.message);
            } finally {
                setTimeout(() => {
                    setRequestsLoading(false);
                }, 1000)  
            }
    };

        if(userId){
            setOnlyDisplayProfile(true);
            fetchUserDetails();
            console.log('print user Details!');
            console.log(userToDisplay);

            fetchUserAssistants();
            console.log('print user Assistants!');
            console.log(allUserAssistants);
        } 
        else {
            setUserToDisplay(userDetails);
            setUserCategories(userDetails.categories.map((category) => category.categroyID));
            setUserDetailsLoading(false);
        };
    
        fetchUserRequests();
        console.log('print all requests!');
        console.log(allUserRequests); 

    }, [userId]);

    const EditRequestDetails=(requestId)=>{
         let res= allUserRequests.find(req=>req.reqID === requestId);
         let reqToEditObj={
            backForEdit:true,
            bgColor:'#DABB80',
            inpCssId: 'inpEditRequestDiscription',
            btnCssId: 'btnEditRequest',
            // btnText: 'עדכון הבקשה',
            color:'black',
            res}

           // -- Check! -- 
         console.log(reqToEditObj);
         
        navigate('/NewRequest',{ state: reqToEditObj });
    };

    const handleDeleteReqFromProfile=(requestId)=>{
       setReqToDelete(requestId);
       setOpenDialog(true);
    };

    const DeleteRequestDetails = async (requestID) => {

        const DeleteApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/DeleteReq`;

        try {
            const result = await deleteRequestFunction(DeleteApi,requestID);
            console.log('Request deleted successfully:', result);
            removeReqFromList(requestID);
        } catch (error) {
          console.error('Failed to delete the request:', error);
          setSnackbarMessage('...אופס! משהו השתבש, נסו שנית מאוחר יותר');
          setSnackbarSeverity('error');
          setSnackHideDuration(2000);
          setOpenSnackbar(true);
        }
         setOpenDialog(false);
        setReqToDelete(null);
    };

    const removeReqFromList = (id) => {
        let newRequestsList = allUserRequests.filter((req) => (req.reqID !== id));
        setAllUserRequests(newRequestsList.reverse());
    };

    const GoToMyOffersPage=()=>{
        let reqObj={
            myOffer:true,
            userId:userDetails.user.userId,
            comId:userCommunity
        }
        navigate('/OffersToReq', { state: reqObj });
    };
    const GoToManagmentPage=()=>{
        navigate('/ManagementPage');
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    if(!userToDisplay) return <></>
    else return (
        <>
        {openCategoriesModal&& 
        <CategoriesModal 
        ShowModalFunc={setOpenCategoriesModal} 
        ShowModal={openCategoriesModal}
        UserCatList={userCategories}
        UserCatFunc={setUserCategories}
        />}
        <Container
            sx={{
                display: 'flex', flexDirection: 'column',
                height: (onlyDisplayProfile?'90vh':'86.5vh'), width: '81vw', padding: '0px',
                     overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none', // Hide scrollbar for Webkit browsers
                    },
                    msOverflowStyle: 'none', // Hide scrollbar
                    marginBottom:onlyDisplayProfile?'0':'3.5vh'
            }}>
             {onlyDisplayProfile?<IconButton
              onClick={()=>(handleBackClick())}
              sx={{
              position: 'absolute',
              right:0,
              top: 0,
              color:"black"
              }}>
                <ChevronRightIcon fontSize="large" />
              </IconButton>:''}

              {/* Logo Svg Box */}
              <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: '20vh',
                            }}>
                            <LogoHashcuna_Black  sx={{height:'10vh', width: '30vw'}} />
               </Box> 

            {/* Profile deatiles Box */}
            { userDetailsLoading? 
                    <Box sx={{ height:'10vh', width:'100%',
                    marginTop:(onlyDisplayProfile?'2vh':'-7vh'),
                    marginBottom:'12vh',direction:'rtl'}}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl'}}>
                                    <Skeleton variant="circular" width={65} height={65} animation="wave"/>
                                <Box sx={{marginTop:'2.5vh',marginRight:'3.5vw'}}>
                                    <Skeleton variant="rounded" width={85} height={14} animation="wave"  sx={{marginBottom:'0.5vh'}}/>
                                    <Skeleton variant="rounded" width={110} height={15} animation="wave" />
                                </Box>           
                            </Box>
                            <Skeleton variant="rounded" width={260} height={12} animation="wave"  sx={{marginTop:'1.5vh',marginRight:'1vw'}} />
                            <Skeleton variant="rounded" width={210} height={12} animation="wave"  sx={{marginTop:'1vh',marginRight:'1vw'}} />
                    </Box>

                    :<Box sx={{ display:'flex', flexDirection:'column', height:'10vh', width:'100%',
                    //  marginTop:'-5.5vh',
                    marginTop:(onlyDisplayProfile?'4vh':'0.5vh'),
                    marginBottom:'10vh' }}>

                    <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl'}}>                    
                        <Avatar sx={{ backgroundColor: '#708DD3', width: 68, height: 68,marginTop:'-2vh'}}
                            alt={(userToDisplay.user.firstName).split('')[0]}
                            src={userToDisplay.user.profilePicture} />
                        <Box
                            sx={{ display: 'flex', flexDirection: 'column'}}>
                            <Typography variant="h2"  sx={{ fontSize:16,paddingRight: 1.5, textAlign: 'right' }}>
                                {/* דרור כהן */}
                                {userToDisplay.user.firstName + " " + userToDisplay.user.lastName}
                            </Typography>
                            
                            {/* Rating Box */}
                            <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl'}}>    
                            <Rating
                                name="half-rating-read"
                                value= {parseFloat(userToDisplay.user.rating.toFixed(1))}
                                readOnly
                                precision={0.1}
                                size="medium"
                                sx={{
                                    direction: 'ltr',
                                    paddingLeft: 1,
                                    transform: 'scaleX(-1)' }} />
                                        <Typography variant="body2" sx={{ fontSize: 14,color:'black',
                                                    marginTop:'0.6vh',marginRight:'1.5vw'}}>           
                                
                                {userToDisplay.user.rating===0?'':parseFloat(userToDisplay.user.rating.toFixed(1))}
                                </Typography> 
                            </Box>  

                        </Box>          

                    </Box>
                            <Typography variant="body1"  sx={{  fontSize:14, textAlign: 'right',marginTop:'0.8vh'}}>

                            {/* היי אני דרור כהן, אוהבת מאוד ילדים ולנקות 😊. מעוניינת לעזור ולתרום בניקיונות ,שותפות ובייביסיטר ריאח */}
                                {userToDisplay.user.description}
                            </Typography>

                    </Box>}

                {/* Score Box */}
                {onlyDisplayProfile?'':<Box
                    sx={{
                        width: '100%', height: '12vh', display: 'flex',
                        flexDirection: 'column', alignItems: 'end',
                    }}>
                        <Box
                        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'end', width:'100%'}}>
                            {userDetails.isManager?<Button id="btnManagment"  onClick={GoToManagmentPage} sx={{marginRight:'3vw'}}> 
                            <Typography variant="h2" sx={{fontSize:14}}>
                                ניהול קהילה
                            </Typography>
                            </Button>:''}
                            <Button id="btnMyOffers" onClick={GoToMyOffersPage}> 
                            <Typography variant="h2" sx={{fontSize:14}}>
                                ההצעות שלי
                            </Typography>
                            </Button>
                        
                        </Box>
                
                    <Box
                        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'end', width: '100%',marginTop:'0.5vh'}}>
                        <Button id="btnBuyCoupons">
                        <Typography variant="body1" sx={{fontSize:13}}>
                        ממש
                    </Typography>
                        </Button>
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                paddingRight: 1,
                                textAlign: 'right',
                                fontSize:14
                            }}>
                            הניקוד שלי : {userToDisplay.user.score}     
                        </Typography>
                        
                    </Box>
                    
                </Box>}
                <Divider sx={{marginTop:'-1vh',marginBottom:'2vh'}}/>

                {/* My categories Box */}
                <Box sx={{height:'13vh'}}>
                    
                    <Typography
                        variant="body1"
                    
                        sx={{
                            paddingRight: 1,
                            textAlign: 'right',
                            marginBottom:'1vh',
                            fontSize:14
                        }}>
                        {onlyDisplayProfile?'תחומי הענייין של '+userToDisplay.user.firstName:'תחומי העניין שלי'}
                    </Typography>
                    <Box
                        sx={{
                            borderBottom:'3px solid #ebebeb',

                            height: '9vh',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            overflowX: 'auto',  // Enable horizontal scrolling
                            overflowY: 'hidden',
                            whiteSpace: 'nowrap',  // Ensure the children stay in a single line
                            direction: 'rtl',
                            '&::-webkit-scrollbar': {
                                display: 'none',  //  hide scrollbar for Webkit browsers
                            },
                        }}>

                        {   userDetailsLoading?  
                        <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl' }}> 
                            <Skeleton variant="circular" width={51} height={51} animation="wave" sx={{marginRight:'3vh'}}/>
                            <Skeleton variant="circular" width={51} height={51} animation="wave" sx={{marginRight:'3vh'}}/>
                            <Skeleton variant="circular" width={51} height={51} animation="wave" sx={{marginRight:'3vh'}}/>
                            <Skeleton variant="circular" width={51} height={51} animation="wave" sx={{marginRight:'3vh'}}/>

                        </Box>

                        :(
                            <>
                            {onlyDisplayProfile?'':<Avatar
                            sx={{
                                width: 48,
                                height: 48,
                                bgcolor: '#DABB80',
                                margin: 2
                            }}
                        >
                            <IconButton aria-label="add"  onClick={() => setOpenCategoriesModal(true)} 
                            sx={{color:'black'}}
                            >
                                <AddIcon />
                            </IconButton>
                        </Avatar>}
                            {userCategories.length === 0? <Typography  variant="body2" sx={{ fontSize: 13,marginRight:'15px',marginTop:'5px',color:'grey'}}
                                                        gutterBottom > 
                                                        לא נבחרו תחומי עניין  </Typography>
                            : allCategories.map((category) => {
                                const IconComponent = iconMapping[category.iconName];
                                if (userCategories.includes(category.categroyID))

                                    return (
                                        <Avatar
                                            key={category.categroyID}
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                bgcolor: '#DABB80',
                                                margin: 1.5
                                            }}
                                        >
                                            {IconComponent ? (
                                                <IconComponent id={category.categroyID}
                                                    sx={{ color: 'black', fontSize: '30px' }} />
                                            ) : null}
                                        </Avatar>
                                    );
                            })}</>)
                        }
                    </Box>
                </Box>
            
                {/* Display Request Box */}     
                <Box sx={{marginTop:'4vh'}}>

                {onlyDisplayProfile?
                        <Box sx={{marginBottom:'2vh',display:"flex" ,flexDirection: 'row',justifyContent:"center", direction: 'rtl'}} >      
                            <Button  
                                onClick={() => handleSectionChange("assistance")}
                                sx={{ borderBottom: activeSection === "assistance" ? "2.5px solid #708DD3" : "none",
                                    color:'black',
                                    '&:hover': { 
                                        borderBottom: "2px solid black" ,
                                        backgroundColor:  "#ebebeb" ,
                                        borderRadius:  "6px" ,
                                    }, 
                                    marginLeft:'1.5vw' 
                                }}
                            >      
                                <Typography variant="body1" sx={{fontSize:13}}>
                                הסיועים של {userToDisplay?.user.firstName} 
                                </Typography>
                            </Button>
                            

                            <Button  
                                onClick={() => handleSectionChange("requests")}
                                sx={{ borderBottom: activeSection === "requests" ? "2.5px solid #EBD5A0" : "none",
                                    color:'black',borderRadius: 0,
                                    '&:hover': { 
                                        borderBottom: "2px solid black" ,
                                        backgroundColor:  "#ebebeb" ,
                                        borderRadius:  "6px" ,
                                    },  
                                }}
                            >
                                <Typography variant="body1" sx={{fontSize:13}}>
                                הבקשות של {userToDisplay?.user.firstName} 
                                </Typography>
                            </Button>
                        </Box>

                        : <Typography
                        variant="body1"
                    
                        sx={{
                            paddingRight: 1,
                            textAlign: 'right',
                            height:'2vh',
                            marginBottom:'2vh',
                            fontSize:14
                        }}>
                        הבקשות שלי </Typography>
                }
                    <Box
                    sx={{
                        height: (onlyDisplayProfile?'39vh':'24vh'),
                        width: '100%'
                    }}
                >    
                    <Grid container rowSpacing={2}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',                                    
                            }}>

                    {requestsLoading?   
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

                    : (
                            onlyDisplayProfile &&  activeSection === "assistance"?
                            allUserAssistants.length === 0? <Typography variant="body1" sx={{ fontSize: 14,marginTop:'5vh',color:'grey'}}
                                                                            gutterBottom > 
                                                            {userToDisplay.user.firstName+' עדיין לא '+(userToDisplay.user.gender==='m'?'העניק':'העניקה')+' סיוע'}
                                                            </Typography>                      
                            :allUserAssistants.map((assistance) => (
                                <Grid item xs={12} key={assistance.request.reqID}>
                                    <RequestDisplay
                                        UserName={assistance.fullNameOfReq}
                                        profileImg={assistance.profilePicture}
                                        DueDate={assistance.request.dueDate}
                                        DueTime={assistance.request.dueTime}
                                        DueDateHebrewDay={assistance.request.dueDate}
                                        Description={assistance.request.description}
                                        myProfile={false}
                                        onlyDisplayProfile={onlyDisplayProfile}
                                        />     
                                </Grid>
                            ))
                            :allUserRequests.length === 0? <Typography variant="body1" sx={{ fontSize: 14,marginTop:'5vh',color:'grey'}}
                                                                            gutterBottom > 
                                                            {userToDisplay.user.firstName+' עדיין לא '+(userToDisplay.user.gender==='m'?'ביקש':'ביקשה')+' סיוע'}

                                                            </Typography>
                            
                            : allUserRequests.map((request) => (
                                <Grid item xs={12} key={request.reqID}>
                                    <RequestDisplay
                                        ReqId={request.reqID}
                                        UserName=''
                                        DueDate={request.dueDate}
                                        DueTime={request.dueTime}
                                        DueDateHebrewDay={request.dueDate}
                                        PostDate={request.postDate}
                                        PostTime={request.postTime}
                                        Description={request.description}
                                        myProfile={true}
                                        CategoryId={request.categoryId}
                                        GotHelp={request.gotHelp}
                                        EditFunction={EditRequestDetails}
                                        DeleteFunction={handleDeleteReqFromProfile}
                                        onlyDisplayProfile={onlyDisplayProfile}
                                        />     
                                </Grid>
                            )))
                    }
                    </Grid>
                </Box>
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

                <Dialog 
                    open={openDialog}
                    keepMounted
                    onClose={()=>setOpenDialog(false)}
                    >
                    <DialogContent>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column',textAlign:'right'}}>
                        <Typography variant='h1' sx={{ fontSize: 16, marginTop:'0vh',marginBottom:'2vh'}}>{"בחרת למחוק את הבקשה שלך"}</Typography>
                        <Typography variant='body1' sx={{ fontSize: 15}}>{'האם'+(userDetails.user.gender==='m'?' אתה בטוח':' את בטוחה')+' שהתכוונת להסיר את הבקשה '}</Typography>
                        </Box>

                    </DialogContent>

                    <DialogActions >
                        <Button onClick={()=>DeleteRequestDetails(reqToDelete)} sx={{color:'black'}}>{(userDetails.user.gender==='m'?' כן, בטוח':' כן, בטוחה')}</Button>
                        <Button onClick={()=>setOpenDialog(false)} sx={{}}>לא, טעות</Button>
                    </DialogActions>
                </Dialog>

        </> 
        

    )
}

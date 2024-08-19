
import { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, BottomNavigation, BottomNavigationAction, ButtonBase, Divider, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';

import SdCardAlertOutlinedIcon from '@mui/icons-material/SdCardAlertOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';


import { postAndPutReqFunction } from '../utilities/ApiUtilities';
import { iconMapping } from '../utilities/ListsUtilities';
import { formatDueDate, formatPostDate, formatTime, getDayOfWeekInHebrew } from '../utilities/FunctionsUtilities';
import { useNavigate } from 'react-router-dom';
import { CategoriesContext } from '../contexts/CategoriesContextProvider';

// import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RequestDisplay(props) {

    //-------------------------------------------------------------------------//


    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setIsDrawerOpen(open);
    };
  
    const handleEdit = () => {
      props.EditFunction(props.ReqId);
      setIsDrawerOpen(false);
    };
  
    const handleDelete = () => {
      props.DeleteFunction(props.ReqId)
      setIsDrawerOpen(false);
    };

    //-------------------------------------------------------------------------//

    const {allCategories} = useContext(CategoriesContext);

    const apiSubmitHelp = 'https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/usersWantToAssist';
    const apiCancelHelp = 'https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/updateUserStatusToReq';

    const navigate = useNavigate();

    const reqObj={
        myOffer:false,
        reqId:props.ReqId,
        catId:props.CategoryId
    }

    // const [onlyDisplayProfile, setOnlyDisplayProfile] = useState(false);

    const userDetails = JSON.parse(localStorage.getItem('user'));
    
    const [buttonStates, setButtonStates] = useState({}); // State to manage button's text
    
    function isDateTimeFuture() {
        // Combine the date and time strings into a single Date object
        const targetDateTime = new Date(`${props.DueDate.split('T')[0]}T${props.DueTime}`);

        // Get the current date and time
        const currentDateTime = new Date();

        // Compare the target date and time with the current date and time  
        //In addition check if request got help
        return targetDateTime > currentDateTime && !props.GotHelp;
    };

    const getIconByCategoryId = (categoryId) => {
        let category = allCategories.find(cat => cat.categroyID === categoryId);
        return category ? iconMapping[category.iconName] : null;
    };
    const IconComponent = getIconByCategoryId(props.CategoryId);

    async function FetchForApplyOrCancel(obj, api, method) {

        try {
            let response = await postAndPutReqFunction(obj, api, method);
        } catch (error) {
            // Handle error
            console.error('Error in fetch:', error.message);
        }
    };

    const submitHelpFunction = async (reqID) => {
        let jsonObjToPostForHelp = {
            "userID": userDetails.user.userId,
            "requestForHelpID": reqID
        };
        let response = await FetchForApplyOrCancel(jsonObjToPostForHelp, apiSubmitHelp, 'POST');
    };
    const cancelHelpFunction = async (reqID) => {
        let jsonObjToPostForCancel = {
            "userID": userDetails.user.userId,
            "requestForHelpID": reqID,
            "statusApproval": "canceled"
        };
        let response = await FetchForApplyOrCancel(jsonObjToPostForCancel, apiCancelHelp, 'PUT');
    };

    const handleButtonClick = async (reqID) => {

        let currentText = buttonStates[reqID] || 'הגש סיוע';

        // Call the appropriate function based on button state
        if (currentText === 'הגש סיוע') {
            await submitHelpFunction(reqID);
        } else {
            await cancelHelpFunction(reqID);
        }
        setButtonStates(prevState => ({
            ...prevState,
            [reqID]: currentText === 'הגש סיוע' ? 'בטל סיוע' : 'הגש סיוע'
        }));
    };
    
    const goToOffersPendingPage = (reqId) => {
        
        navigate('/OffersToReq', { state: reqObj });
    };

    return (
        //sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl', marginTop: '1%' }}
        <>
            <Card sx={{ display: 'flex', flexDirection: 'column', direction: 'rtl', backgroundColor: '#f2f2f2',borderRadius: 4,
                        // maxHeight: props.onlyDisplayProfile? '135px':(props.ModalDisplay? '205px':'180px'), width:(props.ModalDisplay?'350px': '300px' )}}>
                        maxHeight:props.isSystemChat?'100':(props.onlyDisplayProfile? '135px':(props.ModalDisplay? '205px':'180px')), width: props.isSystemChat?'100%':(props.ModalDisplay?'350px': '300px' )}}>
                        <CardContent >
                    
                    {/* Row1 */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl', marginBottom:'5%'}}>

                        {/* green/red circle */}
                        {props.onlyDisplayProfile?'':(props.myProfile ? <Box  
                        sx={{ width: 14, height: 14, borderRadius: '50%',marginTop:'1%',
                              backgroundColor:(isDateTimeFuture() ?'greenyellow':'red') }}>
                        </Box>:'')}

                        {/* Text- Full Name */}
                        <Typography 
                        variant='h2'
                            sx={{ fontSize: 15, width:props.myProfile? '15%':'45%',textAlign:'right',
                                margin: props.isSystemChat?'12.7px': '0'
                            }} 
                            color={(props.myProfile ? "black" : "#708DD3")}
                        >
                            {/* טל ברק  */}
                            {props.UserName }  
                             {/* ץאליהו קסטנטוביץ */}
                        </Typography>

                        {/* Text- Due Date */}
                        {/* #DABB80 */}
                        <Typography 
                        variant='body1'
                        // variant={props.ModalDisplay?'body2':'body1'}

                            sx={{  width:(props.ModalDisplay?'45%':'50%'), marginRight: props.onlyDisplayProfile?'2%': '5%', borderRadius: '8px',  backgroundColor:(props.myProfile?'#DABB80':'#708DD3'),
                                   opacity:1, color: (props.myProfile?'black':'white'), paddingTop: (props.ModalDisplay?'1.4%':'1.8%'), paddingLeft: (props.ModalDisplay?'2%':'3%'), paddingRight: (props.ModalDisplay?'4%':'3%'), fontSize: 13,
                                   marginTop:(props.myProfile? '-2%':'-1%'), 

                                   }}>
                                {/* יום ד' 7/2 | 20:20 */}
                                {/* {getDayOfWeekInHebrew(props.DueDateHebrewDay)}  {formatDueDate(props.DueDate)} | {formatTime(props.DueTime)} */}
                                {getDayOfWeekInHebrew(props.DueDateHebrewDay)}  {formatDueDate(props.DueDate)} {props.isSystemChat?'':'|'} {formatTime(props.DueTime)}

                         </Typography>

                        {/* 3 dots Icon button */}  
                        {props.onlyDisplayProfile?'' :((props.myProfile && !props.GotHelp)?
                        <Button size="small"
                                sx={{ color: 'black', marginTop: '-3%',marginRight:'5%',marginLeft:'-8%' }}
                                // onClick={()=>props.EditFunction(props.ReqId)}
                                onClick={toggleDrawer(true)}
                                > 
                        <MoreHorizIcon/> 
                        </Button>:'')}
                    </Box>

                    <Divider  />
                     {/* Row2 */}
                 <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl', marginTop: '5%',marginRight:'-4%' }}>
                    {/* Display Img/Icon avatar Box */}
                       <Box>
                        {
                        props.myProfile ? 
                            ( 
                                IconComponent ? 
                                    (<Avatar sx={{ backgroundColor: '#DABB80', width: 48, height: 48 ,color:'black', marginTop:'15%'}} >
                                        <IconComponent /> 
                                        </Avatar> )
                                        : 
                                    (<Avatar sx={{ backgroundColor: '#DABB80', width: 48, height: 48, color:'red',marginTop:'15%'}} >
                                       <SdCardAlertOutlinedIcon/>
                                        </Avatar> )
                            ) : 
                            (<Avatar sx={{ backgroundColor: '#708DD3', width: 48, height: 48,marginTop:'15%'}}
                            alt={(props.UserName).split('')[0]}
                            src={props.profileImg}
                            onClick={()=>props.ModalDisplay||props.onlyDisplayProfile?'':props.GoToUserProfile(props.UserID)}
                            />)
                        }
                        </Box>
                        {/* <Typography variant='body2' sx={{ fontSize: 14,paddingRight: 1.5, textAlign: 'right',width:'100%',height:'90px' }}> */}
                        <Typography variant='body2' sx={{ fontSize: 14,paddingRight: 1.5, textAlign: 'right',width:'100%',height:'90px', margin:props.isSystemChat? '11px': 0,
                                                          paddingBottom:props.isSystemChat? '10px': '' }}>
                        {/* שלום, מחפשת מישהו שיוציא לי את הכלב שלום, מחפשת מישהו שיוציא לי את הכלב שלום, מחפשת מישהו. */}
                            {props.Description}
                        </Typography>
                        </Box>    
                     {/* Row3 */}
                {props.onlyDisplayProfile?'':<Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl',marginRight:'-8%' }}>      
                
                <Typography variant='body2' sx={{ fontSize: 12, width:'60%',marginRight:(props.ModalDisplay?'20px':'3px'),marginTop:(props.ModalDisplay?'20px':'0px')}}
                        color="grey"  gutterBottom >
                        {/* 23/05/24 15:38 */}
                       פורסם ב-  {formatPostDate(props.PostDate)} {formatTime(props.PostTime)}
                </Typography>

                    {props.ModalDisplay?'':<button
                        style={{ backgroundColor: '', borderRadius: '11px', color: 'black', fontSize:12,
                            fontFamily: 'Rubik',fontWeight:'500',marginTop: '-6%',height:'10%',marginRight:'8%', 
                                 border: props.myProfile? ('1px solid #DABB80'):('1px solid #708DD3')}}

                                 onClick={() => (props.myProfile)? goToOffersPendingPage(props.ReqId): handleButtonClick(props.ReqId)}
                    >{props.myProfile?'מי הציע לי?':(buttonStates[props.ReqId] || 'הגש סיוע')}</button>}
                </Box>}
               
               </CardContent>
            </Card >

            {/* //-----------------------------------------------------------------------------------------// */}
            
                <SwipeableDrawer
                        anchor="bottom"
                        open={isDrawerOpen}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        sx={{ 
                            '& .MuiPaper-root': { 
                              borderRadius: '10px 10px 0 0', 
                              padding: '7px 0',
                              bottom: '0vh', // Adjust the height of the tab to start higher
                              height: '22vh', // Ensures the entire area below the options is filled
                            } 
                          }}
                    >
                        <List sx={{ padding: '0' }}>
                        <ListItem button onClick={handleEdit}>
                            <ListItemText primary="עריכת בקשה" sx={{ textAlign: 'right', fontStyle: 'italic' }} />
                            <ListItemIcon sx={{ minWidth: 'auto', marginLeft: '10px' }}>
                            <EditIcon />
                            </ListItemIcon>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={handleDelete}>
                            <ListItemText primary="מחיקת בקשה" sx={{ textAlign: 'right', fontStyle: 'italic' }} />
                            <ListItemIcon sx={{ minWidth: 'auto', marginLeft: '10px' }}>
                            <DeleteIcon />
                            </ListItemIcon>
                        </ListItem>
                        </List>
                </SwipeableDrawer>
      
            {/* //-----------------------------------------------------------------------------------------// */}

        </>
    );
}






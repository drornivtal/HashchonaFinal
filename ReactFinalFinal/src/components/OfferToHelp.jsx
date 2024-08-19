
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, ButtonBase, Card, CardContent,Grid,IconButton,Modal,Typography } from "@mui/material";

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CloseIcon from '@mui/icons-material/Close';
///Status Icons:
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';  //ממתין למענה
import IconFacebookMessenger from "./IconFacebookMessenger";                 // בצ'אט עם המבקש
import IconHandshake from "./IconHandshake";                                
// import IconAgreement from "./IconAgreement";                                // הסכמה בין שני הצדדים-לחיצת ידיים

import IconThanksSticke from "./IconThanksSticke";                          // "תודה,הסתדרתי" -כמו מדבקה
import RequestDisplay from "./RequestDisplay";
import IconHandshake_Black from "./IconHandshake_Black";
import { CategoriesContext } from "../contexts/CategoriesContextProvider";

const statusMapping = {
    pending: {IconName:AccessTimeOutlinedIcon,
              IconText:'ממתין למענה',
              IconFontSize:'29px'},
               
    accepted: {IconName:IconFacebookMessenger,
              IconText:"תיאום פרטים",
              IconFontSize:'31px'},

    Rejected: {IconName:IconThanksSticke,
              IconText:'',
              IconFontSize:'31px'}, 

    closed: {IconName:IconHandshake,
              IconText:'יאלה קבענו',
              IconFontSize:'31px'}    
 };

export default function OfferToHelp(props) {
    
    const {allCategories} = useContext(CategoriesContext);
    const IconComponent = (props.MyOffer? statusMapping[props.OfferStatus].IconName:null) ; //pending,accepted,Rejected,closed
    const [accepted, setAccepted] = useState(false);
    const [myOffer, setMyOffer] = useState(props.MyOffer);

    //Modal States:
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const UpdateAccepted=(userId, FullName)=>{
        setAccepted(true);
        props.AcceptFunction(userId, FullName);
    };
    const getCatNameByCatId = (catId) => {
        let category = allCategories.find(cat => cat.categroyID === catId);
        return category ? category.catName : 'קטגוריה לא הוצגה';
    };

    return (
        <>
            <Card sx={{ textAlign: 'right', backgroundColor: myOffer?'#90A9DF':(accepted? '#ebebeb' :'#EBD5A0'), borderRadius: 4, maxHeight: '55px', width:'295px'}}>
                <CardContent >

                        {/* Display  Box */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl' }}>

                         {/*  img Box */}  
                        <Box sx={{ marginTop:'-4.5%'}}>
                                <Avatar sx={{ 
                                    backgroundColor: '#EBD5A0', width: 48, height: 48 ,color:'black'}}
                                    onClick={()=>props.GoToUserProfile(props.UserId)}
                                // alt={(props.UserName).split('')[0]}
                            src={props.ProfileImg}/>
                        </Box>

                            {/*  name Box */}
                            <Box sx={{ marginRight:'4%',marginLeft:'4%',marginTop:(accepted?'-3%':'0.2%'), width:(accepted?'90%':'46%') }}>

                                        {myOffer? 
                                        <>
                                        <Typography variant="body1"
                                            sx={{ fontSize: 14  , color:"black",marginTop:'-7px',marginBottom:'-4px'}} >     
                                                {/* בייביסיטר */}
                                                {getCatNameByCatId(props.ReqCategory)}
                                            </Typography>

                                            <ButtonBase onClick={()=>handleOpen()}>
                                                <Typography variant="body2"
                                                sx={{ fontSize: 13 , color:"black",marginRight:'2px'}} >
                                                  ראה עוד...
                                                </Typography>
                                            </ButtonBase>
                                        </>
                                        :(accepted?<Typography variant="body1"
                                            sx={{ fontSize: 14 , color:'Grey'}}  
                                        >
                                        {'אישרת את ההצעה של ' + props.FullName + '. '}
                                        
                                        <Link to="/AllChats" color="inherit" underline="always" 
                                        rel="noopener noreferrer" >לצ'אט</Link>
                                        </Typography>:

                                        <Typography variant="h2"
                                            sx={{ fontSize: 15 , color:"black"}}  
                                        >
                                        {/* חוליאן קסטנטוביץ */}
                                        {/* שירלי מועלם */}
                                       {/* אלי אליהו יעקובוביץ  */}
                                        {props.FullName}
                                        </Typography>)}
                            </Box>
                         {/* Buttons Box */}  
                       { 
                       myOffer? 
                            <Box sx={{marginTop:'-7px',marginRight:'30px'}}>

                                {/* <IconComponent sx={{fontSize: '31px', color:'black'}}/> */}
                                <IconComponent sx={{fontSize: statusMapping[props.OfferStatus].IconFontSize, color:'black'}}/>

                                <Typography sx={{ fontSize: 9 ,fontWeight:500 , color:"black",
                                                marginTop:'-6px',marginRight:'-11px'}} >
                                {/* ממתין למענה */}
                                {statusMapping[props.OfferStatus].IconText}   {/* pending,accepted,Rejected,closed */}
                                </Typography>
                            </Box>
                       :(accepted? 
                            <CloseIcon sx={{ fontSize: '15px', color: 'black',marginLeft:'-3%',marginTop:'-3%'}} 
                            onClick={()=>props.CloseAcceptMessage(props.UserId)}  />
                            :<Box sx={{ marginTop:'-2%'}}>
                                    <ButtonBase onClick={()=>props.CancleFunction(props.UserId)}>
                                    <HighlightOffIcon sx={{fontSize: '34px'}}/>
                                    </ButtonBase>
                                    <ButtonBase onClick={() => UpdateAccepted(props.UserId, props.FullName)}>                           
                                    <CheckCircleOutlineRoundedIcon sx={{fontSize: '34px'}}/>
                                    </ButtonBase>
                                </Box>)
                        }
                     </Box>
                </CardContent>         
            </Card >

            <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{  
                            position: 'absolute',
                            top: '36%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                            }}>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right:-15,
                                top: -40,
                                color:'#f2f2f2'
                              }}
                            >
                            <CloseIcon />
                        </IconButton>
                      <Grid item xs={12} >
                                <RequestDisplay 
                                    // ReqId={}
                                    UserName={props.FullName}
                                    DueDate={props.DueDate}
                                    DueTime={props.DueTime}
                                    DueDateHebrewDay={props.DueDate}
                                    PostDate={props.PostDate}
                                    PostTime={props.PostTime}
                                    Description={props.Description}
                                    profileImg={props.ProfileImg}
                                    ModalDisplay={true}
                                />
                            </Grid>
                    </Box>
            </Modal>
       </>
    );
}
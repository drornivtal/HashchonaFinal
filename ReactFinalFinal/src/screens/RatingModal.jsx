
import { useState } from "react";
import { Avatar, Box, Button, CircularProgress, IconButton, keyframes, Modal, Rating, TextField, Typography } from "@mui/material";

import LogoHashcuna_White from "../components/LogoHashcuna_White";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { postAndPutReqFunction } from "../utilities/ApiUtilities";


    const rotate = keyframes`
      from {
        transform: rotateY(0);
      }
      to {
        transform: rotateY(180deg);
      } `;

      const vibrate = keyframes`
      0% { transform: translateX(0); }
      15% { transform: translateX(-5px); }
      30% { transform: translateX(5px); }
      45% { transform: translateX(-5px); }
      60% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
      90% { transform: translateX(5px); }
      100% { transform: translateX(0); }
    `;

    export default function RatingModal(props) {

      const apiPostRanking = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/PostRankingForUser`;

      const [rating1, setRating1] = useState(0);
      const [rating2, setRating2] = useState(0);
      const [rating3, setRating3] = useState(0);
      const [description, setDescription] = useState('');
      const [isVibrating, setIsVibrating] = useState(false);

      const [isSubmitting, setIsSubmitting] = useState(false);
      const [isSuccess, setIsSuccess] = useState(false);
      const [showSuccessMessage, setShowSuccessMessage] = useState(false);

      const modalDueDateFormat = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const date = new Date(dateString).toLocaleDateString('en-GB', options);
        return date.replace(/\//g, '.');
      };

      const handelClose=()=>{
      props.ShowModalFunc(false);
      props.SetOffersFunc(props.OffersList.filter(offer => offer.reqID !== props.ReqId));
      };

      const handelRanking=()=>{
        if (rating1 < 1 || rating2 < 1 || rating3 < 1) {
          console.log('יש לדרג את כל אחד מהסעיפים בלפחות כוכב 1');
          setIsVibrating(true);
          setTimeout(() => {
            setIsVibrating(false);
          }, 500); // Duration of the vibration animation
          return;
        } 
        let ratingObj = {
          "UserID": props.UserId,          
          "ReqID": props.ReqId,           
          "Ranking":parseFloat((rating1+rating2+rating3)/3),        
          "Description": description  
        };
            console.log(ratingObj);
            postRaiting(ratingObj);
        };

      const postRaiting = async (ratingObjToPost) => {
        console.log('Im in PostRating Function!');
          setIsSubmitting(true);
        try {
          const response = await postAndPutReqFunction(ratingObjToPost, apiPostRanking, 'POST');
          props.SetOffersFunc(props.OffersList.filter(offer => offer.reqID !== props.ReqId));

          console.log('Rating sent successfully:', response);
          setIsSuccess(true);
          setTimeout(() => {
            setShowSuccessMessage(true);
          },500);
        } catch (error) {
            console.error('Error in fetch:', error.message);
            props.SetOpenSnackBarFunc(true);
        }finally {
          setTimeout(() => {
            setIsSubmitting(false);
          },600);
        }
      }; 
      
      return (
             <Modal
             open={props.ShowModal}>
                    <Box sx={{display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              backgroundColor: '#805C9B',
                              height:'92vh', 
                              width:'80vw',  
                              marginLeft:'10vw',
                              marginTop:'5vh'           
                            }}>
                          
                          {/* Icon close Box */}
                           <IconButton
                            aria-label="close"
                            onClick={()=>handelClose()}
                            sx={{
                                position: 'absolute',
                                right:40,
                                top: 40,
                                color:'#f2f2f2'
                              }}
                            >
                            <CloseIcon />
                          </IconButton>

                          {/* Logo Svg Box */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: '15vh'
                            }}>
                            <LogoHashcuna_White  sx={{height:'10vh', width: '26vw'}} />
                        </Box> 

                        {/* header Box */}
                        <Box  sx={{width:'100%',marginTop:'-5vh',textAlign:'center'}}>
                        <Typography variant="body2" sx={{ fontSize: 14,color:'white'}}> 
                           {props.FullName+' '}{props.Gender === 'm'?'העניק':'העניקה'}{' לך סיוע ב'+props.CategoryName}
                           {/* {' אלי אליהו יעקובוביץ  העניק לך סיוע בדוגווקינג מקצועי מאוד מאוד'} */}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 14,color:'white'}}>           
                          {/* {'בתאריך 11.08.24'} */}
                          {'בתאריך '+ modalDueDateFormat(props.DueDate)}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 14,color:'white'}}>           
                          {':לדירוג הסיוע'}
                        </Typography>
                        </Box>

                        {/* Img Profile Box */}
                        <Box sx={{ display: 'flex', flexDirection:'column',alignItems: 'center',marginTop:'2vh',}}>
                        <Avatar sx={{ backgroundColor: '#708DD3', width: 55, height: 55,zIndex: 2}}  
                        alt={(props.FullName).split('')[0]}
                        src={props.ProfileImg} />
                        </Box>

                        {/* Rating Box */}
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:'-4vh',
                                  backgroundColor:'#e4e4e4',height:'53vh',width:'65vw',borderRadius:'10px',
                                  animation: `
                                  ${isSuccess ? `${rotate} 1s ease-in-out` : 'none'},
                                  ${isVibrating ? `${vibrate} 0.5s ease-in-out` : 'none'}
                                `,
                                  animationFillMode: 'forwards',
                                  transformStyle: 'preserve-3d',
                                  perspective: 1000,
                                  zIndex: 1
                                  }}>

                      {  
                              !showSuccessMessage ?
                              (<><Typography variant="body1" sx={{ fontSize: 14,color:'black',
                                                  marginTop:'5vh',marginBottom:'0.5vh'}}>           
                                {'אמינות ומקצועיות'}
                              </Typography> 
                                <Rating
                                 precision={1}
                                 size="large" 
                                 value={rating1}
                                 onChange={(event, newValue) => setRating1(newValue)} 
                                 sx={{ direction: 'ltr',
                                 transform: 'scaleX(-1)' 
                                 }} />

                              <Typography variant="body1" sx={{ fontSize: 14,color:'black',
                                                marginTop:'2.5vh',marginBottom:'0.5vh'}}>           
                                {'עמידה בזמנים'}
                              </Typography> 

                                <Rating
                                 precision={1}
                                 size="large" 
                                 value={rating2}
                                 onChange={(event, newValue) => setRating2(newValue)} 
                                 sx={{ direction: 'ltr',transform: 'scaleX(-1)' }} />

                              <Typography variant="body1" sx={{ fontSize: 14,color:'black',
                                                marginTop:'2.5vh',marginBottom:'0.5vh'}}>           
                                {'יעילות'}
                              </Typography> 

                                <Rating
                                 precision={1}
                                 size="large" 
                                 value={rating3} 
                                 onChange={(event, newValue) => setRating3(newValue)} 
                                 sx={{ direction: 'ltr',transform: 'scaleX(-1)' }} /> 

                                <Typography variant="body1" sx={{ fontSize: 14,color:'black',
                                                  marginTop:'2vh',marginBottom:'0.8vh'}}>           
                                {'פירוט קצר'}
                              </Typography>
                              
                              <TextField 
                                    multiline
                                    rows={3}
                                    inputProps={{
                                      maxLength: 100,
                                      style: { fontSize: 14, textAlign:'right',direction:'rtl'},
                                    }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    sx={{
                                      width: '53vw',
                                      '& .MuiOutlinedInput-root': {
                                        padding: '4px 8px',
                                        borderRadius: '8px',
                                        backgroundColor: 'white',
                                        '& fieldset': {
                                          borderColor: 'black',
                                          borderWidth: '1px',
                                          borderRadius: '10px',
                                        },
                                        '&:hover fieldset': {
                                          borderColor: 'black',
                                        },
                                        '&.Mui-focused fieldset': {
                                          borderColor: '#805C9B',
                                        },
                                      },
                                      '& .MuiInputBase-inputMultiline': {
                                        padding: 0,
                                        lineHeight: 1.4,
                                        paddingTop: '4px',
                                      }}} /></>)

                                      :( <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          flexDirection: 'column',
                                          width: '90%',
                                          height: '100%',
                                          transform: 'rotateY(180deg)', // Rotate the box again to correct orientation
                                          animationFillMode: 'forwards',

                                        }}
                                        //variant='h1'
                                        //marginBottom:'2vh'
                                      >
                                        <Typography variant='h2' fontSize={19}  sx={{ marginBottom:'1vh', color: 'black',textAlign:'center',direction:'rtl' }}>
                                        הדירוג התקבל בהצלחה,
                                        </Typography>
                                        <Typography variant='h2' fontSize={19} sx={{ marginBottom:'3vh', color: 'black',textAlign:'center',direction:'rtl'}}>
                                          תודה על שיתוף הפעולה!
                                        </Typography>
                                        <CheckCircleIcon sx={{ color: '#25D366', fontSize: 55 }} />
                                      </Box> )
                                    }
                        </Box>

                        {/* Sending Button */}
                       {isSuccess&&!isSubmitting?'':<Button
                        variant="contained"
                         sx={{
                                    marginTop: '2.5vh',
                                    paddingTop:'1.1vh',
                                    color: 'black',
                                    backgroundColor: '#e4e4e4',
                                    height: '5.5vh',
                                    width: '22.5vw',
                                    fontSize: 15, 
                                    borderRadius: '8px',
                                    border: '1px solid black',
                                    textAlign: 'center', // Centers text horizontally
                                    display: 'flex', // Allows centering of text vertically
                                    alignItems: 'center', // Centers text vertically
                                    justifyContent: 'center', // Centers text horizontally
                                    // boxShadow: 'none',
                                    '&:hover': {
                                      backgroundColor: '#e4e4e4', // Keeps the background color on hover
                                      borderColor: '#805C9B', // Changes the border color on hover
                                      boxShadow: 'none', // Removes the default MUI shadow on hover
                                    },
                                    '&:active': {
                                      backgroundColor: '#e4e4e4', // Keeps the background color on click
                                      boxShadow: 'none', // Removes the default MUI shadow on click
                                      transform: 'scale(0.98)', // Optional: Adds a slight shrink effect on click
                                    },
                            }}
                        onClick={()=>handelRanking()}
                        disabled={isSubmitting}
                        >
                                   {isSubmitting ? ( <CircularProgress size={24} sx={{ color: 'white' }} />) : ('שליחה')}
                      </Button>}

                    </Box>
      
            </Modal>
      )
    }
    
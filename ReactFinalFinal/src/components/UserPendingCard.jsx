
import { useState } from 'react';
import { Box, Typography, Divider, IconButton, Avatar, Card, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function UserPendingCard(props) {
  
  const [flipped, setFlipped] = useState(false);
  const [objStates, setObjStates] = useState({
    loading: false,
    regular: true,
    approved: false,
    });

  const handleStateUpdate = (newStates) => {
    setObjStates((prevStates) => ({ ...prevStates, ...newStates }));
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <Card sx={{ position: 'relative', width: '135px', height: '135px',
                overflow: 'hidden',borderRadius:'8px',
                 boxShadow: '0 8px 8px rgba(0, 0, 0, 0.1)',
}}>
        {objStates.loading? <CircularProgress color="inherit" size={30} sx={{color:'grey', marginTop:'45px'}} />
        :(!objStates.regular?
        <Box 
        sx={{ display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent:'center',
          width:'100%',
          height:'100%',
          backgroundColor:'#ebebeb',
          // padding:'5px'
          }}>
            {objStates.approved?
            <>
            <Typography variant="body2"
              sx={{ fontSize: 14 , color:'grey',marginTop:'15px'}} >
                {'אישרת את בקשת ההצטרפות של' } 
              </Typography>
              <Typography variant="body2"
              sx={{ fontSize: 14 , color:'grey',marginTop:'0px'}} >
                {' '+ props.FullName} 
                {/* {" אלי אליהו יעקובוביץ"} */}
              </Typography>
                <TaskAltIcon sx={{fontSize:'32px',color:'#25D366',marginTop:'10px'}}/>
            </>
            : <>
             <Typography variant="body2"
               sx={{ fontSize: 14 , color:'grey',marginTop:'15px'}} >
                 {'אופס! משהו השתבש'}
               </Typography>
               <Typography variant="body2"
               sx={{ fontSize: 14 , color:'grey',marginTop:'0px'}} >
                  {'נסו שוב מאוחר יותר'}  
               </Typography>
                 <ErrorOutlineIcon sx={{fontSize:'32px',color:'red',marginTop:'10px'}}/>
             </>}
        </Box>
        :(
            <>
              <Box
              sx={{
                display: 'flex',
                width: '200%',
                height: '100%',
                transform: flipped ? 'translateX(-50%)' : 'translateX(0)',
                transition: 'transform 0.5s ease-in-out',
              }}
            >
                  {/* Content 1 */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '50%',
                      height: '100%',
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },
                      msOverflowStyle: 'none',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginRight: '35px' }}>
                      <IconButton onClick={handleFlip}>
                        <ChevronLeftIcon fontSize="small" />
                      </IconButton>
                      <Avatar
                        
                        src={props.ProfileImg}
                        sx={{
                          height: 55,
                          width: 55,
                          marginTop: '10px',
                        }}
                      />
                    </Box>
                    <Typography variant="body1" sx={{ fontSize: 14, width: '100%', marginTop: '7px' }}>
                      {/* {'דרור כהן, 26'} */}
                      {props.FullName+', '+props.Age}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '7px' }}>
                      <CancelIcon sx={{ color: 'red', marginRight: '4px' }} onClick={()=>props.CancleFunction(handleStateUpdate)} />
                      <CheckCircleIcon sx={{ color: '#25D366' }} onClick={()=>props.AcceptFunction(handleStateUpdate)}/>
                    </Box>
                  </Box>

                  {/* Content 2 */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '50%',
                      height: '100%',
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },
                      msOverflowStyle: 'none',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginLeft: '34px' }}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: 14, width: '100%', direction: 'rtl', marginTop: '6px' }}
                      >
                        {"כתובת:"}
                      </Typography>
                      <IconButton sx={{ marginLeft: '7px' }} onClick={handleFlip}>
                        <ChevronRightIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: 13, width: '100%' }}>
                      {/* {'קרית טבעון, מרדכי טננבויים, 44'} */}
                      {props.Address}
                    </Typography>
                    <Divider
                      sx={{
                        borderColor: '#90A9DF',
                        width: '80%',
                        marginBottom: '4px',
                        marginTop: '13px',
                      }}
                    />
                    <Typography variant="body1" sx={{ fontSize: 14, width: '100%', direction: 'rtl', marginTop: '7px' }}>
                      {"תיאור:"}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 12, width: '100%' }}>
                      {/* {"היי אני דרור כהן, אוהבת מאוד ילדים ולנקות 😊. מעוניינת לעזור ולתרום בניקיונות ,שותפות ובייביסיטר ריאח"} */}
                      {props.Description}
                    </Typography>
                  </Box>
              </Box>
              <IconButton sx={{ position: 'absolute', top: '50%', left: flipped ? 'auto' : 0, right: flipped ? 0 : 'auto', transform: 'translateY(-50%)' }} onClick={handleFlip} />
          </>))}
    </Card>
  );
};


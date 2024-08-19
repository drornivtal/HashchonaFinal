
import { Avatar, Box, Button, CircularProgress, Grid, IconButton, Modal, Typography } from "@mui/material";
import LogoHashcuna_Black from "../components/LogoHashcuna_Black";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from "react";
import { CategoriesContext } from "../contexts/CategoriesContextProvider";
import { iconMapping } from "../utilities/ListsUtilities";
import { postAndPutReqFunction } from "../utilities/ApiUtilities";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { createSnackbar } from "../utilities/FunctionsUtilities";



export default function CategoriesModal(props) {

  const {allCategories} = useContext(CategoriesContext);
   const ApiUpdateCategories=`https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/Users/insertUserCategories`;

    const userDetails = JSON.parse(localStorage.getItem('user'));
    const [selectedCategories, setSelectedCategories] = useState(props.UserCatList);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [snackHideDuration, setSnackHideDuration] = useState(4000);


    const checkIfChanges = ( originalArray, newArray)=> {
      if (originalArray.length !== newArray.length) {
        console.log("There is a change!");
        return true;
      }
    
      // Sort both arrays and compare each element
      const sortedOriginal = [...originalArray].sort();
      const sortedNew = [...newArray].sort();
    
      for (let i = 0; i < sortedOriginal.length; i++) {
        if (sortedOriginal[i] !== sortedNew[i]) {
          console.log("There is a change!");
          return true;
        }
      }
    
      console.log("No change.");
      return false;
    };

    const updateCategories = async () => {

      if(!checkIfChanges(props.UserCatList,selectedCategories)) 
        return;
      setLoading(true);
      setSuccess(false);
      const dataToPost = {
        UserID: userDetails.user.userId,
        categoriesID: selectedCategories
      };
      
      try {
        const response = await postAndPutReqFunction(dataToPost,ApiUpdateCategories,'POST');
        // if(response)
        props.UserCatFunc(selectedCategories);
        const filteredCategories = selectedCategories.map(categoryId => {
          return allCategories.find(category => category.categroyID === categoryId);
        }).filter(Boolean);
        
        console.log(filteredCategories);
        
        userDetails.categories=filteredCategories;
        console.log(userDetails);
        localStorage.setItem('user', JSON.stringify(userDetails));
        setSuccess(true);

        setTimeout(() => {
          setLoading(false);
      }, 1000);

        setTimeout(() => {
          props.ShowModalFunc(false);
        }, 3000) ; 
      } catch (err) {
          console.log(err.message);
          setSnackbarMessage('אופס! משהו השתבש... נסו שוב מאוחר יותר');
          setSnackbarSeverity('error');

          setTimeout(() => {
            setLoading(false);
            setOpenSnackbar(true);
        }, 1000)  
 
      }
  };
    
    const handleIconClick = (categoryID) => {
        setSelectedCategories(prevSelected => {
            if (prevSelected.includes(categoryID)) {
                return prevSelected.filter(c => c !== categoryID);
            } else {
                return [...prevSelected, categoryID];
            }
        });
    };


    return (
      <>
        <Modal
        open={props.ShowModal}>
               <Box sx={{display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center',
                        //  backgroundColor: '#FFFFFFCC',  
                         backgroundColor: '#F5F5F5',  
                         height:'90vh', 
                         width:'80vw',  
                         marginLeft:'10vw',
                         marginTop:'3vh' ,
                         overflowY: 'auto',
                         '&::-webkit-scrollbar': {
                             display: 'none', // Hide scrollbar for Webkit browsers
                         },
                         msOverflowStyle: 'none', // Hide scrollbar
                       }}>
                     
                     {/* Icon close Box */}
                      <IconButton
                       aria-label="close"
                       onClick={()=>props.ShowModalFunc(false)}
                       sx={{
                           position: 'absolute',
                           right:40,
                           top: 40,
                           color:'black'
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
                           height: '20vh'
                       }}>
                       <LogoHashcuna_Black  sx={{height:'15vh', width: '26vw'}} />
                   </Box> 

                   {/* header Box */}
                   <Box  sx={{width:'100%',marginTop:'-6vh',textAlign:'center'}}>
                   <Typography variant="body2" sx={{ fontSize: 16,color:'black'}}> 
                      {',כדי להכיר אותך טוב יותר'}
                   </Typography>
                   <Typography variant="body2" sx={{ fontSize: 16,color:'black'}}>           
                       {(userDetails.user.gender ==='m'?'בחר':'בחרי')+' תחומי עיניין שמתאימים לך'}
                    
                   </Typography>
                   
                   </Box>

                     {/* Categories Box */}
                    <Box
                        sx={{
                            height: '67vh',
                            width: '100%',
                            marginTop:'-2vh'
                            
                        }}>

                            <Grid container rowSpacing={5} columnSpacing={0}
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop:'1vh',
                            }}>
                            
                        {
                          !allCategories?''
                            :allCategories.map((category) => {
                                const IconComponent = iconMapping[category.iconName];
                                const isSelected = selectedCategories.includes(category.categroyID);
                                return (

                        
                                    <Grid item xs={4} key={category.categroyID} sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                  
                                      <Button
                                            onClick={() => handleIconClick(category.categroyID)}
                                            sx={{
                                                bgcolor: isSelected ? '#EBD5A0' : '', //yellow
                                                border: '3px solid #EBD5A0', //Yellow Border
                                                borderRadius: 15,
                                                width: '65px',
                                                height: '65px',
                                                minWidth: '60px',
                                                // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.9)', // Adds shading to the button
                                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)', // Adds shading to the button
                                                '&:hover': {
                                                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)', // Darker shadow on hover
                                                    bgcolor: '#EBD5A0', // Maintain yellow background on hover
                                                }
                                            }} >
                                            {IconComponent ? (
                                                <IconComponent id={category.categroyID} sx={{ color: 'black', fontSize: '28px' }} />
                                            ) : null}
                                      </Button>
                                      
                                       <Typography variant="body1" sx={{ fontSize: 14,marginTop:'1vh',color:'black'}}>{category.catName}</Typography>
                                    </Grid>
                                );
                            })
                            
                        }

                        </Grid>

                    </Box>


            {loading?<CircularProgress color="inherit" size={28} sx={{marginTop:'-2vh'}} />
            :(success? <TaskAltIcon sx={{fontSize:'40px',color:'#25D366', marginTop:'-2vh'}}/>
            :<Button
                      variant="outlined"
                      onClick={() => updateCategories()}
                      sx={{
                        marginTop:'-4vh',
                        border: '3px solid #EBD5A0',
                        borderRadius:'18px',
                        color: 'black', 
                        '&:hover': {
                          borderColor: '#EBD5A0',
                          backgroundColor:  '#EBD5A0' ,
                        },
                        backgroundColor: '#EBD5A0' ,
                      }}
                    >
                      סיימתי
            </Button>)}
               </Box>
 
       </Modal>
         {
          createSnackbar({
              open: openSnackbar,
              message: snackbarMessage,
              severity: snackbarSeverity,
              onClose: () => setOpenSnackbar(false),
              autoHideDuration:snackHideDuration
          })
      }
            </>

            )}

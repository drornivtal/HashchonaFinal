import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Container, IconButton, Typography, AppBar, Toolbar } from "@mui/material";
import LogoImage from '../assets/Logo_TheStreets.png';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { ref, set, onValue, off } from 'firebase/database';
import { database } from '../utilities/FirebaceConfig';
import { postAndPutReqFunction } from "../utilities/ApiUtilities";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import '../styles/AllChats.css';
import ChatToDisplay from '../components/ChatToDisplay';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  fontWeight: 5 ,
  direction: 'rtl',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function AllChats() {
  const navigate = useNavigate();
  const backToHomepage = () => {
    navigate('/Home');
  };

  const GetSpecificUsersApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/Users/GetSpecificUsers`;

  const [chats, setChats] = useState([]);
  const [userIDs, setUserIDs] = useState(new Set());
  const [usersDetails, setUsersDetails] = useState([]);
  const [combinedChats, setCombinedChats] = useState([]);
  const [systemChat, setSystemChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userDetails = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const userChatsRef = ref(database, `Users/${userDetails.user.userId}/Chats`);

    const unsubscribe = onValue(userChatsRef, async (snapshot) => {
      if (snapshot.exists()) {
        const chatIDs = Object.keys(snapshot.val());

        const chatDetails = await Promise.all(chatIDs.map(fetchChatDetails));
        setChats(chatDetails);

        const uniqueUserIDs = new Set();

        chatDetails.forEach(chat => {
          const [userID1, userID2] = chat.chatID.split('+');

          // Add the ID of the other user
          if(userID1 == 0){            
            setSystemChat(true);
          } else if (userID1 == userDetails.user.userId) {
            uniqueUserIDs.add(userID2);
          } else {
            uniqueUserIDs.add(userID1);
          }
        });

        setUserIDs(uniqueUserIDs);

        // Prepare JSON payload
        const jsonObjectUsers = { UserID: Array.from(uniqueUserIDs).map(id => parseInt(id, 10)) };
        try {
          const response = await postAndPutReqFunction(jsonObjectUsers, GetSpecificUsersApi, 'POST');

          setUsersDetails(response);

        } catch (error) {
          console.log('Error in fetch: ', error.message);
        }
      } else {
        console.log('No chat data available');
      }
    });

    return () => {
      off(userChatsRef);
    };
  }, [userDetails.user.userId,chats]);

  useEffect(() => {
    const combined = chats.map(chat => {
      const [userID1, userID2] = chat.chatID.split('+').map(id => parseInt(id, 10));
  
      // Determine the ID of the other user
      const otherUserID = (userID1 == userDetails.user.userId ? userID2 : userID1);
      // Find the details of the other user
      const otherUserDetails = usersDetails.find(user => user.user.userId == otherUserID) || {};
      let systemChat = false;
      if(userID1 == 0 || userID2 == 0){
        systemChat=true;
      }

      return {
        ...chat,
        otherUserDetails,
        systemChat
      };
    });

    setCombinedChats(combined);
    console.log(combined);

  }, [chats, usersDetails]);

  const fetchChatDetails = (chatID) => {
    return new Promise((resolve, reject) => {
      const chatRef = ref(database, `Chats/${chatID}`);

      onValue(chatRef, (snapshot) => {
        if (snapshot.exists()) {
          const chatData = snapshot.val();
          resolve({
            chatID,
            ...chatData
          });
        } else {
          reject('Chat not found');
        }
      });
    });
  };

  const goToChatPage = (userDetailsChat, chatID, isSystemChat) => {
    navigate('/ChatPage',{state:{otherUserDetails : userDetailsChat, chatID: chatID, isSystemChat:isSystemChat}});
  };

  console.log(combinedChats);
  // Filter chats based on search query
  const filteredChats = combinedChats.filter(chat => {
    const otherUserName = chat.systemChat ? "הודעת מערכת" : `${chat.otherUserDetails.user?.firstName} ${chat.otherUserDetails.user?.lastName}` || '';

    return otherUserName.includes(searchQuery);
  });

  return (
    <>
      <Button onClick={backToHomepage} 
        style={{ color: 'black', marginRight: 250 }}>
        {<ArrowBackIosIcon />}
      </Button>
      <Container maxWidth="lg" style={{ height: '90vh', width: '75vw', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '20vh',
            width: '100%',
            marginTop: -7
          }}
        >
          <img
            src={LogoImage}
            alt="Logo"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 3 }}>
          <Typography
            variant="body1"
            component="p"
            sx={{
              textAlign: 'center',
              fontWeight: '900',
              fontSize: '18px',
            }}
          >
            הצ'אטים שלי
          </Typography>
        </Box>
        <Box sx={{ marginBottom: 5 }}>
          <AppBar position="static">
            <Toolbar className='ToolBar'>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="חיפוש"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredChats.map((chat) => (
            <ChatToDisplay
              key={chat.chatID}
              otherUserDetails={chat.systemChat ? { userName: "System Message" } : chat.otherUserDetails.user}
              massages={chat.massages}
              chatID={chat.chatID}
              goToChatPage={goToChatPage}
              systemChat={chat.systemChat}
            />
          ))}
        </Box>
      </Container>
    </>
  );
}

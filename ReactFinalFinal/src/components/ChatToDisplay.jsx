import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import LogoImage from '../assets/Logo_TheStreets.png';

function ChatToDisplay(props) {
  console.log('ChatToDisplay Props:', props);
  
  // Identify if it's a system chat
  const isSystemChat = props.systemChat;

  if (!props.massages) {
    // Handle the case where data is not yet available
    return null;
  }

  if (!props.otherUserDetails && !isSystemChat) {
    return null;
  }

  const { profilePicture = '', firstName = 'Unknown', lastName = '', userID = -1 } = props.otherUserDetails || {};

  let latestMessage = '';

  if (!isSystemChat) {
    // Find the latest message based on creation time or ID
    const messagesArray = Object.values(props.massages);
    latestMessage = messagesArray.reduce((latest, message) => {
      if (!latest || (message.createdAt > latest.createdAt)) {
        return message;
      }
      return latest;
    }, null);
  }

  // Truncate the last message to 22 characters
  const truncateMessage = (message) => {
    if (!message) return 'No messages';
    if (message.length <= 22) return message;
    return `...${message.slice(0, 22)}`;
  };

  let lastMessage = '';
  let lastMessageSender = '';

  if (!isSystemChat) {
    lastMessage = truncateMessage(latestMessage ? latestMessage.text : 'No messages');
    lastMessageSender = latestMessage && latestMessage.userSend === props.userID ? 'self' : 'other';
  }

  return (
    <>
      {isSystemChat ? (
        <Box onClick={() => props.goToChatPage(props.otherUserDetails, props.chatID, isSystemChat)} 
          sx={{ display: 'flex', alignItems: 'center', padding: 1, borderBottom: '1px solid #ccc',
          backgroundColor: '#9974B2', borderRadius: 3, justifyContent: 'space-between', marginBottom: 1 }}>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>       
            <>
              <Typography className='pBuble' sx={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>
                הודעת מערכת
              </Typography>
              <Typography className='pBuble' variant="body1" sx={{ marginTop: 1 }}>
                המלצה להגשת סיוע
              </Typography>
            </>       
          </Box>
          <Avatar src={LogoImage} sx={{ marginLeft: 2, backgroundColor: 'white' }}>מ</Avatar>     
        </Box>
      ) : (
        <Box onClick={() => props.goToChatPage(props.otherUserDetails, props.chatID, isSystemChat)} 
          sx={{ display: 'flex', alignItems: 'center', padding: 1, borderBottom: '1px solid #ccc',
          backgroundColor: '#9974B2', borderRadius: 3, justifyContent: 'space-between', marginBottom: 1 }}>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <>
              <Typography className='pBuble' sx={{ fontWeight: 'bold', fontSize: 16 }}>
                {firstName} {lastName}
              </Typography>
              <Typography className='pBuble' variant="body1" sx={{ marginTop: 1}}>
                {lastMessage}
              </Typography>
            </>      
          </Box>       
          <Avatar src={profilePicture} alt={firstName} sx={{ marginLeft: 2 }} />
        </Box>
      )}
    </>
  );
}

export default ChatToDisplay;

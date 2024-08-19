import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../utilities/FirebaceConfig';
import HandshakeIcon from '../assets/handshakeW.png';
import { postAndPutReqFunction } from "../utilities/ApiUtilities";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

import RequestDisplay from "./RequestDisplay";

import '../styles/ChatPage.css';

function ChatBubble({ message, sender, timestamp, isSent, handleButtonClick, chatNumID, otherUserID, isSystemChat }) {
  const [closeRequests, setCloseRequests] = useState({});
  const userConnectedDetails = JSON.parse(localStorage.getItem('user'));
  const [activeRequests, setActiveRequests] = useState([]);
  const apiAllRequests = 'https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/ActiveReqByCommunity';
  const [handshakeStatus, setHandshakeStatus] = useState({});

  // Fetch all close requests
  useEffect(() => {
    const closeRequestsRef = ref(database, 'CloseRequests');
    const handleValueChange = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setCloseRequests(data);
      } else {
        console.log('No data available');
      }
    };

    onValue(closeRequestsRef, handleValueChange);

    return () => {
      off(closeRequestsRef, handleValueChange);
    };
  }, []);

  // Fetch all active requests
  useEffect(() => {
    async function fetchActiveRequests() {
      try {
        const jsonObjToPost = {
          "CommunityID": JSON.parse(localStorage.getItem('userCommunityId')),
          "UserID": userConnectedDetails.user.userId
        };
        const fetchedRequests = await postAndPutReqFunction(jsonObjToPost, apiAllRequests, 'POST');

        if (fetchedRequests) {
          setActiveRequests(fetchedRequests);
        }
      } catch (error) {
        console.error('Error fetching communities:', error.message);
      }
    }

    fetchActiveRequests();
  }, []);

  // Fetch handshake status
  useEffect(() => {
    const handshakeRef = ref(database, `Chats/${chatNumID}/handshake`);

    const handleHandshakeChange = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setHandshakeStatus(data);
      } else {
        console.log('No handshake data available');
      }
    };

    onValue(handshakeRef, handleHandshakeChange);

    return () => {
      off(handshakeRef, handleHandshakeChange);
    };
  }, [chatNumID]);

  // Time format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  let parsedMessage='';

  if(!isSystemChat){
  // Handle button in message
   parsedMessage = parse(message, {
    replace: domNode => {
      if (domNode.name === 'button') {
        const reqID = domNode.attribs.id;
        let requestExists = closeRequests.hasOwnProperty(reqID);
        let isUserRequest = requestExists && (closeRequests[reqID].TheAssistantUser == userConnectedDetails.user.userId || sender == userConnectedDetails.user.userId);
        let isActiveRequest = activeRequests.some(request => request.request.reqID == reqID);
        let userReqID = activeRequests.find(request => request.request.reqID == reqID)?.request.userReqID || null;

        const currentHandshakeStatus = handshakeStatus[reqID] || {};
        const bothStatusesTrue = Object.values(currentHandshakeStatus).every(statusObj => statusObj.status === true);

        let buttonStyle;
        let buttonCaption;
        let buttonDisabled;

        if (isUserRequest || bothStatusesTrue) {
          buttonStyle = {
            maxWidth: '50px',
            maxHeight: '50px',
            borderRadius: '50%',
            border: '4px solid green',
            backgroundColor: 'lightgreen',
          };
          buttonCaption = 'העסקה נסגרה לחצתם ידיים';
          buttonDisabled = true;
        } else if (!isActiveRequest) {
          buttonStyle = {
            maxWidth: '50px',
            maxHeight: '50px',
            borderRadius: '50%',
            border: '4px solid black',
            backgroundColor: '#554661',
          };
          buttonCaption = 'הבקשה כבר לא פעילה אולי פעם הבאה נסגור';
          buttonDisabled = true;

        } else if (currentHandshakeStatus[userConnectedDetails.user.userId] && currentHandshakeStatus[userConnectedDetails.user.userId].status) {
          buttonStyle = {
            maxWidth: '50px',
            maxHeight: '50px',
            borderRadius: '50%',
            border: '4px solid orange',
            backgroundColor: '#EBD5A0',
          };
          buttonCaption = 'מחכים לאישור מהצד השני';
          buttonDisabled = false;

        } else if (Object.values(currentHandshakeStatus).some(statusObj => statusObj.status === true)) {
          buttonStyle = {
            maxWidth: '50px',
            maxHeight: '50px',
            borderRadius: '50%',
            border: '4px solid lightblue',
            backgroundColor: '#708DD3',
          };
          buttonCaption = 'לחץ לסגירת עסקה';
          buttonDisabled = false;

        } else {
          buttonStyle = {
            maxWidth: '50px',
            maxHeight: '50px',
            borderRadius: '50%',
            border: '4px white solid',
            backgroundColor: '#9974B2',
          };
          buttonDisabled = false;
        }

        return (
          <>
            <br />
            <button
              style={buttonStyle}
              id={reqID}
              onClick={() => handleButtonClick(reqID, handshakeStatus[reqID][userConnectedDetails.user.userId].status, handshakeStatus[reqID][otherUserID].status, userReqID)}
              disabled={buttonDisabled}
            >
              <img
                src={HandshakeIcon}
                alt="ChatIcon"
                style={{
                  maxWidth: '60px',
                  maxHeight: '50px',
                }}
              />
            </button><br></br>
            <span style={{ color: 'black', fontWeight: 'bold' }}>{buttonCaption}</span>
          </>
        );
      }
    }
  });}

  // Render System Chat Bubble with full functionality
  if (isSystemChat) {
    return (
      <>
      <p> היי נמצאת מתאים להגיש את עצמך לעזרה בבקשה. מוזמן להגיש סיוע במידה ומתאים לך</p>
      
      <Box sx={{width:'100%',  marginBottom: '20px' }}>
            <RequestDisplay
                ReqId={message.response.request.reqID}
                UserName={message.response.fullNameOfReq} //~ need to fix in server ~ 
                UserID={message.response.request.userReqID} //~ need to fix in server ~ 
                DueDate={message.response.request.dueDate}
                DueTime={message.response.request.dueTime}
                DueDateHebrewDay={message.response.request.dueDate}
                PostDate={message.response.request.postDate}
                PostTime={message.response.request.postTime}
                Description={message.response.request.description}
                profileImg={message.response.profilePicture}
                GoToUserProfile={() => {}}
                isSystemChat={true}
                onlyDisplayProfile={false} // Set to true to limit the display to only the profile
            />
            <Typography variant='body2' sx={{ fontSize: 12, width: '60%', marginTop: '10px', color: 'grey', textAlign: 'right' }}>
                {formatTime(timestamp)}
            </Typography>
        </Box>
      </>
    );
  }

  // Render Regular Chat Bubble
  return (
    <div className={`chat-bubble ${isSent ? 'sent' : 'received'}`}>
      <div className={`message ${isSent ? 'sent' : 'received'}`}>
        <p className='pBuble'>{parsedMessage}</p>
        <span className={`timestamp ${isSent ? 'sent' : 'received'}`}>
          {formatTime(timestamp)}
        </span>
      </div>
    </div>
  );
}

export default ChatBubble;

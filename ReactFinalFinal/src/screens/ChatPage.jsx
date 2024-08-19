import React, { useState, useEffect, useRef } from 'react';
import { push, ref, set, onValue, off } from 'firebase/database';
import { database } from '../utilities/FirebaceConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Container } from "@mui/material";
import {postAndPutReqFunction } from "../utilities/ApiUtilities";

import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ChatBubble from '../components/ChatBubble';
import LogoImage from '../assets/Logo_TheStreets.png';
import '../styles/ChatPage.css';

export default function ChatPage(props) {


  const navigate = useNavigate();
  const userConnectedDetails = JSON.parse(localStorage.getItem('user'));
  const userSent = userConnectedDetails.user.userId;

  const { state } = useLocation();
  const userITalkDeatails = state?.otherUserDetails || {};;
  const chatNumID = state.chatID;
  

  const chatWindowRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const closeStatusApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/updateUserStatusToReq`;


  const backToAllChats = () => {
    navigate('/AllChats');
  };

  useEffect(() => {
    const messagesRef = ref(database, `/Chats/${chatNumID}/massages`);
    onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id, ...data,
        }));
        setMessages(messagesArray);
      }
    }, (error) => {
      console.error(error);
    });

    return () => {
      off(messagesRef);
    };
  }, [chatNumID]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const addNewMassage = () => {
    try {
      const messagesRef = ref(database, `/Chats/${chatNumID}/massages`);
      const newMassageRef = push(messagesRef);
      if (newMessage) {
        set(newMassageRef, {
          text: newMessage,
          createdAt: new Date().toISOString(),
          userSend: userSent,
        });
        setNewMessage("");
      }
    } catch (error) {
      console.error('Firebase error', error);
    }
  };

  const handleButtonClick = async(reqID, pressedUserIDstatus, otherUserIDstatus, userReqID) => {
    console.log(`Button with ID ${reqID} clicked, loginUserStatus: ${pressedUserIDstatus} otherUserStatus ${otherUserIDstatus}`);
    
    if (pressedUserIDstatus == true && otherUserIDstatus==false) {
      await set(ref(database, `Chats/${chatNumID}/handshake/${reqID}/${userSent}/status`), false);

    }else if(pressedUserIDstatus == false && otherUserIDstatus==false){
      await set(ref(database, `Chats/${chatNumID}/handshake/${reqID}/${userSent}/status`), true);

    }else if(pressedUserIDstatus == false && otherUserIDstatus==true){
     
      await set(ref(database, `Chats/${chatNumID}/handshake/${reqID}/${userSent}/status`), true);
      
      let assistUser;
      if (userReqID != userSent) {
        assistUser = userSent;
      }else{
        assistUser = userITalkDeatails.userId;
      }

      let closeRequestRef = ref(database, `CloseRequests/${reqID}`);

      let closeRequestData = {
        TheAssistantUser: assistUser
      };
    
      set(closeRequestRef, closeRequestData)
        .then(() => {
          console.log('Close request inserted successfully');
        })
        .catch((error) => {
          console.error('Error inserting close request:', error);
        });  

        //closed
        let jsonObjToPostForAccept = {
          "userID": assistUser,
          "requestForHelpID": reqID,
          "statusApproval": "closed"
      };
      
      try {
          let response = await postAndPutReqFunction(jsonObjToPostForAccept, closeStatusApi, 'PUT');
          } 
          catch (error) {
          // Handle error
          console.error('Error in fetch:', error.message);
        }

    }

  };

  const groupMessagesByDate = (messages) => {
    const groupedMessages = [];
    let currentDate = null;

    messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).forEach((message) => {
      const messageDate = new Date(message.createdAt).toLocaleDateString();
      if (messageDate !== currentDate) {
        currentDate = messageDate;
        groupedMessages.push({ type: 'date', date: currentDate });
      }
      groupedMessages.push(message);
    });

    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate(messages);
  return (
    <> 
      
      <Container maxWidth="lg" style={{ height: '88vh', width: '75vw', display: 'flex', flexDirection: 'column' }}>
        <Button onClick={backToAllChats} style={{ color: 'black', marginRight: 200 }}>
          <ArrowBackIosIcon />
        </Button>
        <Box sx={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '10vh', marginBottom: '10%', fontWeight: 500 }}>
        {state.isSystemChat ?
         (
          <Avatar src={LogoImage} sx={{width: 70, height: 70, marginBottom:1, backgroundColor:'lightGrey' }}>מ</Avatar>
         ):(
          <Avatar src={userITalkDeatails.profilePicture} sx={{ width: 70, height: 70, marginBottom:1 }} />
         )}
          {state.isSystemChat ? (<>השכונה</>):(<>{userITalkDeatails.firstName} {userITalkDeatails.lastName}</>) }
        </Box>
        <div className="chat-window" ref={chatWindowRef} style={{ boxSizing: 'revert', fontWeight: 100, display:state.isSystemChat ? '': 'flex' }}>
          {groupedMessages.map((message, index) => (
            message.type === 'date' ? (
              <div key={index} className="date-separator">
                {message.date}
              </div>
            ) : (
              <ChatBubble
                key={message.id}
                message={message.text}
                sender={message.userSend}
                timestamp={message.createdAt}
                isSent={message.userSend === userConnectedDetails.user.userId}
                handleButtonClick={handleButtonClick}
                chatNumID = {chatNumID}
                otherUserID = {userITalkDeatails.userId}
                isSystemChat= {state.isSystemChat}
              />
            )
          ))}
        </div>
        {state.isSystemChat ? (<></>):
        (<Box sx={{ backgroundColor: '#C1ACD1', margin: '3%', width: '100%', borderRadius: 5 }} className="chat-input-container">
          <button className='BTNsend' 
           onClick={addNewMassage}
           disabled= {state.isSystemChat}>שלח</button>
          <textarea
            placeholder='רשום הודעה'
            value={newMessage}
            disabled= {state.isSystemChat}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={1}
            style={{ 
              direction: 'rtl', 
              width: '75%', 
              borderRadius: 10, 
              resize: 'none', 
              overflow: 'hidden', 
              fontSize: '14px', 
              fontFamily: 'inherit' 
            }}
          />
        </Box>)}
      </Container>
    </>
  );
}

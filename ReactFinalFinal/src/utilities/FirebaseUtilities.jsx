// chatUtilities.js
import { ref, set, push, update, get } from 'firebase/database';
import { database } from '../utilities/FirebaceConfig';
import { getReqFunction } from '../utilities/ApiUtilities'; // Assuming you have this function to fetch the request data
import { formatDueDate, formatPostDate, formatTime, getDayOfWeekInHebrew } from '../utilities/FunctionsUtilities';

export async function createOrUpdateChat(userId1, userIdSend, requestId, FullName, catName) {
  try {
    // Generate chat ID
    const chatId = [userId1, userIdSend].sort().join('+');

    // Reference to the chat and users
    const chatRef = ref(database, `/Chats/${chatId}`);
    const user1ChatsRef = ref(database, `/Users/${userId1}/Chats`);
    const user2ChatsRef = ref(database, `/Users/${userIdSend}/Chats`);

    // Check if chat exists
    const chatSnapshot = await get(chatRef);

    if (!chatSnapshot.exists()) {
      // Create new chat with handshake including requestId
      await set(chatRef, {
        handshake: {
          [requestId]: {
            [userId1]: { status: false },
            [userIdSend]: { status: false }
          }
        },
        massages: {}
      });

      // Update users with new chat ID
      await update(user1ChatsRef, {
        [chatId]: true
      });
      await update(user2ChatsRef, {
        [chatId]: true
      });
    } else {
      // Chat exists, update the handshake with the new requestId
      const chatData = chatSnapshot.val();
      const updatedHandshake = {
        ...chatData.handshake,
        [requestId]: {
          [userId1]: { status: false },
          [userIdSend]: { status: false }
        }
      };

      await update(chatRef, { handshake: updatedHandshake });
    }

    // Add auto message
    const massagesRef = ref(database, `/Chats/${chatId}/massages`);
    const newMessageRef = push(massagesRef);

    const getReqApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/GetSpecificReq?ReqID=${requestId}`;
    let requestDescription = '';
    let timeOfReq = '';
    try {
      const response = await getReqFunction(getReqApi);
      requestDescription = response.request.description;
      timeOfReq = `${getDayOfWeekInHebrew(response.request.dueDate)} ${formatDueDate(response.request.dueDate)} | ${formatTime(response.request.dueTime)}`;
    } catch (err) {
      console.error('Error fetching request data', err.message);
    }
  
    await set(newMessageRef, {
      text: `היי ${FullName}, תודה על הרצון לעזור, הצעת עזרה לבקשה שלי ב ${timeOfReq}  ואשמח לדעת האם יש שאלות נוספות. אם הכל ברור תוכל ללחוץ על כפתור לחיצת ידיים ונסגור את העסקה ביננו <button id="${requestId}"></button>`,
      createdAt: new Date().toISOString(),
      userSend: userIdSend 
    });

    console.log('send massage');


  } catch (error) {
    console.error('Firebase error', error);
  }
}


export async function createOrUpdateSystemChat(topUserIDs) {

  const getReqApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/GetSpecificReq?ReqID=${topUserIDs[0].reqID}`;

  try {
    const response = await getReqFunction(getReqApi);  
    
    if(response){
      topUserIDs.forEach(async (userObj) => {

        const userID = userObj.userId;
        const chatID = `0+${userID}`;
        const chatRefA = ref(database, `/Chats/${chatID}`);
        const userChatsRef = ref(database, `Users/${userID}/Chats`);
        const chatRefM = ref(database, `/Chats/${chatID}/massages`);
        try {
          // Check if the chat exists
          const snapshot = await get(chatRefA);
          console.log(chatRefA)
          if (!snapshot.exists()) {
            
            // Chat doesn't exist, create it           
           
            await update(chatRefA, {

              massages: {
                [userObj.reqID]: {
                  userSend: 0, 
                  text: {response},
                  createdAt: new Date().toISOString(),
                }
              }
            });
         
            //add it to Users chats
            await update(userChatsRef, {
              [chatID]: true
            });

          }else{
               // Now send the message 
              await update(chatRefM, {
                [userObj.reqID]: {
                userSend: 0, 
                text: {response},
                createdAt: new Date().toISOString(),}
              });
          }          

        } catch (error) {
          console.error("Error checking chat existence or sending message:", error);
        }
      });
    }

  } catch (err) {
    console.error('Error fetching request data', err.message);
  }
}



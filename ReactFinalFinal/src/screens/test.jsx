//Handle Handshake:

function handleHandshake(chatID, requestID, userID) {
  firebase.database().ref(`Chats/${chatID}/handshakes/${requestID}`).update({
    [userID]: true
  }).then(() => {
    firebase.database().ref(`Chats/${chatID}/handshakes/${requestID}`).once('value', snapshot => {
      const handshakes = snapshot.val();
      if (Object.values(handshakes).every(val => val === true)) {
        firebase.database().ref(`requests/${requestID}`).update({
          status: "approved"
        });
      }
    });
  });
}


function offerAssistance(requestID, assistantID) {
  const requestRef = firebase.database().ref(`requests/${requestID}`);
  requestRef.once('value', snapshot => {
    const request = snapshot.val();
    const userID = request.userID;
    const chatID = request.chatID;

    // Add assistant to request
    requestRef.child('assistants').push(assistantID);

    // If no chat exists, create a new chat
    if (!chatID) {
      createChat(requestID, userID, assistantID);
    } else {
      // Send automatic message to existing chat
      sendAutomaticMessage(chatID, assistantID);
    }
  });
}

function handleHandshake(chatID, requestID, userID) {
    firebase.database().ref(`chats/${chatID}/handshakes/${requestID}`).update({
      [userID]: true
    }).then(() => {
      firebase.database().ref(`chats/${chatID}/handshakes/${requestID}`).once('value', snapshot => {
        const handshakes = snapshot.val();
        if (Object.values(handshakes).every(val => val === true)) {
          firebase.database().ref(`requests/${requestID}`).update({
            status: "closed"
          });
        }
      });
    });
  }
  


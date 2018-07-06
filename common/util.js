import * as messaging from 'messaging';

// Send a message between device <--> companion
export const sendToPeerSocket = (data) => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.error(`Peer Socket Connection is not open (readyState: ${messaging.peerSocket.readyState})`);
  }
};

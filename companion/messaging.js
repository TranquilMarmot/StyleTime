import * as messaging from 'messaging';

import { FETCH_WEATHER } from '../common/commands';
import { sendToPeerSocket } from '../common/util';

import { queryOpenWeatherMap } from './weather';
import { restoreSettings } from './settings';

export const initMessaging = () => {
  // listen for messages from the device
  messaging.peerSocket.onmessage = ({ data }) => {
    if (data && data.command) {
      switch (data.command) {
        case FETCH_WEATHER:
          queryOpenWeatherMap(sendToPeerSocket, data.zipCode);
          break;
        default:
          console.log(`Unknown command: ${data.command}`);
          break;
      }
    }
  };

  messaging.peerSocket.onopen = () => {
    // restore settings from settings storage (on phone)
    restoreSettings();
  };

  messaging.peerSocket.onerror = (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
  };
};

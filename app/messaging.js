import * as messaging from 'messaging';

import * as commands from '../common/commands';

import { onWeatherFetchSuccess } from './weather';
import { onSettingChanged } from './settings';

// Sets up the peerSocket to receive messages from the companion app
// All messages should be set up here so that there is only one onmessage listener registered
export const initMessaging = () => {
  messaging.peerSocket.onmessage = ({ data }) => {
    if (data) {
      switch (data.command) {
        case commands.WEATHER_FETCH_SUCCESS:
          onWeatherFetchSuccess(data);
          break;
        case commands.SETTING_CHANGED:
          onSettingChanged(data);
          break;
        default:
          console.warn(`Unknown command: ${data.command}`);
          break;
      }
    }
  };

  messaging.peerSocket.onerror = err => {
    console.error(`Peer Socket Connection error: ${err.code} - ${err.message}`);
  };
};
